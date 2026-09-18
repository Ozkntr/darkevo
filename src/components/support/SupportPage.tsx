"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { SupportSlug } from "@/lib/content";

const SUPPORT_NAV: { slug: SupportSlug; labelKey: string }[] = [
  { slug: "sss", labelKey: "nav.supportFaq" },
  { slug: "kurallar", labelKey: "nav.supportRules" },
  { slug: "iletisim", labelKey: "nav.supportContact" },
];

function SupportIndex() {
  const { t } = useLocale();
  return (
    <div className="page-shell">
      <header className="page-hero">
        <p className="kicker">{t("nav.support")}</p>
        <h1>{t("support.title")}</h1>
        <p className="lead">{t("support.intro")}</p>
      </header>
      <div className="card-grid">
        {SUPPORT_NAV.map((item) => (
          <Link key={item.slug} href={`/destek/${item.slug}`} className="text-card">
            <h2>{t(item.labelKey)}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ContactForm() {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return <p className="form-success">{t("support.contactSent")}</p>;
  }

  return (
    <form className="panel-form" onSubmit={onSubmit}>
      <label>
        {t("support.contactName")}
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        {t("support.contactEmail")}
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        {t("support.contactTopic")}
        <select name="topic" defaultValue="account">
          <option value="account">{t("support.topicAccount")}</option>
          <option value="client">{t("support.topicClient")}</option>
          <option value="report">{t("support.topicReport")}</option>
          <option value="other">{t("support.topicOther")}</option>
        </select>
      </label>
      <label>
        {t("support.contactMessage")}
        <textarea name="message" rows={5} required />
      </label>
      <button type="submit" className="play-btn">
        {t("support.contactSend")}
      </button>
    </form>
  );
}

function SupportArticle({ slug }: { slug: SupportSlug }) {
  const { t } = useLocale();

  return (
    <article className="page-shell article">
      <nav className="subnav">
        {SUPPORT_NAV.map((item) => (
          <Link key={item.slug} href={`/destek/${item.slug}`} className={item.slug === slug ? "is-active" : ""}>
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>

      {slug === "sss" ? (
        <>
          <h1>{t("support.faqTitle")}</h1>
          <dl className="faq">
            <dt>{t("support.faq1Q")}</dt>
            <dd>{t("support.faq1A")}</dd>
            <dt>{t("support.faq2Q")}</dt>
            <dd>{t("support.faq2A")}</dd>
            <dt>{t("support.faq3Q")}</dt>
            <dd>{t("support.faq3A")}</dd>
          </dl>
        </>
      ) : null}

      {slug === "kurallar" ? (
        <>
          <h1>{t("support.rulesTitle")}</h1>
          <p className="lead">{t("support.rulesLead")}</p>
          <ol className="tips">
            <li>{t("support.rule1")}</li>
            <li>{t("support.rule2")}</li>
            <li>{t("support.rule3")}</li>
            <li>{t("support.rule4")}</li>
          </ol>
        </>
      ) : null}

      {slug === "iletisim" ? (
        <>
          <h1>{t("support.contactTitle")}</h1>
          <p className="lead">{t("support.contactLead")}</p>
          <ContactForm />
        </>
      ) : null}
    </article>
  );
}

export function SupportPage({ slug }: { slug?: SupportSlug }) {
  if (!slug) return <SupportIndex />;
  return <SupportArticle slug={slug} />;
}
