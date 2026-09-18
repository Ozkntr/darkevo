export const LOCALE_STORAGE_KEY = "darkevo-locale";

export type AppLocale = "tr" | "en" | "de";

export const defaultLocale: AppLocale = "tr";

export const locales: AppLocale[] = ["tr", "en", "de"];

export function isAppLocale(value: string | null): value is AppLocale {
  return value === "tr" || value === "en" || value === "de";
}

export function localeHtmlLang(locale: AppLocale): string {
  if (locale === "en") return "en";
  if (locale === "de") return "de";
  return "tr";
}
