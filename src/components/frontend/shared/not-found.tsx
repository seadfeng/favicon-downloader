"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/lib/i18n";
import { UndoIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function NotFound() {
  const t = useTranslations();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-2xl">{t('frontend.page_not_found')}</p>

      <Button asChild className="mt-4">
        <Link href="/">
          <UndoIcon className="mr-2 size-4" /> {t('frontend.go_to_homepage')}
        </Link>
      </Button>
    </div>
  );
}
