import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Briefcase, Wrench } from "lucide-react";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Kinh nghiệm — phonghuynh" },
      { name: "description", content: "Học vấn, kỹ năng và kinh nghiệm của phonghuynh." },
    ],
  }),
  component: Resume,
});

// const skills = {
//   "Ngôn ngữ": ["TypeScript", "Python", "Java", "Go (đang học)"],
//   "Frontend": ["React", "Next.js", "TailwindCSS", "Vue"],
//   "Backend": ["Node.js", "FastAPI", "PostgreSQL", "Supabase"],
//   "AI / ML": ["OpenAI API", "LangChain", "RAG", "Hugging Face"],
//   "Khác": ["Git", "Docker", "Figma", "Pha cà phê ☕"],
// };
const skills = {
  "Ngôn ngữ": ["Java", "JavaScript", "HTML", "CSS", "PHP cơ bản"],

  "Frontend": [
    "Vue.js",
    "Tailwind CSS",
    "React.js (đang học)",
  ],

  "Backend & Database": [
    "MySQL",
    "SQL Server",
    "MongoDB (đang học)",
    "Spring Boot",
    "XAMPP",
  ],

  "Công cụ": [
    "VS Code",
    "NetBeans",
    "Eclipse IDE",
    "IntelliJ IDEA",
    "Postman",
    "GitHub",
    "GitLab",
    "Docker cơ bản",
    "Figma",
  ],

  "Khác": [
    "Git cơ bản",
    "Tin học văn phòng cơ bản",
    "Pha cà phê ☕",
  ],
};

function Resume() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">Kinh nghiệm &amp; kỹ năng</h1>
        <p className="text-muted-foreground">Những kỹ năng, công nghệ và kinh nghiệm mình đã tích lũy trong quá trình phát triển.</p>
      </header>

      <section className="paper-card p-6 bg-pastel-beige">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-5 w-5" />
          <h2 className="text-xl font-bold">Học vấn</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="font-mono font-semibold">Cao đẵng FPT Polytechnic — Phát triển phần mềm</h3>
            <p className="text-sm text-muted-foreground">08/2024 — 08/2026 (dự kiến)</p>
            <p className="text-sm mt-1">GPA: 3.2 / 4.0</p>
          </div>
        </div>
      </section>

      <section className="paper-card p-6 bg-pastel-green/60">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-5 w-5" />
          <h2 className="text-xl font-bold">Kinh nghiệm</h2>
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="font-mono font-semibold">Thực tập sinh Frontend — Công Ty Cổ Phần Giải Pháp Tổng Thể Amazing</h3>
            <p className="text-sm text-muted-foreground">05/2026 — hiện tại</p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              {/* <li>Tham gia build dashboard nội bộ với Next.js + TanStack Query.</li>
              <li>Tích hợp tính năng AI summary cho ticket khách hàng.</li> */}
            </ul>
          </div>
          {/* <div>
            <h3 className="font-mono font-semibold">Cộng tác viên CLB Lập trình</h3>
            <p className="text-sm text-muted-foreground">2022 — nay</p>
            <ul className="list-disc list-inside text-sm mt-2 space-y-1">
              <li>Tổ chức workshop “AI cho người mới bắt đầu”.</li>
              <li>Mentor cho sinh viên năm 1 về Git và web cơ bản.</li>
            </ul>
          </div> */}
        </div>
      </section>

      <section className="paper-card p-6 bg-pastel-blue/50">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="h-5 w-5" />
          <h2 className="text-xl font-bold">Kỹ năng</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="font-mono font-semibold mb-2">{cat}</h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="chip bg-background text-xs">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
