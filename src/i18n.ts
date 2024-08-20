import { LocaleType, appConfig } from "@/config";
import deepmerge from "deepmerge";
import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import z from "zod";

export const getLocale = async (
  locale: string,
): Promise<AbstractIntlMessages> => {
  return (await import(`../public/i18n/${locale}.json`)).default as AbstractIntlMessages
};

export const getMessagesForLocale = async (
  locale: string,
): Promise<AbstractIntlMessages> => {
  const localeMessages = await getLocale(locale);
  if (locale === appConfig.i18n.defaultLocale) {
    return localeMessages;
  }
  const defaultLocaleMessages = await getLocale(
    appConfig.i18n.defaultLocale,
  );
  try {
    return deepmerge(defaultLocaleMessages, localeMessages);
  } catch (error: any) {
    console.error("getMessagesForLocale deepmerge:", error.messages);
    return defaultLocaleMessages;
  }
};

export default getRequestConfig(async ({ locale }) => ({
  messages: await getMessagesForLocale(locale),
}));

// I18n Components Markdown
export const componentsMarkdownFile = "data/generated/components-markdown.json";
export const contentComponentsMarkdownDir = 'content/components';

export const I18nComponentMarkdownSchema = z.record(
  z.object({
    locales: z.array(z.enum(appConfig.i18n.locales))
  })
);
export type I18nComponentMarkdown = z.infer<typeof I18nComponentMarkdownSchema>;
let loadComponentsMarkdownData: I18nComponentMarkdown;

const loadComponentsMarkdown = async () => {
  if (!loadComponentsMarkdownData) {
    try {
      const data = (await import(`../public/data/generated/components-markdown.json`)).default as I18nComponentMarkdown;
      loadComponentsMarkdownData = I18nComponentMarkdownSchema.parse(data);
    } catch (validationError: any) {
      console.error("Validation error:", validationError.errors);
    }
  }
  return loadComponentsMarkdownData;
}
export const getComponentMarkdown = async ({
  locale,
  componentPathName
}: {
  locale: LocaleType;
  componentPathName: string;
}): Promise<string | undefined> => {
  const componentsMarkdownData = await loadComponentsMarkdown();
  if (!componentsMarkdownData) return undefined;
  if (!(componentPathName in componentsMarkdownData)) {
    throw new Error("componentPathName Error")
  }
  // load locales by componentPathName 
  const { locales } = componentsMarkdownData[componentPathName] as { locales: LocaleType[] };
  const currentLocale = locales.includes(locale) ? locale : appConfig.i18n.defaultLocale;

  const filePath = `/${contentComponentsMarkdownDir}/${componentPathName}/${currentLocale}.md`;
  try {
    const response = await fetch(`${appConfig.origin}${filePath}`);
    return await response.text();
  } catch (error) {
    console.error(`Error reading Markdown file: ${error}`);
    return undefined;
  }
};