import { getFavicons } from '@/lib/server';
import { ResponseInfo } from '@/types';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: { domain: string } }) {
  const startTime = Date.now();
  const { domain } = params;

  // Validate domain name format
  if (!/([a-z0-9-]+\.)+[a-z0-9]{1,}$/.test(domain)) {
    return new Response(`Invalid domain name format${domain}`, { status: 400 });
  }

  // Define a helper function to handle the response
  const handleResponse = (data: ResponseInfo, status: number, statusText: string) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(3);
    return new Response(JSON.stringify({ ...data, duration }, null, 2), {
      status,
      statusText,
      headers: { 'Content-Type': 'application/json' }
    });
  };

  // Fetch favicons using HTTP
  let data: ResponseInfo = { url: '', host: '', status: 500, statusText: '', icons: [] };
  let url = `http://${domain}`;

  try {
    data = await getFavicons({ url });
    if (data.status === 530) return handleResponse(data, 530, 'Error 530');
    if (data.icons.length > 0) return handleResponse(data, 200, 'ok');
  } catch (error: any) {
    console.error('Error fetching HTTP favicons:', error.message);
  }

  // Retry with HTTPS
  url = `https://${domain}`;
  try {
    data = await getFavicons({ url });
    if (data.status === 530) return handleResponse(data, 530, 'Error 530');
    if (data.icons.length > 0) return handleResponse(data, 200, 'ok');
  } catch (error: any) {
    console.error('Error fetching HTTPS favicons:', error.message);
  }

  // Try alternative sources
  const sources = [
    `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`,
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=100`,
  ];

  const icons: { href: string; sizes?: string; }[] = [];

  for (const source of sources) {
    try {
      const response = await fetch(source, {
        method: request.method,
        headers: request.headers,
        redirect: 'follow'
      });

      if (response.ok) {
        icons.push({ href: source, sizes: "unknown" });
      }
    } catch (error: any) {
      console.error(`Error fetching from ${source}: ${error.message}`);
    }
  }

  // If all attempts fail, use a placeholder SVG
  if (icons.length === 0) {
    const firstLetter = domain.charAt(0).toUpperCase();
    const svgContent = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#cccccc"/>
        <text x="50%" y="50%" font-size="48" text-anchor="middle" dominant-baseline="middle" fill="#000000">${firstLetter}</text>
      </svg>
    `;
    const base64Svg = `data:image/svg+xml;base64,${btoa(svgContent)}`;
    icons.push({
      sizes: '100x100',
      href: base64Svg
    });
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(3);
  return new Response(JSON.stringify({ url, host: new URL(url).host, status: 200, statusText: "ok", icons, duration: `${duration} s` }, null, 2), {
    status: 200,
    statusText: "ok",
    headers: { 'Content-Type': 'application/json' }
  });
}
