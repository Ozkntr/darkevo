import type { Metadata, Viewport } from "next";
import { Cinzel, Geist } from "next/font/google";
import { LocaleShell } from "@/components/i18n/LocaleShell";
import { SkipLink } from "@/components/i18n/SkipLink";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";
import "./wiki.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Darkevo — Ücretsiz Karanlık MMORPG",
    template: "%s — Darkevo",
  },
  description:
    "Darkevo resmi sitesi. Karanlık aksiyon MMORPG: ücretsiz oyna, wiki ve destek.",
  keywords: ["Darkevo", "MMORPG", "ücretsiz oyna", "wiki"],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: ["en_US", "de_DE"],
    url: siteUrl,
    siteName: "Darkevo",
    title: "Darkevo",
    description: "Karanlık çağın MMORPG’si. Ücretsiz oyna.",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${cinzel.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full">
        <LocaleShell>
          <SkipLink />
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
        </LocaleShell>
      </body>
    </html>
  );
}
