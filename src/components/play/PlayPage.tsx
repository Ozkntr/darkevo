"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";

export function PlayPage() {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="page-shell play-page">
      <header className="page-hero">
        <p className="kicker">{t("common.brandName")}</p>
        <h1>{t("play.title")}</h1>
        <p className="lead">{t("play.lead")}</p>
        <a className="play-btn play-btn--lg" href="#kayit">
          {t("play.download")}
        </a>
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
        {sent ? (
          <p className="form-success">{t("play.submitted")}</p>
        ) : (
          <form className="panel-form" method="post" action="#kayit" onSubmit={onSubmit}>
            <label>
              {t("play.username")}
              <input name="username" required autoComplete="username" minLength={3} />
            </label>
            <label>
              {t("play.email")}
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <label>
              {t("play.password")}
              <input name="password" type="password" required autoComplete="new-password" minLength={8} />
            </label>
            <button type="submit" className="play-btn">
              {t("play.submit")}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
