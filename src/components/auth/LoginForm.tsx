"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function LoginForm({
  nextHref,
  registerHref = "/oyna#kayit",
}: {
  nextHref?: string;
  registerHref?: string;
}) {
  const { t } = useLocale();
  const { refresh } = useAuth();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(form.get("username") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(t(`auth.${data.error === "invalidCredentials" ? "invalidCredentials" : "errorGeneric"}`));
        return;
      }
      await refresh();
      if (nextHref) window.location.assign(nextHref);
    } catch {
      setError(t("auth.errorGeneric"));
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="panel-form" method="post" onSubmit={onSubmit}>
      <label>
        {t("auth.username")}
        <input name="username" required autoComplete="username" minLength={3} maxLength={20} />
      </label>
      <label>
        {t("auth.password")}
        <input name="password" type="password" required autoComplete="current-password" minLength={8} />
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" className="play-btn" disabled={pending}>
        {pending ? t("auth.pleaseWait") : t("auth.submit")}
      </button>
      <p className="hint">
        {t("auth.noAccount")}{" "}
        <Link href={registerHref}>{t("auth.registerLink")}</Link>
      </p>
    </form>
  );
}
