"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { outboundProps, SITE_LINKS } from "@/lib/site-links";

export function PlayPage() {
  const { t } = useLocale();
  const { user, refresh } = useAuth();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [registered, setRegistered] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: String(form.get("username") ?? ""),
          email: String(form.get("email") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(t(`auth.${mapRegisterError(data.error)}`));
        return;
      }
      await refresh();
      setRegistered(true);
    } catch {
      setError(t("auth.errorGeneric"));
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="page-shell play-page">
      <header className="page-hero">
        <p className="kicker">{t("common.brandName")}</p>
        <h1>{t("play.title")}</h1>
        <p className="lead">{t("play.lead")}</p>
        <div className="hero__actions">
          <a className="play-btn play-btn--lg" href={SITE_LINKS.launcher} {...outboundProps(SITE_LINKS.launcher)}>
            {t("play.download")}
          </a>
          <a className="ghost-btn" href={SITE_LINKS.discord} {...outboundProps(SITE_LINKS.discord)}>
            {t("play.discord")}
          </a>
        </div>
        <p className="hint">{t("play.downloadHint")}</p>
      </header>

      <section>
        <h2>{t("play.requirements")}</h2>
        <div className="req-grid">
          <table>
            <thead>
              <tr>
                <th />
                <th>{t("play.minTitle")}</th>
                <th>{t("play.recTitle")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{t("play.os")}</th>
                <td>{t("play.osMin")}</td>
                <td>{t("play.osRec")}</td>
              </tr>
              <tr>
                <th>{t("play.cpu")}</th>
                <td>{t("play.cpuMin")}</td>
                <td>{t("play.cpuRec")}</td>
              </tr>
              <tr>
                <th>{t("play.ram")}</th>
                <td>{t("play.ramMin")}</td>
                <td>{t("play.ramRec")}</td>
              </tr>
              <tr>
                <th>{t("play.gpu")}</th>
                <td>{t("play.gpuMin")}</td>
                <td>{t("play.gpuRec")}</td>
              </tr>
              <tr>
                <th>{t("play.storage")}</th>
                <td>{t("play.storageMin")}</td>
                <td>{t("play.storageRec")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="kayit">
        <h2>{t("play.accountTitle")}</h2>
        <p className="lead">{t("play.accountLead")}</p>
        {user || registered ? (
          <div>
            <p className="form-success">{t("play.submitted")}</p>
            <p className="hint">
              {t("auth.loggedInAs", { name: user?.username ?? "" })}{" "}
              <Link href="/destek/talep">{t("support.ticketTitle")}</Link>
            </p>
          </div>
        ) : (
          <form className="panel-form" method="post" action="#kayit" onSubmit={onSubmit}>
            <label>
              {t("play.username")}
              <input name="username" required autoComplete="username" minLength={3} maxLength={20} pattern="[A-Za-z0-9_]{3,20}" />
            </label>
            <label>
              {t("play.email")}
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              {t("play.password")}
              <input name="password" type="password" required autoComplete="new-password" minLength={8} />
            </label>
            {error ? <p className="form-error">{error}</p> : null}
            <button type="submit" className="play-btn" disabled={pending}>
              {pending ? t("auth.pleaseWait") : t("play.submit")}
            </button>
            <p className="hint">
              {t("auth.haveAccount")}{" "}
              <Link href="/giris">{t("auth.loginLink")}</Link>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}

function mapRegisterError(code?: string) {
  if (code === "usernameTaken" || code === "emailTaken" || code === "usernameInvalid" || code === "emailInvalid" || code === "passwordInvalid") {
    return code;
  }
  return "errorGeneric";
}
