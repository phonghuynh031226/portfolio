import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, Wrench } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Kinh nghiệm — phonghuynh" },
      { name: "description", content: "Học vấn, kỹ năng và kinh nghiệm của phonghuynh." },
    ],
  }),
  component: Resume,
});

function Resume() {
  const headerRef  = useScrollReveal();
  const eduRef     = useScrollReveal();
  const expRef     = useScrollReveal();
  const skillsRef  = useScrollReveal();
  const { t } = useLanguage();

  const skills = {
    [t("resume.cat_languages")]: ["Java", "JavaScript", "HTML", "CSS", `PHP (${t("resume.skill_basic")})`],
    [t("resume.cat_frontend")]: ["Vue.js", "Tailwind CSS", `React.js (${t("resume.skill_learning")})`],
    [t("resume.cat_backend")]: ["MySQL", "SQL Server", `MongoDB (${t("resume.skill_learning")})`, "Spring Boot", "XAMPP"],
    [t("resume.cat_tools")]: ["VS Code", "NetBeans", "Eclipse IDE", "IntelliJ IDEA", "Postman", "GitHub", "GitLab", `Docker (${t("resume.skill_basic")})`, "Figma"],
    [t("resume.cat_other")]: [`Git (${t("resume.skill_basic")})`, t("resume.office_skill"), t("resume.coffee_skill")],
  };

  return (
    <div className="space-y-10">

      {/* ── Header ── */}
      <header ref={headerRef} className="space-y-3 reveal-on-scroll">
        <h1 className="text-4xl font-bold">{t("resume.title")}</h1>
        <p className="text-muted-foreground">
          {t("resume.desc")}
        </p>
      </header>

      {/* ── Education ── */}
      <section ref={eduRef} className="paper-card p-6 bg-pastel-beige reveal-on-scroll">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-5 w-5 animate-bounce-subtle" />
          <h2 className="text-xl font-bold">{t("resume.education_title")}</h2>
        </div>
        <p className="text-sm text-muted-foreground italic">{t("resume.education_status")}</p>
      </section>

      {/* ── Experience ── */}
      <section ref={expRef} className="paper-card p-6 bg-pastel-green/60 reveal-on-scroll">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 animate-bounce-subtle" style={{ animationDelay: "200ms" }} />
          <h2 className="text-xl font-bold">{t("resume.experience_title")}</h2>
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="font-mono font-semibold">
              {t("resume.internship_role")}
            </h3>
            <p className="text-sm text-muted-foreground">{t("resume.internship_time")}</p>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section ref={skillsRef} className="paper-card p-6 bg-pastel-blue/50 reveal-on-scroll">
        <div className="flex items-center gap-2 mb-6">
          <Wrench className="h-5 w-5 animate-spin-slow" />
          <h2 className="text-xl font-bold">{t("resume.skills_title")}</h2>
        </div>

        {/* Each category stagger-reveals */}
        <div className="grid sm:grid-cols-2 gap-6">
          {Object.entries(skills).map(([cat, items]) => (
            <SkillCategory key={cat} title={cat} items={items} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SkillCategory({ title, items }: { title: string; items: string[] }) {
  const containerRef = useStaggerReveal<HTMLDivElement>(0.1, 50);
  return (
    <div>
      <h3 className="font-mono font-semibold mb-2">{title}</h3>
      <div ref={containerRef} className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span key={s} className="chip bg-background text-xs">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
