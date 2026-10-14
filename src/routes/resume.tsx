import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, Wrench } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Kinh nghiệm — phonghuynh" },
      { name: "description", content: "Học vấn, kỹ năng và kinh nghiệm của phonghuynh." },
    ],
  }),
  component: Resume,
});

const skills = {
  "Ngôn ngữ": ["Java", "JavaScript", "HTML", "CSS", "PHP cơ bản"],
  "Frontend": ["Vue.js", "Tailwind CSS", "React.js (đang học)"],
  "Backend & Database": ["MySQL", "SQL Server", "MongoDB (đang học)", "Spring Boot", "XAMPP"],
  "Công cụ": ["VS Code", "NetBeans", "Eclipse IDE", "IntelliJ IDEA", "Postman", "GitHub", "GitLab", "Docker cơ bản", "Figma"],
  "Khác": ["Git cơ bản", "Tin học văn phòng cơ bản", "Pha cà phê ☕"],
};

function Resume() {
  const headerRef  = useScrollReveal();
  const eduRef     = useScrollReveal();
  const expRef     = useScrollReveal();
  const skillsRef  = useScrollReveal();
  const chipsRef   = useStaggerReveal<HTMLDivElement>(0.1, 40);

  return (
    <div className="space-y-10">

      {/* ── Header ── */}
      <header ref={headerRef} className="space-y-3 reveal-on-scroll">
        <h1 className="text-4xl font-bold">Kinh nghiệm &amp; kỹ năng</h1>
        <p className="text-muted-foreground">
          Những kỹ năng, công nghệ và kinh nghiệm mình đã tích lũy trong quá trình phát triển.
        </p>
      </header>

      {/* ── Education ── */}
      <section ref={eduRef} className="paper-card p-6 bg-pastel-beige reveal-on-scroll">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-5 w-5 animate-bounce-subtle" />
          <h2 className="text-xl font-bold">Học vấn</h2>
        </div>
        <p className="text-sm text-muted-foreground italic">Đang cập nhật...</p>
      </section>

      {/* ── Experience ── */}
      <section ref={expRef} className="paper-card p-6 bg-pastel-green/60 reveal-on-scroll">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5 animate-bounce-subtle" style={{ animationDelay: "200ms" }} />
          <h2 className="text-xl font-bold">Kinh nghiệm</h2>
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="font-mono font-semibold">
              Thực tập sinh Frontend — Công Ty Cổ Phần Giải Pháp Tổng Thể Amazing
            </h3>
            <p className="text-sm text-muted-foreground">05/2026 — hiện tại</p>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section ref={skillsRef} className="paper-card p-6 bg-pastel-blue/50 reveal-on-scroll">
        <div className="flex items-center gap-2 mb-6">
          <Wrench className="h-5 w-5 animate-spin-slow" />
          <h2 className="text-xl font-bold">Kỹ năng</h2>
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
