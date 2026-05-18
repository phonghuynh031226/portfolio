import { Link, Outlet } from "@tanstack/react-router";
import { Github, Mail, Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/", label: "Giới thiệu" },
  { to: "/projects", label: "Dự án" },
  { to: "/resume", label: "Kinh nghiệm" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Liên hệ" },
  { to: "/donate", label: "Donate" },
] as const;

export function SiteLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b-2 border-foreground">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-mono font-bold text-lg" onClick={() => setOpen(false)}>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-green border-2 border-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            phonghuynh<span className="text-primary">.dev</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className="nav-link text-sm">
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
            aria-expanded={open}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border-2 border-foreground bg-pastel-beige"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <nav className="md:hidden border-t-2 border-foreground bg-background">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="nav-link text-sm"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 md:py-12">
        <Outlet />
      </main>

      <footer className="border-t-2 border-foreground bg-pastel-beige/60 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-row items-center justify-between gap-3 text-xs md:text-sm font-mono">
          <p>© {new Date().getFullYear()} phonghuynh</p>
          <div className="flex items-center gap-3">
            <a href="mailto:hello@phonghuynh.dev" aria-label="Email" className="hover:text-primary">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-primary">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
