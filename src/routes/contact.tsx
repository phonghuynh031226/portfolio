import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Github, Linkedin, Send, Youtube, Facebook } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Liên hệ — phonghuynh" },
      { name: "description", content: "Gửi tin nhắn cho phonghuynh — mình luôn sẵn sàng nghe ý tưởng mới." },
    ],
  }),
  component: Contact,
});

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

const socialLinks = [
  { href: "mailto:phonghuynh031226@gmail.com",         icon: Mail,       label: "phonghuynh031226@gmail.com" },
  { href: "https://github.com/phonghuynh031226",        icon: Github,     label: "github.com/phonghuynh031226",   external: true },
  { href: "https://www.facebook.com/phonghuynh031226",  icon: Facebook,   label: "facebook.com/phonghuynh031226", external: true },
  { href: "https://www.tiktok.com/@phonghuynh031226",   icon: TikTokIcon, label: "tiktok.com/@phonghuynh031226",  external: true },
  { href: "https://linkedin.com/in/phonghuynh031226",   icon: Linkedin,   label: "linkedin.com/in/phonghuynh031226", external: true },
  { href: "https://youtube.com/@RAYKIVN",               icon: Youtube,    label: "youtube.com/@RAYKIVN",          external: true },
];

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const infoRef  = useScrollReveal<HTMLDivElement>();
  const linksRef = useStaggerReveal<HTMLDivElement>(0.1, 80);
  const formRef  = useScrollReveal<HTMLFormElement>();
  const { t } = useLanguage();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Simulate async send
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">

      {/* ── Left: info ── */}
      <div ref={infoRef} className="space-y-5 reveal-on-scroll">
        <h1 className="text-4xl font-bold animate-fade-in-up delay-0">{t("contact.title")}</h1>
        <p className="text-muted-foreground animate-fade-in-up delay-100">
          {t("contact.desc")}
        </p>

        {/* Social links — stagger reveal */}
        <div ref={linksRef} className="space-y-3 font-mono text-sm">
          {socialLinks.map(({ href, icon: Icon, label, external }) => (
            <a
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="social-link"
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Right: form ── */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="paper-card p-6 bg-pastel-beige space-y-4 reveal-on-scroll"
        style={{ transitionDelay: "120ms" }}
      >
        <div className="animate-fade-in-up delay-100">
          <label className="font-mono text-xs">{t("contact.name_label")}</label>
          <input
            required
            type="text"
            className="input-animated w-full mt-1 px-3 py-2 rounded-md border-2 border-foreground bg-background"
            placeholder="Phong Huynh"
          />
        </div>

        <div className="animate-fade-in-up delay-200">
          <label className="font-mono text-xs">{t("contact.email_label")}</label>
          <input
            required
            type="email"
            className="input-animated w-full mt-1 px-3 py-2 rounded-md border-2 border-foreground bg-background"
            placeholder="you@example.com"
          />
        </div>

        <div className="animate-fade-in-up delay-300">
          <label className="font-mono text-xs">{t("contact.message_label")}</label>
          <textarea
            required
            rows={5}
            className="input-animated w-full mt-1 px-3 py-2 rounded-md border-2 border-foreground bg-background"
            placeholder={t("contact.message_placeholder")}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={sending || sent}
          className="chip bg-pastel-green w-full justify-center !py-2 hover:bg-pastel-blue
                     disabled:opacity-70 disabled:cursor-not-allowed
                     animate-fade-in-up delay-400 group
                     transition-all duration-200 active:scale-95"
        >
          {sending ? (
            <>
              <span className="h-3 w-3 border-2 border-foreground border-t-transparent rounded-full animate-spin-slow" />
              {t("contact.btn_sending")}
            </>
          ) : sent ? (
            <>{t("contact.btn_sent")}</>
          ) : (
            <>
              <Send className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              {t("contact.btn_send")}
            </>
          )}
        </button>

        {sent && (
          <p className="text-sm font-mono text-center animate-scale-in">
            {t("contact.reply_soon")}
          </p>
        )}
      </form>
    </div>
  );
}
