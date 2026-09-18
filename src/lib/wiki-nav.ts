import type { WikiSlug } from "./content";

export type WikiTocItem = {
  id: string;
  labelKey: string;
};

export type WikiNavChild = {
  href: string;
  labelKey: string;
};

export type WikiNavEntry =
  | {
      kind: "link";
      slug: WikiSlug;
      labelKey: string;
    }
  | {
      kind: "group";
      id: string;
      labelKey: string;
      children: WikiNavChild[];
    };

/** Sol wiki menüsü — RedGalaxy tarzı kategori yapısı, Darkevo içeriği. */
export const WIKI_SIDEBAR: WikiNavEntry[] = [
  { kind: "link", slug: "baslangic", labelKey: "wikiNav.start" },
  { kind: "link", slug: "siniflar", labelKey: "wikiNav.classes" },
  {
    kind: "group",
    id: "world",
    labelKey: "wikiNav.world",
    children: [
      { href: "/wiki/dunya#genel-bakis", labelKey: "wikiNav.worldOverview" },
      { href: "/wiki/dunya#bolgeler", labelKey: "wikiNav.regions" },
      { href: "/wiki/dunya#bosslar", labelKey: "wikiNav.bosses" },
    ],
  },
  {
    kind: "group",
    id: "progress",
    labelKey: "wikiNav.progress",
    children: [
      { href: "/wiki/seviyeler#kilometre-taslari", labelKey: "wikiNav.levels" },
      { href: "/wiki/seviyeler#seviye-tablosu", labelKey: "wikiNav.levelTable" },
    ],
  },
  {
    kind: "group",
    id: "updates",
    labelKey: "wikiNav.updates",
    children: [{ href: "/wiki/yama-notlari#son-yama", labelKey: "wikiNav.patches" }],
  },
];

export const WIKI_PAGE_TOC: Record<WikiSlug, WikiTocItem[]> = {
  baslangic: [
    { id: "genel-bakis", labelKey: "wikiToc.overview" },
    { id: "ilk-adimlar", labelKey: "wikiToc.firstSteps" },
    { id: "ipuclari", labelKey: "wikiToc.tips" },
  ],
  siniflar: [
    { id: "genel-bakis", labelKey: "wikiToc.overview" },
    { id: "sinif-listesi", labelKey: "wikiToc.classList" },
    { id: "golge-bicagi", labelKey: "wikiToc.shadowblade" },
    { id: "kor-buyucusu", labelKey: "wikiToc.ember" },
    { id: "muhafiz", labelKey: "wikiToc.warden" },
    { id: "iz-surucu", labelKey: "wikiToc.stalker" },
  ],
  dunya: [
    { id: "genel-bakis", labelKey: "wikiToc.overview" },
    { id: "bolgeler", labelKey: "wikiToc.regions" },
    { id: "bosslar", labelKey: "wikiToc.bosses" },
  ],
  seviyeler: [
    { id: "genel-bakis", labelKey: "wikiToc.overview" },
    { id: "kilometre-taslari", labelKey: "wikiToc.milestones" },
    { id: "seviye-tablosu", labelKey: "wikiToc.levelTable" },
  ],
  "yama-notlari": [
    { id: "genel-bakis", labelKey: "wikiToc.overview" },
    { id: "son-yama", labelKey: "wikiToc.latestPatch" },
  ],
};

export function isWikiNavActive(entry: WikiNavEntry, slug: WikiSlug | undefined) {
  if (!slug) return false;
  if (entry.kind === "link") return entry.slug === slug;
  return entry.children.some((child) => child.href.startsWith(`/wiki/${slug}`));
}
