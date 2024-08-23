 
import { Main } from "@/components/frontend/page/home/main";
import { appConfig, type LocaleType } from "@/config";
import { getComponentMarkdown } from "@/i18n";
import { getOrigin } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

export const runtime = 'edge';

export async function generateMetadata({ params }:{ params: any }): Promise<Metadata> { 
  const t = await getTranslations(params); 
  return {
    title: {
      absolute: `${appConfig.appName}: ${t('frontend.meta.default.title')}`,
      template: "%s"
    },
    description: t('frontend.meta.default.description')
  };
}
 
export default async function  Home({
  params
}: Readonly<{ 
  params: { locale: string; };
}>) {
  const headersList = headers();
  const origin = getOrigin({headers: headersList});

  // Load by key: public/data/generated/components-markdown.json
  const markdownContents = {
    block1: await getComponentMarkdown({
      locale: params.locale as LocaleType, 
      componentPathName: "home/block1",
      origin
    })
  } 
  return (
    <div className="px-8 flex">
      <Main markdownContents={markdownContents} />
    </div>
  );
}
