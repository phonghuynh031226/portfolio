import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Dự án — phonghuynh" },
      { name: "description", content: "Bộ sưu tập dự án cá nhân & GitHub của phonghuynh." },
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
  stargazers_count: number;
  languages_url: string;
  tags?: string[];
};

const accents = ["bg-pastel-blue", "bg-pastel-green", "bg-pastel-beige"];

async function getLanguages(url: string) {
  const res = await fetch(url);
  const data = await res.json();
  return Object.keys(data).slice(0, 4);
}

/** Individual card that scroll-reveals itself */
function ProjectCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const ref = useScrollReveal<HTMLElement>(0.1);
  return (
    <article
      ref={ref}
      className={`paper-card p-5 ${accents[index % accents.length]} reveal-on-scroll`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-mono font-bold text-lg">{repo.name}</h3>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="transition-all duration-200 hover:opacity-70 hover:scale-110"
        >
          <Github className="h-4 w-4" />
        </a>
      </div>

      <p className="text-sm mt-3 leading-relaxed">
        {repo.description || "Dự án cá nhân trên GitHub."}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {(repo.tags?.length ? repo.tags : [repo.language || "Code"]).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] px-2 py-0.5 bg-background border border-foreground rounded transition-colors duration-200 hover:bg-pastel-blue"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={repo.homepage || repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-xs font-mono mt-4 hover:underline transition-all duration-200 hover:gap-2"
      >
        xem chi tiết <ExternalLink className="h-3 w-3" />
      </a>
    </article>
  );
}

function Projects() {
  const [projects, setProjects] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const headerRef = useScrollReveal();

  useEffect(() => {
    async function loadRepos() {
      const res = await fetch("https://api.github.com/users/phonghuynh031226/repos?per_page=100");
      const data: GithubRepo[] = await res.json();

      const repos = data
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count);

      const reposWithLanguages = await Promise.all(
        repos.map(async (repo) => ({
          ...repo,
          tags: await getLanguages(repo.languages_url),
        }))
      );

      setProjects(reposWithLanguages);
      setLoading(false);
    }

    loadRepos().catch(console.error);
  }, []);

  return (
    <div className="space-y-8">
      <header ref={headerRef} className="space-y-3 reveal-on-scroll">
        <h1 className="text-4xl font-bold">Dự án</h1>
        <p className="text-muted-foreground max-w-2xl">
          Những dự án mình đã xây dựng trong quá trình học hỏi, thử nghiệm và phát triển kỹ năng của bản thân —
          từ các ý tưởng nhỏ cho tới những sản phẩm mình thật sự tâm huyết.
        </p>
      </header>

      {/* Skeleton loading */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-2 border-foreground rounded-lg p-5 space-y-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-5/6" />
              <div className="flex gap-2 mt-4">
                <div className="skeleton h-5 w-14 rounded-full" />
                <div className="skeleton h-5 w-10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project cards — each scroll-reveals individually */}
      {!loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, index) => (
            <ProjectCard key={p.id} repo={p} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
