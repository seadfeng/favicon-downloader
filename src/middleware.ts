import { appConfig } from "@/config";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const intlMiddleware = createMiddleware({
    locales: appConfig.i18n.locales,
    defaultLocale: appConfig.i18n.defaultLocale,
    localePrefix: "as-needed",
    localeDetection: false,
    alternateLinks: true
  });

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
