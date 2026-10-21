import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { SupportedLang, TranslationSchema } from "./types";
import { DEFAULT_LANG, TRANSLATIONS, LANGUAGES } from "./config";
import {
  detectLanguageFromIP,
  getStoredLanguage,
  setStoredLanguage,
  type GeoDetectionResult,
} from "./detector";

type Paths<T> = T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${"" extends Paths<T[K]>
        ? ""
        : `.${Paths<T[K]>}`}`;
    }[keyof T]
  : "";

export type TranslationKey = Paths<TranslationSchema>;

interface LanguageContextValue {
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  t: (key: TranslationKey) => string;
  detectedCountry: string | null;
  detectionMethod: GeoDetectionResult["method"] | null;
  isLoading: boolean;
  supportedLanguages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: any, path: string): string | undefined {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return typeof current === "string" ? current : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Ưu tiên đọc từ localStorage nếu có để tránh giật giao diện
  const [lang, setLangState] = useState<SupportedLang>(() => {
    return getStoredLanguage() || DEFAULT_LANG;
  });
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const [detectionMethod, setDetectionMethod] = useState<GeoDetectionResult["method"] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      // Nếu đã có trong localStorage rồi thì không cần ghi đè
      const stored = getStoredLanguage();
      if (stored) {
        if (isMounted) {
          setLangState(stored);
          setDetectionMethod("stored");
          setIsLoading(false);
        }
        return;
      }

      // Chưa có trong localStorage -> gọi GeoIP detection
      try {
        const result = await detectLanguageFromIP();
        if (isMounted) {
          setLangState(result.lang);
          setDetectedCountry(result.countryCode);
          setDetectionMethod(result.method);
          // Cập nhật thuộc tính lang trên thẻ <html>
          if (typeof document !== "undefined") {
            document.documentElement.lang = result.lang;
          }
        }
      } catch (e) {
        console.error("GeoIP error:", e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const setLang = (newLang: SupportedLang) => {
    setLangState(newLang);
    setStoredLanguage(newLang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = newLang;
    }
  };

  const t = useMemo(() => {
    return (key: TranslationKey): string => {
      const currentDict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
      let value = getNestedValue(currentDict, key);

      // Nếu từ điển ngôn ngữ hiện tại thiếu từ, fallback sang tiếng Anh
      if (!value && lang !== "en") {
        value = getNestedValue(TRANSLATIONS.en, key);
      }
      // Nếu vẫn thiếu, fallback sang tiếng Việt
      if (!value) {
        value = getNestedValue(TRANSLATIONS.vi, key);
      }

      return value || key;
    };
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        detectedCountry,
        detectionMethod,
        isLoading,
        supportedLanguages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
