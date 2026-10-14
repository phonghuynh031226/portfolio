import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Github, Mail, Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { to: "/",         label: "Giới thiệu" },
  { to: "/projects", label: "Dự án"      },
  { to: "/resume",   label: "Kinh nghiệm"},
  { to: "/blog",     label: "Blog"        },
  { to: "/contact",  label: "Liên hệ"    },
  { to: "/donate",   label: "Donate"     },
] as const;

export function SiteLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const [pageKey, setPageKey]     = useState(location.pathname);
  const [isExiting, setIsExiting] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === prevPath.current) return;
    setIsExiting(true);
    const t = setTimeout(() => {
      setIsExiting(false);
      setPageKey(location.pathname);
      prevPath.current = location.pathname;
    }, 220);
    return () => clearTimeout(t);
  }, [location.pathname]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

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

          {/* Desktop tab bar */}
          <nav className="hidden md:flex items-end gap-0 h-full">
            {navItems.map((item, i) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-tab text-sm animate-fade-in-down"
                style={{ animationDelay: `${i * 45 + 80}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={open}
            className="md:hidden inline-flex h-9 w-9 mb-2 items-center justify-center rounded-lg border-2 border-foreground bg-pastel-beige transition-transform duration-200 active:scale-90"
          >
            {open
              ? <X    className="h-4 w-4 animate-scale-in" />
              : <Menu className="h-4 w-4 animate-scale-in" />
            }
          </button>
        </div>

        {/* Mobile nav drawer */}
        {open && (
          <nav className="md:hidden border-t-2 border-foreground bg-background animate-slide-down">
            <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col">
              {navItems.map((item, i) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-tab-mobile animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {item.label}
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
          </div>
        </div>
      </footer>
    </div>
  );
}
