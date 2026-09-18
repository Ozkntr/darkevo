"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "./LocaleProvider";
import type { AppLocale } from "@/i18n/locales";

function FlagTurkey({ className }: { className?: string }) {
  const clipId = `tr-flag-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <rect width="60" height="40" rx="3" ry="3" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="40" fill="#E30A17" />
        <circle cx="22" cy="20" r="10" fill="#fff" />
        <circle cx="25.5" cy="20" r="8" fill="#E30A17" />
        <polygon
          fill="#fff"
          points="32,20 36.5,21.4 34.2,25.3 34.2,20.9 38.5,18.6 33.8,18.6 32,14.2 30.2,18.6 25.5,18.6 29.8,20.9 29.8,25.3 27.5,21.4"
        />
      </g>
    </svg>
  );
}

function FlagUsa({ className }: { className?: string }) {
  const clipId = `us-flag-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <rect width="60" height="40" rx="3" ry="3" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="60" height="40" fill="#B22234" />
        <path
          fill="#fff"
          d="M0 3.08h60v3.08H0zm0 6.15h60v3.08H0zm0 6.15h60v3.08H0zm0 6.15h60v3.08H0zm0 6.15h60v3.08H0zm0 6.15h60v3.08H0z"
        />
        <rect width="24" height="21.54" fill="#3C3B6E" />
      </g>
    </svg>
  );
}

const OPTIONS: { locale: AppLocale; Flag: typeof FlagTurkey; shortKey: string; nameKey: string }[] = [
  { locale: "tr", Flag: FlagTurkey, shortKey: "language.turkishShort", nameKey: "language.optionTurkish" },
  { locale: "en", Flag: FlagUsa, shortKey: "language.englishShort", nameKey: "language.optionEnglish" },
];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((item) => item.locale === locale) ?? OPTIONS[0];
  const CurrentFlag = current.Flag;

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-switcher__trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t("language.languageMenu")}
        onClick={() => setOpen((value) => !value)}
      >
        <CurrentFlag className="lang-switcher__flag" />
        <span>{t(current.shortKey)}</span>
        <svg className={`lang-switcher__caret ${open ? "is-open" : ""}`} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <path d="M4 6l4 4 4-4H4z" />
        </svg>
      </button>
      {open ? (
        <div className="lang-switcher__menu" role="listbox" aria-label={t("language.languageMenu")}>
          {OPTIONS.map((item) => {
            const selected = item.locale === locale;
            const Flag = item.Flag;
            return (
              <button
                key={item.locale}
                type="button"
                role="option"
                aria-selected={selected}
                className={`lang-switcher__option ${selected ? "is-selected" : ""}`}
                onClick={() => {
                  setLocale(item.locale);
                  setOpen(false);
                }}
              >
                <Flag className="lang-switcher__flag" />
                <span>{t(item.shortKey)}</span>
                <span className="lang-switcher__name">{t(item.nameKey)}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
