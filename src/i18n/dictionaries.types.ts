import type { AppLocale } from "./locales";

/** Çeviri sözlüğü şekli — tr/en/de aynı anahtar yapısına sahip olmalı */
export type AppDictionary = {
  common: Record<string, string>;
  language: Record<string, string>;
  header: Record<string, string>;
  nav: Record<string, string>;
  home: Record<string, string>;
  wiki: Record<string, string>;
  wikiNav: Record<string, string>;
  wikiToc: Record<string, string>;
  support: Record<string, string>;
  play: Record<string, string>;
  auth: Record<string, string>;
  levels: {
    title: string;
    lead: string;
    milestones: string;
    tableTitle: string;
    levelLabel: string;
    requiredExp: string;
    colLevel: string;
    colExp: string;
    colAlly: string;
    colEnemy: string;
    colDesc: string;
    colTitle: string;
    none: string;
    access: Record<string, string>;
    desc: Record<string, string>;
    titles: Record<string, string>;
  };
  footer: Record<string, string>;
};

export type Dictionaries = Record<AppLocale, AppDictionary>;
