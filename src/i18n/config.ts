import type { LanguageInfo, SupportedLang, TranslationSchema } from "./types";
import { vi } from "./locales/vi";
import { th } from "./locales/th";
import { en } from "./locales/en";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { zh } from "./locales/zh";

export const DEFAULT_LANG: SupportedLang = "vi";

export const LANGUAGES: Record<SupportedLang, LanguageInfo> = {
  vi: {
    code: "vi",
    label: "Tiếng Việt",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    short: "VI",
  },
  th: {
    code: "th",
    label: "Tiếng Thái",
    nativeName: "ไทย",
    flag: "🇹🇭",
    short: "TH",
  },
  en: {
    code: "en",
    label: "English",
    nativeName: "English",
    flag: "🇬🇧",
    short: "EN",
  },
  ja: {
    code: "ja",
    label: "Tiếng Nhật",
    nativeName: "日本語",
    flag: "🇯🇵",
    short: "JA",
  },
  ko: {
    code: "ko",
    label: "Tiếng Hàn",
    nativeName: "한국어",
    flag: "🇰🇷",
    short: "KO",
  },
  zh: {
    code: "zh",
    label: "Tiếng Trung",
    nativeName: "中文",
    flag: "🇨🇳",
    short: "ZH",
  },
};

export const TRANSLATIONS: Record<SupportedLang, TranslationSchema> = {
  vi,
  th,
  en,
  ja,
  ko,
  zh,
};

/**
 * Bảng ánh xạ mã Quốc gia (ISO 2-letter Country Code từ IP) sang Ngôn ngữ
 */
export const COUNTRY_TO_LANG: Record<string, SupportedLang> = {
  VN: "vi", // Việt Nam
  TH: "th", // Thái Lan
  JP: "ja", // Nhật Bản
  KR: "ko", // Hàn Quốc
  CN: "zh", // Trung Quốc
  TW: "zh", // Đài Loan
  HK: "zh", // Hồng Kông
  SG: "en", // Singapore (tiếng Anh phổ biến)
  US: "en", // Mỹ
  GB: "en", // Anh
  AU: "en", // Úc
  CA: "en", // Canada
  NZ: "en", // New Zealand
  IE: "en", // Ireland
  FR: "en", // Pháp (hoặc tạo fr.ts nếu muốn)
  DE: "en", // Đức (hoặc tạo de.ts nếu muốn)
};
