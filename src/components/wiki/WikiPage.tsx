"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { WikiSlug } from "@/lib/content";
import { LevelSystemSection } from "./LevelSystemSection";
import { WikiShell } from "./WikiShell";

const CLASSES = [
  {
    id: "golge-bicagi",
    tone: "shadow",
    titleKey: "home.classShadowblade",
    bodyKey: "home.classShadowbladeBody",
    roleKey: "wiki.classRoleMelee",
  },
  {
    id: "kor-buyucusu",
    tone: "ember",
    titleKey: "home.classEmber",
    bodyKey: "home.classEmberBody",
    roleKey: "wiki.classRoleCaster",
  },
  {
    id: "muhafiz",
    tone: "ward",
    titleKey: "home.classWarden",
    bodyKey: "home.classWardenBody",
    roleKey: "wiki.classRoleTank",
  },
  {
    id: "iz-surucu",
    tone: "stalk",
    titleKey: "home.classStalker",
    bodyKey: "home.classStalkerBody",
    roleKey: "wiki.classRoleRanged",
  },
] as const;

function WikiIndex() {
  const { t } = useLocale();
  return (
    <WikiShell title={t("wiki.title")}>
      <section id="genel-bakis" className="wiki-section">
        <h2>{t("wikiToc.overview")}</h2>
        <p>{t("wiki.intro")}</p>
      </section>
      <section className="wiki-section">
        <div className="wiki-card-grid">
          <Link href="/wiki/baslangic" className="wiki-entry-card">
            <h3>{t("nav.wikiStart")}</h3>
            <p>{t("wiki.startLead")}</p>
          </Link>
          <Link href="/wiki/siniflar" className="wiki-entry-card">
            <h3>{t("nav.wikiClasses")}</h3>
            <p>{t("wiki.classesLead")}</p>
          </Link>
          <Link href="/wiki/dunya" className="wiki-entry-card">
            <h3>{t("nav.wikiWorld")}</h3>
            <p>{t("wiki.worldLead")}</p>
          </Link>
          <Link href="/wiki/seviyeler" className="wiki-entry-card">
            <h3>{t("nav.wikiLevels")}</h3>
            <p>{t("levels.lead")}</p>
          </Link>
          <Link href="/wiki/yama-notlari" className="wiki-entry-card">
            <h3>{t("nav.wikiPatches")}</h3>
            <p>{t("wiki.patchesLead")}</p>
          </Link>
        </div>
      </section>
    </WikiShell>
  );
}

function WikiArticle({ slug }: { slug: WikiSlug }) {
  const { t } = useLocale();

  const titles: Record<WikiSlug, string> = {
    baslangic: t("wiki.startTitle"),
    siniflar: t("wiki.classesTitle"),
    dunya: t("wiki.worldTitle"),
    seviyeler: t("levels.title"),
    "yama-notlari": t("wiki.patchesTitle"),
  };

  return (
    <WikiShell slug={slug} title={titles[slug]}>
      {slug === "baslangic" ? (
        <>
          <section id="genel-bakis" className="wiki-section">
            <h2>{t("wikiToc.overview")}</h2>
            <p className="lead">{t("wiki.startLead")}</p>
            <p>{t("wiki.startBody")}</p>
          </section>
          <section id="ilk-adimlar" className="wiki-section">
            <h2>{t("wikiToc.firstSteps")}</h2>
            <p>{t("wiki.startBody")}</p>
          </section>
          <section id="ipuclari" className="wiki-section">
            <h2>{t("wikiToc.tips")}</h2>
            <ul className="tips">
              <li>{t("wiki.startTip1")}</li>
              <li>{t("wiki.startTip2")}</li>
              <li>{t("wiki.startTip3")}</li>
            </ul>
          </section>
        </>
      ) : null}

      {slug === "siniflar" ? (
        <>
          <section id="genel-bakis" className="wiki-section">
            <h2>{t("wikiToc.overview")}</h2>
            <p>{t("wiki.classesOverview1")}</p>
            <p>{t("wiki.classesOverview2")}</p>
          </section>

          <section id="sinif-listesi" className="wiki-section">
            <h2>{t("wikiToc.classList")}</h2>
            <div className="wiki-entity-grid">
              {CLASSES.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={`wiki-entity-card wiki-entity-card--${item.tone}`}>
                  <div className="wiki-entity-card__art" aria-hidden />
                  <div className="wiki-entity-card__meta">
                    <span>{t(item.roleKey)}</span>
                    <strong>{t(item.titleKey)}</strong>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {CLASSES.map((item) => (
            <section key={item.id} id={item.id} className="wiki-section">
              <h2>{t(item.titleKey)}</h2>
              <p className="wiki-section__role">{t(item.roleKey)}</p>
              <p>{t(item.bodyKey)}</p>
            </section>
          ))}
        </>
      ) : null}

      {slug === "dunya" ? (
        <>
          <section id="genel-bakis" className="wiki-section">
            <h2>{t("wikiToc.overview")}</h2>
            <p className="lead">{t("wiki.worldLead")}</p>
            <p>{t("wiki.worldBody")}</p>
          </section>
          <section id="bolgeler" className="wiki-section">
            <h2>{t("wikiToc.regions")}</h2>
            <div className="wiki-entity-grid">
              <article className="wiki-entity-card">
                <div className="wiki-entity-card__art wiki-entity-card__art--ash" aria-hidden />
                <div className="wiki-entity-card__meta">
                  <span>{t("wiki.regionAshTag")}</span>
                  <strong>{t("wiki.regionAsh")}</strong>
                </div>
              </article>
              <article className="wiki-entity-card">
                <div className="wiki-entity-card__art wiki-entity-card__art--void" aria-hidden />
                <div className="wiki-entity-card__meta">
                  <span>{t("wiki.regionVoidTag")}</span>
                  <strong>{t("wiki.regionVoid")}</strong>
                </div>
              </article>
              <article className="wiki-entity-card">
                <div className="wiki-entity-card__art wiki-entity-card__art--crown" aria-hidden />
                <div className="wiki-entity-card__meta">
                  <span>{t("wiki.regionCrownTag")}</span>
                  <strong>{t("wiki.regionCrown")}</strong>
                </div>
              </article>
            </div>
            <p>{t("wiki.regionsBody")}</p>
          </section>
          <section id="bosslar" className="wiki-section">
            <h2>{t("wikiToc.bosses")}</h2>
            <p>{t("wiki.bossesBody")}</p>
          </section>
        </>
      ) : null}

      {slug === "seviyeler" ? <LevelSystemSection /> : null}

      {slug === "yama-notlari" ? (
        <>
          <section id="genel-bakis" className="wiki-section">
            <h2>{t("wikiToc.overview")}</h2>
            <p className="lead">{t("wiki.patchesLead")}</p>
          </section>
          <section id="son-yama" className="wiki-section">
            <h2>{t("wikiToc.latestPatch")}</h2>
            <div className="news-card">
              <h3>{t("wiki.patchLatest")}</h3>
              <p>{t("wiki.patchBody")}</p>
            </div>
          </section>
        </>
      ) : null}
    </WikiShell>
  );
}

export function WikiPage({ slug }: { slug?: WikiSlug }) {
  if (!slug) return <WikiIndex />;
  return <WikiArticle slug={slug} />;
}
