import { getCachedDictionary, loadDictionary, lookupMessage } from "./dictionary-cache";
import type { AppLocale } from "./locales";

export function getMessage(
  locale: AppLocale,
  path: string,
  params?: Record<string, string | number>,
): string {
  return lookupMessage(getCachedDictionary(locale), path, params);
}

export { loadDictionary };
