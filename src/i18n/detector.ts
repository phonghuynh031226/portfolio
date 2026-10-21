import { COUNTRY_TO_LANG, DEFAULT_LANG, LANGUAGES } from "./config";
import type { SupportedLang } from "./types";

const STORAGE_KEY = "portfolio_user_lang";

/**
 * Lấy ngôn ngữ đã lưu từ localStorage (nếu người dùng đã tự bấm chọn trước đó)
 */
export function getStoredLanguage(): SupportedLang | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in LANGUAGES) {
      return saved as SupportedLang;
    }
  } catch (e) {
    console.warn("Could not read localStorage for language:", e);
  }
  return null;
}

/**
 * Lưu lựa chọn ngôn ngữ của người dùng vào localStorage
 */
export function setStoredLanguage(lang: SupportedLang): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    console.warn("Could not save language to localStorage:", e);
  }
}

/**
 * Đoán ngôn ngữ từ cài đặt trình duyệt (navigator.language)
 */
export function detectBrowserLanguage(): SupportedLang | null {
  if (typeof window === "undefined" || !navigator.language) return null;
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.startsWith("vi")) return "vi";
  if (browserLang.startsWith("th")) return "th";
  if (browserLang.startsWith("ja")) return "ja";
  if (browserLang.startsWith("ko")) return "ko";
  if (browserLang.startsWith("zh")) return "zh";
  if (browserLang.startsWith("en")) return "en";
  return null;
}

export interface GeoDetectionResult {
  lang: SupportedLang;
  countryCode: string | null;
  method: "stored" | "ip" | "browser" | "fallback";
}

/**
 * Phát hiện quốc gia và ngôn ngữ qua IP
 */
export async function detectLanguageFromIP(): Promise<GeoDetectionResult> {
  // 1. Nếu người dùng đã tự tay chọn ngôn ngữ trước đó, luôn ưu tiên lựa chọn đó
  const stored = getStoredLanguage();
  if (stored) {
    return { lang: stored, countryCode: null, method: "stored" };
  }

  // 2. Thử lấy mã quốc gia từ IP qua API GeoIP miễn phí & siêu nhẹ
  let countryCode: string | null = null;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    // Dịch vụ 1: api.country.is (rất nhanh, trả về { country: "VN", ip: "..." })
    const res = await fetch("https://api.country.is/", {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.country && typeof data.country === "string") {
        countryCode = data.country.toUpperCase();
      }
    }
  } catch {
    // Dự phòng dịch vụ 2 nếu dịch vụ 1 lỗi/bị chặn
    try {
      const controller2 = new AbortController();
      const timeoutId2 = setTimeout(() => controller2.abort(), 2000);
      const res2 = await fetch("https://ipwho.is/?fields=country_code", {
        signal: controller2.signal,
      });
      clearTimeout(timeoutId2);
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && data2.country_code) {
          countryCode = String(data2.country_code).toUpperCase();
        }
      }
    } catch {
      // Bỏ qua lỗi kết nối
    }
  }

  if (countryCode) {
    const mappedLang = COUNTRY_TO_LANG[countryCode];
    if (mappedLang) {
      return { lang: mappedLang, countryCode, method: "ip" };
    }
    // Nếu quốc gia chưa có trong danh sách nhưng không phải VN -> mặc định dùng English
    return { lang: "en", countryCode, method: "ip" };
  }

  // 3. Fallback: Ngôn ngữ trình duyệt của thiết bị
  const browser = detectBrowserLanguage();
  if (browser) {
    return { lang: browser, countryCode: null, method: "browser" };
  }

  // 4. Mặc định cuối cùng
  return { lang: DEFAULT_LANG, countryCode: null, method: "fallback" };
}
