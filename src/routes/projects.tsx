import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Dự án — phonghuynh" },
      { name: "description", content: "Bộ sưu tập dự án cá nhân & GitHub của phonghuynh." },
    ],
  }),
  component: Projects,
});

const projects = [
  {
    name: "ai-study-buddy",
    desc: "Chatbot ôn thi cá nhân hoá, dùng RAG trên slide bài giảng. Có chế độ 'giải thích như tui là con nít'.",
    tags: ["Next.js", "OpenAI", "Pinecone"],
    accent: "bg-pastel-blue",
  },
  // {
  //   name: "noodle-tracker",
  //   desc: "App đếm số gói mì sinh viên ăn trong tuần — kèm cảnh báo khi ăn quá... 7 gói.",
  //   tags: ["React Native", "Supabase"],
  //   accent: "bg-pastel-green",
  // },
  // {
  //   name: "prompt-garden",
  //   desc: "Vườn prompt cá nhân: lưu, tag, version control các prompt yêu thích. Git cho prompt, kiểu vậy.",
  //   tags: ["Vue", "TypeScript"],
  //   accent: "bg-pastel-beige",
  // },
  // {
  //   name: "lofi-pomodoro",
  //   desc: "Đồng hồ pomodoro với nhạc lo-fi & chú mèo pixel ngủ gật khi hết giờ.",
  //   tags: ["Svelte", "CSS Art"],
  //   accent: "bg-pastel-blue",
  // },
  // {
  //   name: "intern-diary",
  //   desc: "Blog tĩnh static-site dùng Markdown + Astro để ghi lại nhật ký thực tập.",
  //   tags: ["Astro", "MDX"],
  //   accent: "bg-pastel-green",
  // },
  // {
  //   name: "discord-summary-bot",
  //   desc: "Bot tóm tắt chat server cho người 'lười đọc 500 tin nhắn vừa rồi'.",
  //   tags: ["Python", "discord.py", "LLM"],
  //   accent: "bg-pastel-beige",
  // },
];

function Projects() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">Dự án</h1>
        {/* <p className="text-muted-foreground max-w-2xl">
          Một vài thứ mình đã build — có thứ chạy ngon, có thứ vẫn còn TODO.
          Tất cả đều dạy mình điều gì đó (kể cả khi điều đó là “đừng push lên main lúc 2h sáng”).
        </p> */}
        <p className="text-muted-foreground max-w-2xl">
  Những dự án mình đã xây dựng trong quá trình học hỏi, thử nghiệm và phát triển kỹ năng —
  từ các ý tưởng nhỏ cho tới những sản phẩm mình thật sự tâm huyết.
</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <article key={p.name} className={`paper-card p-5 ${p.accent}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-mono font-bold text-lg">{p.name}</h3>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:opacity-70">
                <Github className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm mt-3 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {p.tags.map((t) => (
                <span key={t} className="font-mono text-[11px] px-2 py-0.5 bg-background border border-foreground rounded">
                  {t}
                </span>
              ))}
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono mt-4 hover:underline"
            >
              xem chi tiết <ExternalLink className="h-3 w-3" />
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
