"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { outboundProps, SITE_LINKS } from "@/lib/site-links";

export function HomePage() {
  const { t } = useLocale();

  const classes = [
    { title: t("home.classShadowblade"), body: t("home.classShadowbladeBody"), tone: "shadow" },
    { title: t("home.classEmber"), body: t("home.classEmberBody"), tone: "ember" },
    { title: t("home.classWarden"), body: t("home.classWardenBody"), tone: "ward" },
    { title: t("home.classStalker"), body: t("home.classStalkerBody"), tone: "stalk" },
  ];

  const news = [
    { date: t("home.news1Date"), title: t("home.news1Title"), body: t("home.news1Body"), href: "/wiki/yama-notlari" },
    { date: t("home.news2Date"), title: t("home.news2Title"), body: t("home.news2Body"), href: "/wiki/siniflar" },
    { date: t("home.news3Date"), title: t("home.news3Title"), body: t("home.news3Body"), href: "/wiki/dunya" },
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__veil" />
        <div className="hero__copy">
          <p className="kicker">{t("home.kicker")}</p>
          <h1>{t("home.title")}</h1>
          <p className="lead">{t("home.lead")}</p>
          <div className="hero__actions">
            <Link href="/oyna" className="play-btn play-btn--lg">
              {t("home.ctaPlay")}
            </Link>
            <a className="ghost-btn" href={SITE_LINKS.discord} {...outboundProps(SITE_LINKS.discord)}>
              {t("home.ctaDiscord")}
            </a>
            <Link href="/wiki" className="ghost-btn">
              {t("home.ctaWiki")}
            </Link>
          </div>
          <dl className="hero__stats">
            <div>
              <dt>120K+</dt>
              <dd>{t("home.statPlayers")}</dd>
            </div>
            <div>
              <dt>8</dt>
              <dd>{t("home.statServers")}</dd>
            </div>
            <div>
              <dt>4</dt>
              <dd>{t("home.statClasses")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <h2>{t("home.featuresTitle")}</h2>
        <div className="feature-grid">
          <article>
            <h3>{t("home.featureCombatTitle")}</h3>
            <p>{t("home.featureCombatBody")}</p>
          </article>
          <article>
            <h3>{t("home.featureWorldTitle")}</h3>
            <p>{t("home.featureWorldBody")}</p>
          </article>
          <article>
            <h3>{t("home.featureGuildTitle")}</h3>
            <p>{t("home.featureGuildBody")}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>{t("home.classesTitle")}</h2>
        <div className="class-grid">
          {classes.map((item) => (
            <article key={item.tone} className={`class-card class-card--${item.tone}`}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{t("home.newsTitle")}</h2>
        <div className="news-grid">
          {news.map((item) => (
            <article key={item.title} className="news-card">
              <time>{item.date}</time>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link href={item.href}>{t("home.readWiki")}</Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
