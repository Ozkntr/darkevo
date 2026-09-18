"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";

function LoginDetails() {
  const { t } = useLocale();
  const { user, loading } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/destek/talep";

  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [loading, user, next, router]);

  return (
    <div className="page-shell">
      <header className="page-hero">
        <p className="kicker">{t("common.brandName")}</p>
        <h1>{t("auth.title")}</h1>
        <p className="lead">{t("auth.lead")}</p>
      </header>
      {loading || user ? <p className="hint">{t("auth.pleaseWait")}</p> : <LoginForm nextHref={next} />}
    </div>
  );
}

export function LoginPage() {
  return (
    <Suspense>
      <LoginDetails />
    </Suspense>
  );
}
