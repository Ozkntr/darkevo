"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="page-shell">
      <h1>404</h1>
      <p className="lead">{t("common.notFound")}</p>
      <Link href="/" className="play-btn">
        {t("common.backHome")}
      </Link>
    </div>
  );
}
