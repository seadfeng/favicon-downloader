"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "@/lib/i18n";
import { useTranslations } from "next-intl";

import { appConfig } from "@/config";
import {
  Menu
} from "lucide-react";
import Image from "next/image";
export function NavBar() {
  const t = useTranslations();
  const memu = [
    {
      name: appConfig.appName,
      href: "/"
    }
  ];

  const Logo =()=>{
    return(
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Image alt={appConfig.appName} src={"/logo.png"} width={25} height={25} className="h-6 w-6" />
        <span className="sr-only">{appConfig.appName}</span>
      </Link>
    )
  }
  return (
    <div className="w-full">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Logo />
        {memu.map(item =>
          <Link 
          key={item.name} 
          href={item.href} 
          className="text-foreground transition-colors hover:text-foreground"
          >
            {item.name}
          </Link> 
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Logo />
            {memu.map(item =>
              <Link 
              key={item.name} 
              href={item.href} 
              className="text-muted-foreground hover:text-foreground"
              >
                {item.name}
              </Link> 
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
