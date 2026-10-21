import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Github, Mail, Sparkles, Menu, X, Facebook } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { TranslationKey } from "@/i18n/LanguageContext";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

const navConfig: Array<{ to: string; labelKey: TranslationKey }> = [
  { to: "/", labelKey: "nav.about" },
  { to: "/projects", labelKey: "nav.projects" },
  { to: "/resume", labelKey: "nav.resume" },
  { to: "/blog", labelKey: "nav.blog" },
  { to: "/contact", labelKey: "nav.contact" },
  { to: "/donate", labelKey: "nav.donate" },
];

export function SiteLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const [pageKey, setPageKey] = useState(location.pathname);
  const [isExiting, setIsExiting] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    setIsExiting(true);
    const tTimer = setTimeout(() => {
      setIsExiting(false);
      setPageKey(location.pathname);
      prevPath.current = location.pathname;
    }, 220);
    return () => clearTimeout(tTimer);
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b-2 border-foreground animate-fade-in-down">
        <div className="max-w-6xl mx-auto px-4 flex items-end justify-between gap-4">
          {/* Logo — vertically centred with the tab row */}
          <Link
            to="/"
            className="flex items-center gap-2 font-mono font-bold text-lg group py-3 shrink-0"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-green border-2 border-foreground transition-transform duration-300 group-hover:rotate-12">
              <Sparkles className="h-4 w-4 animate-spin-slow" />
            </span>
            phonghuynh<span className="text-primary">.dev</span>
          </Link>

          {/* Desktop tab bar & Language Switcher */}
          <div className="flex items-center gap-2 md:gap-3">
            <nav className="hidden md:flex items-end gap-0 h-full">
              {navConfig.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-tab text-sm animate-fade-in-down"
                  style={{ animationDelay: `${i * 45 + 80}ms` }}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
            <div className="mb-2 md:mb-1">
              <LanguageSwitcher />
            </div>
            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Mở menu"
              aria-expanded={open}
              className="md:hidden inline-flex h-9 w-9 mb-2 items-center justify-center rounded-lg border-2 border-foreground bg-pastel-beige transition-transform duration-200 active:scale-90"
            >
              {open ? (
                <X className="h-4 w-4 animate-scale-in" />
              ) : (
                <Menu className="h-4 w-4 animate-scale-in" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {open && (
          <nav className="md:hidden border-t-2 border-foreground bg-background animate-slide-down">
            <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
              {navConfig.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-tab-mobile animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
        <div key={pageKey} className={isExiting ? "page-exit" : "page-enter"}>
          <Outlet />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t-2 border-foreground bg-pastel-beige/60 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-row items-center justify-between gap-3 text-xs md:text-sm font-mono">
          <p>© {new Date().getFullYear()} phonghuynh</p>
          <div className="flex items-center gap-3">
            <a
              href="mailto:phonghuynh031226@gmail.com"
              aria-label="Email"
              className="transition-all duration-200 hover:text-primary hover:scale-110"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/phonghuynh031226"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-all duration-200 hover:text-primary hover:scale-110"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/phonghuynh031226"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition-all duration-200 hover:text-primary hover:scale-110"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@phonghuynh031226"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="transition-all duration-200 hover:text-primary hover:scale-110"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
