"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/LocaleProvider";

export default function NotFound() {
  const { locale } = useLocale();
  const isEn = locale === "en";

  return (
    <div className="page-shell">
      <h1>404</h1>
      <p className="lead">{isEn ? "This page does not exist." : "Bu sayfa bulunamadı."}</p>
      <Link href="/" className="play-btn">
        {isEn ? "Back home" : "Ana sayfaya dön"}
      </Link>
    </div>
  );
}
