import { getFavicons, proxyFavicon } from '@/lib/server';
import { ResponseInfo } from '@/types';
import type { NextRequest } from 'next/server';
export const runtime = 'edge';

export async function GET(request: NextRequest, { params: { domain } }: { params: { domain: string } }) {
  let icons: { sizes?: string; href: string }[] = [];
  const larger: boolean = request.nextUrl.searchParams.get('larger') === 'true'; // Get the 'larger' parameter
  let selectedIcon: { sizes?: string; href: string } | undefined;

  // Record start time
  const startTime = Date.now();

  // Convert the domain to ASCII encoding using URL API
  const asciiDomain = new URL(`http://${domain}`).hostname;

  // Validate domain name format
  if (!/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(asciiDomain)) {
    return new Response('Invalid domain name format', { status: 400 });
  }

  if (larger) {
    const duckduckgoUrl = `https://icons.duckduckgo.com/ip3/${asciiDomain}.ico`;
    console.log("Ico source:", duckduckgoUrl);
    try {
      const response = await fetch(duckduckgoUrl, {
        method: request.method,
        headers: request.headers,
        redirect: 'follow'
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  let data: ResponseInfo = { url: '', host: '', status: 500, statusText: '', icons: [] };

  // Initialize headers, excluding 'Content-Length'
  const headers = new Headers(request.headers);
  headers.delete('Content-Length');

  let url = `http://${asciiDomain}`;
  try {
    // Attempt to fetch favicons using HTTP
    data = await getFavicons({ url, headers });
    icons = data.icons;
  } catch (error) {
    console.error(error);
  }

  if (icons.length === 0) {
    url = `https://${asciiDomain}`;
    try {
      // Retry fetching favicons using HTTPS
      const data = await getFavicons({ url, headers });
      icons = data.icons;
    } catch (error) {
      console.error(error);
    }
  }

  // If no icons are found, fetch from alternative sources
  if (icons.length === 0) {
    return proxyFavicon({ domain: asciiDomain, request });
  }

  // Select the appropriate icon based on the 'larger' parameter
  if (larger) {
    selectedIcon = icons.reduce((prev, curr) => {
      const prevWidth = (prev.sizes || '0x0').split('x')[0];
      const currWidth = (curr.sizes || '0x0').split('x')[0];
      return Number(currWidth) > Number(prevWidth) ? curr : prev;
    });
  } else {
    selectedIcon = icons[0];
  }

  try {
    if (selectedIcon.href.includes("data:image")) {
      const base64Data = selectedIcon.href.split(',')[1];
      const iconBuffer = Buffer.from(base64Data, 'base64');
      // Calculate execution time
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      return new Response(iconBuffer, {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=86400',
          'Content-Type': selectedIcon.href.replace(/data:(image.*?);.*/, '$1'),
          'Content-Length': iconBuffer.byteLength.toString(),
          'X-Execution-Time': `${executionTime} ms`, // Add execution time header
        }
      });
    }
    const iconResponse = await fetch(selectedIcon.href, { headers });
    // Calculate execution time
    const endTime = Date.now();
    const executionTime = endTime - startTime;
    if (!iconResponse.ok) {
      const firstLetter = domain.charAt(0).toUpperCase();
      const svgContent = `
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#cccccc"/>
          <text x="50%" y="50%" font-size="48" text-anchor="middle" dominant-baseline="middle" fill="#000000">${firstLetter}</text>
        </svg>
      `;
      return new Response(svgContent, {
        status: 404,
        headers: {
          'Cache-Control': 'public, max-age=86400',
          'Content-Type': 'image/svg+xml',
          'X-Execution-Time': `${executionTime}ms`
        }
      });
    }
    const iconBuffer = await iconResponse.arrayBuffer();

    // Return the image response with execution time
    return new Response(iconBuffer, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=86400',
        'Content-Type': iconResponse.headers.get('Content-Type') || 'image/png',
        'Content-Length': iconBuffer.byteLength.toString(),
        'X-Execution-Time': `${executionTime}ms`, // Add execution time header
      }
    });
  } catch (error) {
    console.error(`Error fetching the selected icon: ${error}`);
    return new Response('Failed to fetch the icon', { status: 500 });
  }
}
