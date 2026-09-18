"use client";

import { LocaleProvider } from "./LocaleProvider";

export function LocaleShell({ children }: { children: React.ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
