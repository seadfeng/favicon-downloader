"use client";
import { appConfig } from "@/config";

export function Footer() {
  return (
    <footer className="container py-4 text-center text-sm text-muted-foreground mt-10">
      <span>
        © {new Date().getFullYear()} <a href="https://www.faviconextractor.com">{appConfig.appName}</a>. All rights reserved.
      </span>
    </footer>
  );
}
