
"use client";

import { LocaleSwitch } from "@/components/shared/locale-switch";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { NavBar } from "./nav-bar";

export function Header() {
  const [isTop, setIsTop] = useState(true);
  const debouncedScroll = useDebounceCallback(
    () => {
      setIsTop(window.scrollY < 20);
    },
    150,
    {
      maxWait: 150,
    },
  );

  useEffect(() => {
    window.addEventListener("scroll", debouncedScroll);
    debouncedScroll();
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [debouncedScroll]);

  return(
  <header className={cn(" w-full items-center gap-4  bg-background px-4 md:px-6 z-50 h-16 transition-shadow duration-200 flex", isTop ? "shadow-none" : "shadow-sm")}>
    <NavBar />
    <div className="flex items-center justify-end gap-2 md:ml-auto text-primary">
      <a href="https://www.buymeacoffee.com/seadfeng" target="_blank" title="Buy Me A Coffee"><img className="rounded-full" width={25} height={25} src="https://www.faviconextractor.com/favicon/buymeacoffee.com?larger=true" alt="Buy Me A Coffee" /> </a>
      <LocaleSwitch />
      <ModeToggle /> 
      <a href="https://github.com/seadfeng/favicon-downloader" className="flex flex-shrink-0">
        <img title="Favicon Downloader Github" alt="Favicon Downloader Github" height={20} className="h-[20px]" src="https://img.shields.io/github/stars/seadfeng/favicon-downloader?style=social" />
      </a>
    </div>
  </header>
  )
}