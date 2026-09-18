"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { WikiSlug } from "@/lib/content";
import { WIKI_PAGE_TOC } from "@/lib/wiki-nav";

export function WikiToc({ slug }: { slug: WikiSlug }) {
  const { t } = useLocale();
  const items = WIKI_PAGE_TOC[slug];
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.4, 0.7] },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [items, slug]);

  return (
    <aside className="wiki-toc" aria-label={t("wiki.tocLabel")}>
      <p className="wiki-toc__title">{t("wiki.tocLabel")}</p>
      <nav className="wiki-toc__nav">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`wiki-toc__link ${activeId === item.id ? "is-active" : ""}`}
          >
            {t(item.labelKey)}
          </a>
        ))}
      </nav>
    </aside>
  );
}
