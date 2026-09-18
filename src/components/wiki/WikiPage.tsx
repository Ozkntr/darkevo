"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { WIKI_SLUGS, type WikiSlug } from "@/lib/content";

const WIKI_NAV: { slug: WikiSlug; labelKey: string }[] = [
  { slug: "baslangic", labelKey: "nav.wikiStart" },
  { slug: "siniflar", labelKey: "nav.wikiClasses" },
  { slug: "dunya", labelKey: "nav.wikiWorld" },
  { slug: "yama-notlari", labelKey: "nav.wikiPatches" },
];

function WikiIndex() {
  const { t } = useLocale();
  return (
    <div className="page-shell">
      <header className="page-hero">
        <p className="kicker">{t("nav.wiki")}</p>
        <h1>{t("wiki.title")}</h1>
        <p className="lead">{t("wiki.intro")}</p>
      </header>
      <div className="card-grid">
        {WIKI_NAV.map((item) => (
          <Link key={item.slug} href={`/wiki/${item.slug}`} className="text-card">
            <h2>{t(item.labelKey)}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

function WikiArticle({ slug }: { slug: WikiSlug }) {
  const { t } = useLocale();

  return (
    <article className="page-shell article">
      <nav className="subnav">
        {WIKI_NAV.map((item) => (
          <Link key={item.slug} href={`/wiki/${item.slug}`} className={item.slug === slug ? "is-active" : ""}>
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>

      {slug === "baslangic" ? (
        <>
          <h1>{t("wiki.startTitle")}</h1>
          <p className="lead">{t("wiki.startLead")}</p>
          <p>{t("wiki.startBody")}</p>
          <ul className="tips">
            <li>{t("wiki.startTip1")}</li>
            <li>{t("wiki.startTip2")}</li>
            <li>{t("wiki.startTip3")}</li>
          </ul>
        </>
      ) : null}

      {slug === "siniflar" ? (
        <>
          <h1>{t("wiki.classesTitle")}</h1>
          <p className="lead">{t("wiki.classesLead")}</p>
          <div className="class-grid">
            <article className="class-card class-card--shadow">
              <h2>{t("home.classShadowblade")}</h2>
              <p>{t("home.classShadowbladeBody")}</p>
            </article>
            <article className="class-card class-card--ember">
              <h2>{t("home.classEmber")}</h2>
              <p>{t("home.classEmberBody")}</p>
            </article>
            <article className="class-card class-card--ward">
              <h2>{t("home.classWarden")}</h2>
              <p>{t("home.classWardenBody")}</p>
            </article>
            <article className="class-card class-card--stalk">
              <h2>{t("home.classStalker")}</h2>
              <p>{t("home.classStalkerBody")}</p>
            </article>
          </div>
        </>
      ) : null}

      {slug === "dunya" ? (
        <>
          <h1>{t("wiki.worldTitle")}</h1>
          <p className="lead">{t("wiki.worldLead")}</p>
          <p>{t("wiki.worldBody")}</p>
        </>
      ) : null}

      {slug === "yama-notlari" ? (
        <>
          <h1>{t("wiki.patchesTitle")}</h1>
          <p className="lead">{t("wiki.patchesLead")}</p>
          <div className="news-card">
            <h2>{t("wiki.patchLatest")}</h2>
            <p>{t("wiki.patchBody")}</p>
          </div>
        </>
      ) : null}
    </article>
  );
}

export function WikiPage({ slug }: { slug?: WikiSlug }) {
  if (!slug) return <WikiIndex />;
  return <WikiArticle slug={slug} />;
}
