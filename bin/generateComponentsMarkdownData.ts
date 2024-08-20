#!/usr/bin/env tsx

import { appConfig, type LocaleType } from '@/config';
import { componentsMarkdownFile as binComponentsMarkdownFile, contentComponentsMarkdownDir } from '@/i18n';
import fs from 'fs';
import path from 'path';

const { i18n: { locales } } = appConfig;

const componentsMarkdownFile = `public/${binComponentsMarkdownFile}`;

const contentDir = path.join(process.cwd(), 'public', contentComponentsMarkdownDir);

function generateComponentMarkdownData(dir: string, jsonData: Record<string, { locales: string[] }> = {}): Record<string, { locales: string[] }> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      generateComponentMarkdownData(fullPath, jsonData);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const relativePath = path.relative(contentDir, path.dirname(fullPath)).replace(/\\/g, '/');
      const locale = path.basename(entry.name, '.md') as LocaleType;

      if (locales.includes(locale)) {
        if (!jsonData[relativePath]) {
          jsonData[relativePath] = { locales: [] };
        }
        if (!jsonData[relativePath].locales.includes(locale)) {
          jsonData[relativePath].locales.push(locale);
        }
      }
    }
  });

  return jsonData;
}

function writeComponentMarkdownData(): void {
  const jsonData = generateComponentMarkdownData(contentDir);
  const outputDir = path.dirname(componentsMarkdownFile);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    componentsMarkdownFile,
    JSON.stringify(jsonData, null, 2),
    'utf8'
  );

  console.log(`Generated components markdown data at ${componentsMarkdownFile}`);
}

writeComponentMarkdownData();