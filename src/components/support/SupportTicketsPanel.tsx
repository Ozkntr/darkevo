"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";

type Ticket = {
  id: string;
  topic: string;
  message: string;
  status: string;
  createdAt: string;
};

export function SupportTicketsPanel() {
  const { t, locale } = useLocale();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const response = await fetch("/api/support-tickets", { credentials: "same-origin" });
      if (!response.ok) return;
      const data = (await response.json()) as { tickets: Ticket[] };
      setTickets(data.tickets);
    })();
  }, [user]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = event.currentTarget;
    const payload = {
      topic: String(new FormData(form).get("topic") ?? "account"),
      message: String(new FormData(form).get("message") ?? ""),
    };
    try {
      const response = await fetch("/api/support-tickets", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ticket?: Ticket; error?: string };
      if (!response.ok || !data.ticket) {
        setError(t(data.error === "ticketInvalid" ? "auth.ticketInvalid" : "auth.errorGeneric"));
        return;
      }
      setTickets((current) => [data.ticket!, ...current]);
      setSent(true);
      form.reset();
    } catch {
      setError(t("auth.errorGeneric"));
    } finally {
      setPending(false);
    }
  }

  const dateLocale = locale === "en" ? "en-US" : locale === "de" ? "de-DE" : "tr-TR";

  return (
    <div className="ticket-panel">
      <p className="lead">{t("support.ticketLead")}</p>
      {sent ? <p className="form-success">{t("support.ticketCreated")}</p> : null}
      <form className="panel-form" method="post" onSubmit={onSubmit}>
        <label>
          {t("support.contactTopic")}
          <select name="topic" defaultValue="account">
            <option value="account">{t("support.topicAccount")}</option>
            <option value="client">{t("support.topicClient")}</option>
            <option value="report">{t("support.topicReport")}</option>
            <option value="other">{t("support.topicOther")}</option>
          </select>
        </label>
        <label>
          {t("support.contactMessage")}
          <textarea name="message" rows={5} required minLength={8} maxLength={4000} />
        </label>
        {error ? <p className="form-error">{error}</p> : null}
        <button type="submit" className="play-btn" disabled={pending}>
          {pending ? t("auth.pleaseWait") : t("support.ticketSend")}
        </button>
      </form>

      <section className="ticket-list">
        <h2>{t("support.ticketHistory")}</h2>
        {tickets.length === 0 ? (
          <p className="hint">{t("support.ticketEmpty")}</p>
        ) : (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket.id} className="ticket-card">
                <div className="ticket-card__meta">
                  <strong>{t(`support.topic${capitalize(ticket.topic)}`)}</strong>
                  <span>{t(ticket.status === "open" ? "support.ticketOpen" : "support.ticketClosed")}</span>
                  <time dateTime={ticket.createdAt}>
                    {new Date(ticket.createdAt).toLocaleString(dateLocale)}
                  </time>
                </div>
                <p>{ticket.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function capitalize(value: string) {
  if (value === "account") return "Account";
  if (value === "client") return "Client";
  if (value === "report") return "Report";
  return "Other";
}
