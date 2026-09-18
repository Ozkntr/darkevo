import type { AppLocale } from "./locales";

export type AppDictionary = {
  common: Record<string, string>;
  language: Record<string, string>;
  header: Record<string, string>;
  nav: Record<string, string>;
  home: Record<string, string>;
  wiki: Record<string, string>;
  support: Record<string, string>;
  play: Record<string, string>;
  footer: Record<string, string>;
};

export type Dictionaries = Record<AppLocale, AppDictionary>;
