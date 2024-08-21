"use client";

import { Markdown } from "@/components/shared/markdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { appConfig } from "@/config";
import apiClient from "@/lib/api";
import { cn } from "@/lib/utils";
import { ResponseInfo } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Faqs } from "../../shared/faqs";
import ImageCode from "../../shared/image-code";
import { Results } from "./results";

// Regular expression to validate a domain name
const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;

const FormValueSchema = z.object({
  domain: z.string().regex(domainRegex, "Invalid domain name")
}); 
type FormValues = z.infer<typeof FormValueSchema>;

export function Main({
  markdownContents
}: Readonly<{  
  markdownContents: Record<string, string | undefined>;
}>) {
  const { block1 } = markdownContents;
  const t = useTranslations();
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<any>(false); 
  const [info, setInfo] = useState<ResponseInfo | null>(null); 
  const defaultValues: FormValues = { 
    domain: "openai.com"  
  }
  const [values, setValues] = useState<FormValues>(defaultValues); 

  const form = useForm<FormValues>({
    resolver: zodResolver(FormValueSchema),
    defaultValues
  });

  const faqs = [
    {
      question: t('frontend.home.faq.qa1.question'),
      answer: t('frontend.home.faq.qa1.answer')
    },
    {
      question: t('frontend.home.faq.qa2.question'),
      answer: t('frontend.home.faq.qa2.answer')
    },
    {
      question: t('frontend.home.faq.qa3.question'),
      answer: t('frontend.home.faq.qa3.answer')
    },
    {
      question: t('frontend.home.faq.qa4.question'),
      answer: t('frontend.home.faq.qa4.answer')
    },
    {
      question: t('frontend.home.faq.qa5.question'),
      answer: t('frontend.home.faq.qa5.answer')
    },
  ];

  const { domain } = values;

  const handleSubmit = (values: FormValues) => {
    setFetching(true);
    setError(false); 
    setInfo(null); 
    setValues(values);
    apiClient.get(`/favicon/${values.domain}`)
      .then((res) => { 
        setInfo(res as any);
        setFetching(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log("error", error);
        setFetching(false);
      });
  };

  const textCls = "text-primary font-medium";
  const [host, setHost] = useState<string | undefined>(undefined);
  const [imageDefaultUrl, setImageDefaultUrl] = useState<string | undefined>(undefined);
  const [imageLargerUrl, setImageLargerUrl] = useState<string | undefined>(undefined);
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentHost = window.location.host;
      setHost(currentHost);

      setImageDefaultUrl(`${process.env.NODE_ENV === 'development' ? "http" : "https"}://${currentHost}/favicon/${domain}`);
      setImageLargerUrl(`${process.env.NODE_ENV === 'development' ? "http" : "https"}://${currentHost}/favicon/${domain}?larger=true`);
    }
  }, [domain]);

  const imageDefaultCoce = imageDefaultUrl ? `<img alt="Favicon" src="${imageDefaultUrl}" />` : "";
  const imageLargerCoce = imageLargerUrl ? `<img alt="Favicon" src="${imageLargerUrl}" />` : "";

  const images: {
    src: string;
    title: string;
    codeStr: string;
    alt: string;
  }[] = [
    {
      src: imageDefaultUrl || "",
      title: t("frontend.home.default_size"),
      codeStr: imageDefaultCoce,
      alt: t("frontend.home.default_size_alt", { domain })
    },
    {
      src: imageLargerUrl || "",
      title: t("frontend.home.larger_size"),
      codeStr: imageLargerCoce,
      alt: t("frontend.home.larger_size_alt", { domain })
    },
  ];

  const infos = {
    "url": "https://www.proxysites.ai/",
    "host": "www.proxysites.ai",
    "status": 200,
    "statusText": "OK",
    "icons": [
      {
        "sizes": "57x57",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjU3fSwicHVyIjoidmFyaWF0aW9uIn19--92e4e3f0c3ca444ac909ff07bd729cc0955c9a41/proxy%20sites.png"
      },
      {
        "sizes": "60x60",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjYwfSwicHVyIjoidmFyaWF0aW9uIn19--b326659caec69b9d03bb3212d330eb7f2de4867f/proxy%20sites.png"
      },
      {
        "sizes": "72x72",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjcyfSwicHVyIjoidmFyaWF0aW9uIn19--dda0b07b7faabd93b896f61bd0b8121fe7535812/proxy%20sites.png"
      },
      {
        "sizes": "114x114",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjExNH0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--e341749eca680cb3ab159803041920833c7147ed/proxy%20sites.png"
      },
      {
        "sizes": "120x120",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjEyMH0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--2876e6c7d56a4676f98b9461a6c157748dd7f3d8/proxy%20sites.png"
      },
      {
        "sizes": "144x144",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE0NH0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--2ef73b7782ea6acca11f4bf18278d20df3ebedc7/proxy%20sites.png"
      },
      {
        "sizes": "152x152",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE1Mn0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--5d7e7888c54038462f7d0f5dfcaf9bfb763542b6/proxy%20sites.png"
      },
      {
        "sizes": "180x180",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE4MH0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--3607f5859d231a899f00f3075e5ede351a3881a1/proxy%20sites.png"
      },
      {
        "sizes": "512x512",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjUxMn0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--0681236ad6684680624efd9dab9c9b0fd921b448/proxy%20sites.png"
      },
      {
        "sizes": "192x192",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE5Mn0sInB1ciI6InZhcmlhdGlvbiJ9fQ==--f90210217333a1ec45f7289db3308a24a9ca1c30/proxy%20sites.png"
      },
      {
        "sizes": "96x96",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjk2fSwicHVyIjoidmFyaWF0aW9uIn19--75ad1335c5be72203ba8104f040ae0eae34ae312/proxy%20sites.png"
      },
      {
        "sizes": "32x32",
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjMyfSwicHVyIjoidmFyaWF0aW9uIn19--c8c4db84a6a282f606e045537f16130bddb1019f/proxy%20sites.png"
      },
      { 
        "href": "https://asset.proxysites.ai/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsiZGF0YSI6OCwicHVyIjoiYmxvYl9pZCJ9fQ==--e702ab3bb2a064d7cc1961d5791a9cf8066b8c7f/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemUiOjE2fSwicHVyIjoidmFyaWF0aW9uIn19--a249ec28617db7ea4309a9d13a2b4b43d8876d4e/proxy%20sites.png"
      }
    ],
    "duration": "5.540"
  }
 

  return (
    <div className={cn("max-w-4xl mx-auto w-full leading-9 text-base")}> 
      <h1 className="text-4xl mb-2 font-extrabold">{appConfig.appName}</h1>
      <p className={`${textCls} border-l-8 border-primary/60 pl-4 font-semibold`}>{t('frontend.home.h1')}</p>
      <h2 className="text-2xl flex items-center mt-10 font-semibold">
        {t('frontend.home.sub_to_h1')} 
      </h2> 
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem nospace={true} className="mt-5 mb-8"> 
                <div className="flex w-full">
                  <FormControl>
                    <Input type="search" className="rounded-s-md h-13 text-xl aria-[describedby*=-form-item-message]:ring-red-400" placeholder="Enter Domain (e.g., example.com)" {...field} />
                  </FormControl>
                  <Button loading={fetching} className="h-13 rounded-e-md" disabled={!field.value || fetching}>{t('frontend.home.check')}</Button>
                </div>  
                {field.value && <FormMessage /> }
              </FormItem>
            )}
          />
        </form>
      </Form>
      {error && <div className="rounded-md border border-red-500 p-10 mb-10">{error}</div>}
      {fetching && <Skeleton className="h-72 w-full rounded-md mb-8" />}  
      {infos && <Results info={infos} />}  
      {host && images.map(image => <ImageCode {...image} key={image.src} />)} 
      {block1 && <Markdown content={block1} className="mt-10" />}
      <Faqs faqs={faqs} title={t('frontend.home.faq.title')} />
    </div>
  );
}
