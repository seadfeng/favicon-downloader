
import { appConfig, type LocaleType } from "@/config";
import getRequestConfig from "@/i18n";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { JetBrains_Mono as FontMono } from "next/font/google";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
export const runtime = 'edge';

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateMetadata({ params }:{ params: any }): Promise<Metadata> { 
  const t = await getTranslations(params); 
  return {
    title: {
      absolute: t('frontend.meta.default.title'),
      default: t('frontend.meta.default.title'),
      template: `%s - ${appConfig.appRootDomain}`,
    },
    description: t('frontend.meta.default.description')
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
 
  const { locale } = params as { locale: LocaleType };

  if (!appConfig.i18n.locales.includes(locale)) {
    notFound();
  }
  const { messages } = await getRequestConfig({locale});

  return (
    <html lang={locale} suppressHydrationWarning={true}>
     <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased",
          fontMono.variable
        )}
      >
        <NextTopLoader color="var(--colors-primary)" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        {appConfig.gaId && <GoogleAnalytics gaId={appConfig.gaId} />}
      </body>
    </html>
  );
}
