import { appConfig } from "@/config";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set('x-request-url', req.url);

  // Create a new request with updated headers
  const modifiedRequest = new NextRequest(req.url, {
    headers: reqHeaders,
    method: req.method,
    body: req.body
  });
  const intlMiddleware = createMiddleware({
    locales: appConfig.i18n.locales,
    defaultLocale: appConfig.i18n.defaultLocale,
    localePrefix: "as-needed",
    localeDetection: true,
    alternateLinks: true
  });

  return intlMiddleware(modifiedRequest);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
