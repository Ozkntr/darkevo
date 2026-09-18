import type { AppDictionary } from "./dictionaries.types";
import type { AppLocale } from "./locales";
import tr from "./dictionaries.tr";

const cache: Partial<Record<AppLocale, AppDictionary>> = { tr };

export function getCachedDictionary(locale: AppLocale): AppDictionary {
  return cache[locale] ?? tr;
}

export async function loadDictionary(locale: AppLocale): Promise<AppDictionary> {
  const hit = cache[locale];
  if (hit) return hit;
  if (locale === "en") {
    const mod = await import("./dictionaries.en");
    cache.en = mod.default;
    return mod.default;
  }
  if (locale === "de") {
    const mod = await import("./dictionaries.de");
    cache.de = mod.default;
    return mod.default;
  }
  cache.tr = tr;
  return tr;
}

export function lookupMessage(
  dict: AppDictionary,
  path: string,
  params?: Record<string, string | number>,
): string {
  const parts = path.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current !== null && typeof current === "object" && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  if (typeof current !== "string") return path;
  if (!params) return current;
  return Object.entries(params).reduce(
    (message, [key, value]) => message.replaceAll(`{${key}}`, String(value)),
    current,
  );
}
