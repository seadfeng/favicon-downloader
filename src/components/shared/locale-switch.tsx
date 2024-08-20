"use client"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { appConfig, type LocaleType } from "@/config"
import { usePathname } from "@/lib/i18n"
import { LanguagesIcon } from "lucide-react"
import { useLocale } from "next-intl"
import { useSearchParams } from "next/navigation"

export function LocaleSwitch() { 
  const currentLocale = useLocale() as LocaleType; 
  const { labels, locales } = appConfig.i18n;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Language" className="h-10 w-12 rounded-md">
          <LanguagesIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={currentLocale} 
        >
          {locales.map((locale) => {
            return (
              <DropdownMenuRadioItem key={locale} value={locale}>
                <a href={`/${locale}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`}>{locale in labels
                  ? labels[locale as keyof typeof labels]
                  : locale}</a>
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
