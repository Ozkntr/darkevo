export const LOCALE_STORAGE_KEY = "darkevo-locale";

export type AppLocale = "tr" | "en";

export const defaultLocale: AppLocale = "tr";

export const locales: AppLocale[] = ["tr", "en"];

export function isAppLocale(value: string | null): value is AppLocale {
  return value === "tr" || value === "en";
}

export function localeHtmlLang(locale: AppLocale): string {
  return locale === "en" ? "en" : "tr";
}
