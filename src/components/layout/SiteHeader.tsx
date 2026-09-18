"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { DiscordIcon } from "./DiscordIcon";
import { LogoMark } from "./LogoMark";
import { NavDropdown } from "./NavDropdown";
import { outboundProps, SITE_LINKS } from "@/lib/site-links";

export function SiteHeader() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const homeActive = pathname === "/";
  const wikiActive = pathname.startsWith("/wiki");
  const supportActive = pathname.startsWith("/destek");

  const wikiItems = [
    { href: "/wiki/baslangic", label: t("nav.wikiStart") },
    { href: "/wiki/siniflar", label: t("nav.wikiClasses") },
    { href: "/wiki/dunya", label: t("nav.wikiWorld") },
    { href: "/wiki/seviyeler", label: t("nav.wikiLevels") },
    { href: "/wiki/yama-notlari", label: t("nav.wikiPatches") },
  ];

  const supportItems = [
    { href: "/destek/sss", label: t("nav.supportFaq") },
    { href: "/destek/kurallar", label: t("nav.supportRules") },
    { href: "/destek/talep", label: t("nav.supportTicket") },
    { href: "/destek/iletisim", label: t("nav.supportContact") },
  ];

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link href="/" className="brand" aria-label={t("header.logoAlt")} onClick={() => setMobileOpen(false)}>
          <span className="brand__portrait" aria-hidden>
            <LogoMark className="brand__mark" />
          </span>
          <span className="brand__name">{t("common.brandName")}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <Link href="/" className={`nav-link ${homeActive ? "is-active" : ""}`}>
            {t("nav.home")}
          </Link>
          <span className="nav-rule" aria-hidden />
          <NavDropdown label={t("nav.wiki")} href="/wiki" items={wikiItems} active={wikiActive} />
          <NavDropdown label={t("nav.support")} href="/destek" items={supportItems} active={supportActive} />
        </nav>

        <div className="site-header__actions">
          <a
            href={SITE_LINKS.discord}
            className="icon-btn"
            aria-label={t("header.discord")}
            title={t("header.discord")}
            {...outboundProps(SITE_LINKS.discord)}
          >
            <DiscordIcon />
          </a>
          <LanguageSwitcher />
          <AuthStatus />
          <Link href="/oyna" className="play-btn">
            {t("header.playFree")}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("common.closeMenu") : t("common.openMenu")}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mobile-drawer">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            {t("nav.home")}
          </Link>
          <p>{t("nav.wiki")}</p>
          {wikiItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <p>{t("nav.support")}</p>
          {supportItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/oyna" className="play-btn play-btn--block" onClick={() => setMobileOpen(false)}>
            {t("header.playFree")}
          </Link>
          <div onClick={() => setMobileOpen(false)}>
            <AuthStatus />
          </div>
          <a href={SITE_LINKS.discord} className="ghost-btn" onClick={() => setMobileOpen(false)} {...outboundProps(SITE_LINKS.discord)}>
            {t("header.discord")}
          </a>
        </div>
      ) : null}
    </header>
  );
}

function AuthStatus() {
  const { t } = useLocale();
  const { user, loading, logout } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <Link href="/giris" className="ghost-btn ghost-btn--compact">
        {t("auth.submit")}
      </Link>
    );
  }

  return (
    <div className="auth-status">
      <Link href="/destek/talep" className="auth-status__name">
        {user.username}
      </Link>
      <button type="button" className="ghost-btn ghost-btn--compact" onClick={() => void logout()}>
        {t("auth.logout")}
      </button>
    </div>
  );
}
