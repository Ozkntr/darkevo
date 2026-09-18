"use client";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { LocaleProvider } from "./LocaleProvider";

export function LocaleShell({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <AuthProvider>{children}</AuthProvider>
    </LocaleProvider>
  );
}
