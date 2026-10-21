import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ChevronDown, Globe } from "lucide-react";
import type { SupportedLang } from "@/i18n/types";

export function LanguageSwitcher() {
  const { lang, setLang, supportedLanguages, detectedCountry, detectionMethod } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentInfo = supportedLanguages[lang];

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: SupportedLang) => {
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="chip bg-card hover:bg-pastel-blue transition-all cursor-pointer flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium shadow-[2px_2px_0_0_var(--color-ink)]"
        aria-label="Chọn ngôn ngữ"
        title={
          detectedCountry
            ? `Tự động nhận diện từ IP: ${detectedCountry}`
            : "Chuyển đổi ngôn ngữ"
        }
      >
        <span className="text-sm leading-none">{currentInfo.flag}</span>
        <span className="font-bold">{currentInfo.short}</span>
        <ChevronDown
          className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="paper-card absolute right-0 mt-2 w-44 p-1.5 bg-card z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider border-b border-border mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" /> Ngôn ngữ
            </span>
            {detectedCountry && detectionMethod === "ip" && (
              <span className="text-[9px] bg-pastel-green px-1 py-0.5 rounded border border-foreground">
                IP: {detectedCountry}
              </span>
            )}
          </div>
          <div className="space-y-0.5">
            {Object.values(supportedLanguages).map((item) => {
              const isSelected = item.code === lang;
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => handleSelect(item.code)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 text-xs font-mono rounded-md transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "bg-pastel-green font-bold text-foreground border border-foreground"
                      : "hover:bg-pastel-beige text-foreground/80 hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{item.flag}</span>
                    <span>{item.nativeName}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    {item.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
