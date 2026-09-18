export const WIKI_SLUGS = ["baslangic", "siniflar", "dunya", "seviyeler", "yama-notlari"] as const;
export type WikiSlug = (typeof WIKI_SLUGS)[number];

export const SUPPORT_SLUGS = ["sss", "kurallar", "talep", "iletisim"] as const;
export type SupportSlug = (typeof SUPPORT_SLUGS)[number];

export function isWikiSlug(value: string): value is WikiSlug {
  return (WIKI_SLUGS as readonly string[]).includes(value);
}

export function isSupportSlug(value: string): value is SupportSlug {
  return (SUPPORT_SLUGS as readonly string[]).includes(value);
}
