"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";

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
        </nav>
        <p className="site-footer__copy">
          © {year} {t("common.brandName")}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
