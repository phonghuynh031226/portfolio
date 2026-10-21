import { createFileRoute, Link } from "@tanstack/react-router";
import avatar from "@/assets/avt.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "phonghuynh — Portfolio" }],
  }),
  component: Index,
});

function Index() {
  const aboutRef = useScrollReveal();
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* ── Hero ── */}
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in-up delay-0">
            {t("home.greeting_prefix")}{" "}
            <span className="bg-pastel-green px-2 border-2 border-foreground rounded-md inline-block animate-bounce-subtle">
              phonghuynh
            </span>{" "}
            {t("home.greeting_suffix")}
          </h1>

          <p className="text-lg text-muted-foreground animate-fade-in-up delay-150">
            {t("home.bio")}
          </p>

          <blockquote className="paper-card p-4 bg-pastel-beige italic animate-fade-in-up delay-300">
            {t("home.quote")}
          </blockquote>

          <div className="flex flex-wrap gap-3 pt-2 animate-fade-in-up delay-400">
            <Link to="/projects" className="chip bg-pastel-green hover:bg-pastel-blue">
              {t("home.btn_projects")}
            </Link>
            <Link to="/contact" className="chip">
              {t("home.btn_contact")}
            </Link>
          </div>
        </div>

        {/* Avatar — floats gently */}
        <div className="paper-card p-3 bg-pastel-beige justify-self-center w-full max-w-sm animate-fade-in-up delay-200 animate-float">
          <img
            src={avatar}
            alt="Avatar phonghuynh"
            width={768}
            height={768}
            className="w-full h-auto rounded-md"
          />
        </div>
      </section>

      {/* ── About — scroll triggered ── */}
      <section
        ref={aboutRef}
        className="paper-card p-6 md:p-8 bg-pastel-blue/40 reveal-on-scroll"
      >
        <h2 className="text-2xl font-bold mb-2">{t("home.about_title")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("home.about_desc")}
        </p>
      </section>
    </div>
  );
}
