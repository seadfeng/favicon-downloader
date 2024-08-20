import { getFavicons } from '@/lib/utils';
import { ResponseInfo } from '@/types';
import type { NextRequest } from 'next/server';
import z from 'zod';

export const runtime = 'edge';

// Define a regex pattern for validating domain names
const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

// Define the schema with custom domain validation
const BodySchema = z.object({
  domain: z.string()
    .regex(domainRegex, "Invalid domain name format") // Validate domain format
    .min(1, "Domain name cannot be empty"), // Ensure the domain is not empty
  headers: z.record(z.string()).optional() // 'headers' is an optional object with string keys and string values
});
/**
 * Handles POST requests by accepting JSON data, validating it, and performing a fetch operation.
 * 
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a response containing the fetch results as JSON.
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now(); // Record the start time for calculating the request duration

  // Parse and validate the request body
  let domain: string;
  let headers: Headers | undefined;
  try {
    const jsonData = await request.json();
    const parsedData = BodySchema.parse(jsonData);
    domain = parsedData.domain;
    headers = parsedData.headers ? new Headers(parsedData.headers) : undefined;
  } catch (error: any) {
    return new Response(JSON.stringify({ error: { message: error.message } }, null, 2), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Initialize headers and remove 'Content-Length' to avoid issues
  headers = new Headers(headers || request.headers);
  headers.delete('Content-Length');

  // Define a helper function to handle the response and set status
  const handleResponse = (data: ResponseInfo, status: number, statusText: string) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(3);
    return new Response(JSON.stringify({ ...data, duration }, null, 2), {
      status,
      statusText,
      headers: { 'Content-Type': 'application/json' }
    });
  };

  // Attempt to fetch favicons using HTTP
  let data: ResponseInfo = { url: '', host: '', status: 500, statusText: '', icons: [] };
  let url = `http://${domain}`;

  try {
    data = await getFavicons({ url, headers });
    if (data.status === 530) return handleResponse(data, 530, 'Error 530');
    if (data.icons.length > 0) return handleResponse(data, 200, 'ok');
  } catch (error) {
    console.error(error);
  }

  // Retry using HTTPS if HTTP fails
  url = `https://${domain}`;
  try {
    data = await getFavicons({ url, headers });
    if (data.status === 530) return handleResponse(data, 530, 'Error 530');
    if (data.icons.length > 0) return handleResponse(data, 200, 'ok');
  } catch (error) {
    console.error(error);
  }

  // If both HTTP and HTTPS fail, try alternative sources
  const sources = [
    `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`, // larger
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=100`,
    `https://icon.horse/icon/${encodeURIComponent(domain)}`
  ];

  const icons: { href: string }[] = [];
  for (const source of sources) {
    try {
      const response = await fetch(source, {
        method: request.method,
        headers: request.headers,
        redirect: 'follow'
      });

      if (response.status === 200) {
        icons.push({ href: source });
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(3);
      return new Response(JSON.stringify({ url, host: new URL(url).host, status: response.status, statusText: response.statusText, icons, duration }, null, 2), {
        status: response.status,
        statusText: response.statusText,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error(`Error fetching from ${source}: ${error}`);
    }
  }

  // Return a response with no icons if all attempts fail
  const duration = ((Date.now() - startTime) / 1000).toFixed(3);
  return new Response(JSON.stringify({ url, host: new URL(url).host, status: 500, statusText: 'Fail', icons, duration }, null, 2), {
    status: 500,
    statusText: 'Fail',
    headers: { 'Content-Type': 'application/json' }
  });
}
