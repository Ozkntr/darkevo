"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getMessage, loadDictionary } from "@/i18n/get-message";
import {
  defaultLocale,
  isAppLocale,
  localeHtmlLang,
  locales,
  LOCALE_STORAGE_KEY,
  type AppLocale,
} from "@/i18n/locales";

type LocaleContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  isLocaleLoading: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(defaultLocale);
  const [isLocaleLoading, setIsLocaleLoading] = useState(false);
  const storageHydratedRef = useRef(false);
  const loadGenRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
        if (cancelled || !isAppLocale(raw) || raw === defaultLocale) return;
        setIsLocaleLoading(true);
        await loadDictionary(raw);
        if (!cancelled) setLocaleState(raw);
      } catch {
        /* private mode */
      } finally {
        if (!cancelled) {
          storageHydratedRef.current = true;
          setIsLocaleLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = localeHtmlLang(locale);
    if (!storageHydratedRef.current) return;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  useEffect(() => {
    const others = locales.filter((item) => item !== locale);
    const ric = window.requestIdleCallback?.bind(window);
    const run = () => {
      for (const item of others) void loadDictionary(item);
    };
    if (ric) {
      const id = ric(run, { timeout: 4000 });
      return () => window.cancelIdleCallback?.(id);
    }
    const timer = window.setTimeout(run, 2500);
    return () => window.clearTimeout(timer);
  }, [locale]);

  const setLocale = useCallback((next: AppLocale) => {
    const gen = ++loadGenRef.current;
    void (async () => {
      setIsLocaleLoading(true);
      try {
        await loadDictionary(next);
        if (gen !== loadGenRef.current) return;
        setLocaleState(next);
      } finally {
        if (gen === loadGenRef.current) setIsLocaleLoading(false);
      }
    })();
  }, []);

  const t = useCallback(
    (path: string, params?: Record<string, string | number>) => getMessage(locale, path, params),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, isLocaleLoading }),
    [locale, setLocale, t, isLocaleLoading],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
