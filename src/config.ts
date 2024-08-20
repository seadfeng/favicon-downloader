
const locales = ['en', 'es', 'de_DE', 'fr', 'it', 'nl', 'pl', 'pt', 'sv', 'tr', 'ru', 'zh', 'ja', "ko"] as const;
const defaultLocale = "en" as const;

export type LocaleType = typeof locales[number];

export const appConfig = {
  appDomain: process.env.NODE_ENV === 'development' ? "127.0.0.1:3000" : "faviconextractor.com",
  appRootDomain: "faviconextractor.com",
  appName: "FaviconExtractor.com",
  appDescription: "FaviconExtractor",
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  origin: process.env.NODE_ENV === "development" ? "http://127.0.0.1:3000" : "https://redirectcheck.pages.dev",
  i18n: {
    locales,
    defaultLocale,
    labels: {
      "de_DE": "Deutsch",
      "en": "English",
      "es": "Español",
      "fr": "Français",
      "it": "Italian",
      "pt": "Português",
      "nl": "Nederlands",
      "pl": "Polski",
      "sv": "Svenska",
      "tr": "Türkçe",
      "ru": "Русский",
      "ja": "日本語",
      "zh": "中文",
      "ko": "한국어"
    } as Record<LocaleType, string>
  }
}