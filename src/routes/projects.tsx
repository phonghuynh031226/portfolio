import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Dự án — phonghuynh" },
      {
        name: "description",
        content: "Bộ sưu tập dự án cá nhân & GitHub của phonghuynh.",
      },
    ],
  }),
  component: Projects,
});

type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  tags?: string[];
};

function getTags(name: string, language: string | null) {
  const map: Record<string, string[]> = {
    portfolio: ["React", "TypeScript", "TailwindCSS"],
    "ai-chatbot": ["Python", "OpenAI", "FastAPI"],
    "java-web": ["Java", "Spring Boot", "MySQL"],
    "vue-dashboard": ["VueJS", "TailwindCSS", "Laravel"],
  };

  return map[name] || [language || "Code"];
}

function Projects() {
  const [projects, setProjects] = useState<GithubRepo[]>([]);

  const accents = [
    "bg-pastel-blue",
    "bg-pastel-green",
    "bg-pastel-beige",
  ];

  useEffect(() => {
    fetch("https://api.github.com/users/phonghuynh031226/repos?sort=updated")
      .then((res) => res.json())
      .then((data) => {
        const repos = data
          .filter((repo: GithubRepo) => !repo.fork)
          .map((repo: GithubRepo) => ({
            ...repo,
            tags: getTags(repo.name, repo.language),
          }));

        setProjects(repos);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">Dự án</h1>

        <p className="text-muted-foreground max-w-2xl">
          Những dự án mình đã xây dựng trong quá trình học hỏi, thử nghiệm và
          phát triển kỹ năng — từ các ý tưởng nhỏ cho tới những sản phẩm mình
          thật sự tâm huyết.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, index) => (
          <article
            key={p.id}
            className={`paper-card p-5 ${
              accents[index % accents.length]
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-mono font-bold text-lg">
                {p.name}
              </h3>

              <a
                href={p.html_url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:opacity-70"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>

            <p className="text-sm mt-3 leading-relaxed">
              {p.description || "Dự án cá nhân trên GitHub."}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {p.tags?.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2 py-0.5 bg-background border border-foreground rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={p.homepage || p.html_url}
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
