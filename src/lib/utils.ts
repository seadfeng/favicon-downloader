import { appConfig, LocaleType } from "@/config";
import { ResponseInfo } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";

// Utility function to combine Tailwind CSS classes with clsx and merge conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getOrigin = ({ headers }: { headers: Headers }) => {
  const url = new URL(headers.get("x-request-url")!);
  return `${url.protocol}//${url.host}`;
}

export const getCanonical = ({ headers }: { headers: Headers }) => {
  const url = new URL(headers.get("x-request-url")!);
  return `${url.protocol}//${url.host}${url.pathname}`;
}

export const createAlternates = ({ headers }: { headers: Headers; }) => {
  let languages = {} as Record<LocaleType, string>;
  const linkStr = headers.get("Link")!;
  const links = linkStr.split(',');
  links.forEach(alternateStr => {
    const match = alternateStr.match(/<(.*)>;.*hreflang="(.*)"/);
    if (match && match[1]) {
      if (match[2] !== "x-default") {
        languages[match[2] as LocaleType] = match[1];
      } else {
        languages[appConfig.i18n.defaultLocale] = match[1];
      }
    }
  })

  return {
    canonical: getCanonical({ headers }),
    languages
  }
}

// Fetch favicons from a given URL and return ResponseInfo
export const getFavicons = async ({ url, headers }: { url: string, headers?: Headers }): Promise<ResponseInfo> => {
  const newUrl = new URL(url); // Create a URL object to extract the host

  try {
    // Perform the fetch request with optional headers and redirection follow
    const response = await fetch(newUrl.toString(), {
      method: "GET",
      redirect: "follow",
      headers
    });

    const body = await response.text();
    const responseUrl = new URL(response.url);

    // Regex to match <link> tags with "rel" containing "icon"
    const regex = /<link[^>]*rel=['"][^'"]*icon[^'"]*['"][^>]*>/gi;
    const matches = Array.from(body.matchAll(regex));
    const icons: { sizes: string, href: string }[] = [];

    matches.forEach((match) => {
      const linkTag = match[0];

      // Extract href value
      const hrefMatch = linkTag.match(/href=['"](.*?)['"]/i);
      const href = hrefMatch ? hrefMatch[1] : null;

      // Extract sizes value
      const sizesMatch = linkTag.match(/sizes=['"](.*?)['"]/i);
      const sizes = sizesMatch ? sizesMatch[1] : null;

      if (href) {
        icons.push({
          sizes: sizes || 'unknown',
          href: (href.startsWith('http') || href.startsWith('data:image')) ? href : `${responseUrl.protocol}//${responseUrl.host}${href}`
        });
      }
    });

    return {
      url: responseUrl.href,
      host: responseUrl.host,
      status: response.status,
      statusText: response.statusText,
      icons
    };
  } catch (error) {
    console.error(`Error fetching favicons: ${error}`);
    return {
      url: newUrl.href,
      host: newUrl.host,
      status: 500,
      statusText: 'Failed to fetch icons',
      icons: []
    };
  }
};

// Function to fetch favicon from alternative sources
export const proxyFavicon = async ({ domain, request }: { domain: string; request: NextRequest }) => {
  // List of alternative sources to fetch favicons
  const sources = [
    `https://www.google.com/s2/favicons?domain=${domain}`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`
    // `https://icon.horse/icon/${domain}`
  ];
  let response: Response = new Response();
  // Attempt to fetch favicon from each source
  for (const source of sources) {
    try {
      response = await fetch(source, {
        method: request.method,
        headers: request.headers,
        redirect: 'follow'
      });
      if (response.status == 200) {
        break;
      }

      console.log("icon source:", source);

    } catch (error) {
      console.error(`Error fetching proxy favicon: ${error}`);
    }
  }
  if (response.status !== 200) {
    const firstLetter = domain.charAt(0).toUpperCase();
    const svgContent = `
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#cccccc"/>
        <text x="50%" y="50%" font-size="48" text-anchor="middle" dominant-baseline="middle" fill="#000000">${firstLetter}</text>
      </svg>
    `;
    return new Response(svgContent, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=86400',
        'Content-Type': 'image/svg+xml'
      }
    });
  } else {
    // Return the fetched favicon
    return new Response(response.body, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/x-icon',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

};

export const downloadBase64Image = ({ base64Data, domain }: { base64Data: string, domain: string }) => {
  const link = document.createElement('a');

  let imgType = getBase64MimeType(base64Data)

  link.href = base64Data;

  link.download = `favicon-${domain}.${imgType}`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
export const getBase64MimeType = (base64Data: string): string => {
  const mimeTypeMatch = base64Data.match(/^data:(image\/[\w+]+);base64,/);

  let imgType = 'png';
  if (mimeTypeMatch && mimeTypeMatch[1]) {
    const mimeType = mimeTypeMatch[1];
    switch (mimeType) {
      case 'image/jpeg':
        imgType = 'jpg';
        break;
      case 'image/png':
        imgType = 'png';
        break;
      case 'image/gif':
        imgType = 'gif';
        break;
      case 'image/webp':
        imgType = 'webp';
        break;
      case 'image/bmp':
        imgType = 'bmp';
        break;
      case 'image/tiff':
        imgType = 'tiff';
        break;
      case 'image/svg+xml':
        imgType = 'svg';
        break;
      default:
        console.warn(`Unsupported image type: ${mimeType}. Defaulting to png.`);
        imgType = 'png';
    }
    return imgType;
  } else {
    throw new Error("Base64Data Error");
  }
}