"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { formatExp, LEVEL_ROWS, MILESTONE_LEVELS, type LevelRow } from "@/lib/level-system";

function accessLabel(t: (path: string) => string, key: string | null) {
  if (!key) return t("levels.none");
  return t(`levels.access.${key}`);
}

function MilestoneIcon({ tone }: { tone: LevelRow["tone"] }) {
  if (tone === "star") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path fill="currentColor" d="M12 2.5l2.4 5.7 6.1.5-4.6 3.9 1.4 5.9L12 15.8 6.7 18.5l1.4-5.9L3.5 8.7l6.1-.5L12 2.5z" />
      </svg>
    );
  }
  if (tone === "space") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M3 12h18M12 3c3.2 2.4 3.2 15.6 0 18M12 3c-3.2 2.4-3.2 15.6 0 18" />
      </svg>
    );
  }
  if (tone === "hunter") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path stroke="currentColor" strokeWidth="1.6" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    );
  }
  if (tone === "warrior") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M7 4l5 5 5-5M12 9v8M8 20h8" />
        <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M4 8l4 4M20 8l-4 4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M7 20V9l5-5 5 5v11H7z" />
      <path fill="none" stroke="currentColor" strokeWidth="1.6" d="M10 20v-5h4v5" />
    </svg>
  );
}

export function LevelSystemSection() {
  const { t, locale } = useLocale();

  return (
    <div className="levels">
      <section id="genel-bakis" className="wiki-section">
        <h2>{t("wikiToc.overview")}</h2>
        <p className="lead">{t("levels.lead")}</p>
      </section>

      <section id="kilometre-taslari" className="levels__milestones wiki-section" aria-label={t("levels.milestones")}>
        <h2>{t("levels.milestones")}</h2>
        <div className="levels__milestone-grid">
          {MILESTONE_LEVELS.map((row) => (
            <article key={row.level} className={`levels__milestone levels__milestone--${row.tone}`}>
              <div className="levels__milestone-icon">
                <MilestoneIcon tone={row.tone} />
              </div>
              <p className="levels__milestone-level">{t("levels.levelLabel", { level: row.level })}</p>
              <h3>{t(`levels.titles.${row.titleKey}`)}</h3>
              <p>{t(`levels.desc.${row.descKey}`)}</p>
              <p className="levels__milestone-exp">
                {t("levels.requiredExp")}: <strong>{formatExp(row.requiredExp, locale)}</strong>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="seviye-tablosu" className="levels__table-wrap wiki-section" aria-label={t("levels.tableTitle")}>
        <h2>{t("levels.tableTitle")}</h2>
        <div className="levels__table-scroll">
          <table className="levels__table">
            <thead>
              <tr>
                <th>{t("levels.colLevel")}</th>
                <th>{t("levels.colExp")}</th>
                <th>{t("levels.colAlly")}</th>
                <th>{t("levels.colEnemy")}</th>
                <th>{t("levels.colDesc")}</th>
                <th>{t("levels.colTitle")}</th>
              </tr>
            </thead>
            <tbody>
              {LEVEL_ROWS.map((row) => (
                <tr key={row.level} className={row.tone !== "default" ? `is-${row.tone}` : undefined}>
                  <td>
                    <span className="levels__badge">{row.level}</span>
                  </td>
                  <td className="levels__exp">{formatExp(row.requiredExp, locale)}</td>
                  <td>{accessLabel(t, row.allyAccessKey)}</td>
                  <td>{accessLabel(t, row.enemyAccessKey)}</td>
                  <td>{t(`levels.desc.${row.descKey}`)}</td>
                  <td>
                    {row.titleKey ? (
                      <span className={`levels__title levels__title--${row.tone}`}>
                        {t(`levels.titles.${row.titleKey}`)}
                      </span>
                    ) : (
                      <span className="levels__dash">{t("levels.none")}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
