import { appConfig, LocaleType } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to combine Tailwind CSS classes with clsx and merge conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function isBrowser() {
  return typeof window !== 'undefined' && window.navigator != null;
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

export const downloadBase64Image = ({ base64Data, domain }: { base64Data: string, domain: string }) => {
  const link = document.createElement('a');

  let imgType = getBase64MimeType(base64Data)

  link.href = base64Data;

  link.download = `favicon-${domain}.${imgType}`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export const getImageMimeType = (contentType: string) => {
  let imgType = 'png';
  switch (contentType) {
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
      console.warn(`Unsupported image type: ${contentType}. Defaulting to png.`);
      imgType = 'png';
  }
  return imgType;
}
export const getBase64MimeType = (base64Data: string): string => {
  const mimeTypeMatch = base64Data.match(/^data:(image\/.*?);base64,/);

  if (mimeTypeMatch && mimeTypeMatch[1]) {
    return getImageMimeType(mimeTypeMatch[1])
  } else {
    throw new Error("Base64Data Error");
  }
}