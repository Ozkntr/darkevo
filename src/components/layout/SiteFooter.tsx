"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { DiscordIcon } from "./DiscordIcon";
import { outboundProps, SITE_LINKS } from "@/lib/site-links";

export function SiteFooter() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <strong className="site-footer__brand">{t("common.brandName")}</strong>
          <p>{t("footer.tagline")}</p>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <Link href="/wiki">{t("footer.wiki")}</Link>
          <Link href="/destek">{t("footer.support")}</Link>
          <Link href="/oyna">{t("footer.play")}</Link>
          <a href={SITE_LINKS.launcher} {...outboundProps(SITE_LINKS.launcher)}>
            {t("footer.launcher")}
          </a>
          <a href={SITE_LINKS.discord} className="site-footer__discord" {...outboundProps(SITE_LINKS.discord)}>
            <DiscordIcon />
            {t("footer.discord")}
          </a>
        </nav>
        <p className="site-footer__copy">
          © {year} {t("common.brandName")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
