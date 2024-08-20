"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function ModeToggle() {
  const { theme, setTheme } = useTheme(); 
  const t = useTranslations();

  return ( 
    <Button aria-label="Theme Mode" variant="ghost" size="icon" className="h-10 w-12 rounded-md" onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")} >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button> 
  )
}
