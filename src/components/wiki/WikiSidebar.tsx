"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { WikiSlug } from "@/lib/content";
import { isWikiNavActive, WIKI_SIDEBAR, type WikiNavEntry } from "@/lib/wiki-nav";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg className={`wiki-side__chevron ${open ? "is-open" : ""}`} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M4 6l4 4 4-4H4z" />
    </svg>
  );
}

function NavGroup({
  entry,
  slug,
  defaultOpen,
}: {
  entry: Extract<WikiNavEntry, { kind: "group" }>;
  slug?: WikiSlug;
  defaultOpen: boolean;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);

  return (
    <div className="wiki-side__group">
      <button type="button" className="wiki-side__group-btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span>{t(entry.labelKey)}</span>
        <Chevron open={open} />
      </button>
      {open ? (
        <div className="wiki-side__children">
          {entry.children.map((child) => {
            const active = slug ? child.href.startsWith(`/wiki/${slug}`) : false;
            return (
              <Link key={child.href} href={child.href} className={`wiki-side__child ${active ? "is-active" : ""}`}>
                {t(child.labelKey)}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function WikiSidebar({ slug }: { slug?: WikiSlug }) {
  const { t } = useLocale();

  return (
    <aside className="wiki-side" aria-label={t("wiki.sidebarLabel")}>
      <p className="wiki-side__brand">{t("wiki.title")}</p>
      <nav className="wiki-side__nav">
        {WIKI_SIDEBAR.map((entry) => {
          if (entry.kind === "link") {
            const active = entry.slug === slug;
            return (
              <Link
                key={entry.slug}
                href={`/wiki/${entry.slug}`}
                className={`wiki-side__link ${active ? "is-active" : ""}`}
              >
                {t(entry.labelKey)}
              </Link>
            );
          }
          return (
            <NavGroup
              key={entry.id}
              entry={entry}
              slug={slug}
              defaultOpen={isWikiNavActive(entry, slug)}
            />
          );
        })}
      </nav>
    </aside>
  );
}
