"use client";

import { useLocale } from "./LocaleProvider";

export function SkipLink() {
  const { t } = useLocale();
  return (
    <a href="#content" className="skip-link">
      {t("common.skipToContent")}
    </a>
  );
}
