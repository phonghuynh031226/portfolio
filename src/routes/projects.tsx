import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { getContributedProjects } from "@/lib/github-contributions";

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
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  tags?: string[];
};

type PersonalRepo = GithubRepo & {
  fork: boolean;
  stargazers_count: number;
  languages_url: string;
};

const accents = ["bg-pastel-blue", "bg-pastel-green", "bg-pastel-beige"];

async function getLanguages(url: string) {
  try {
    const res = await fetch(url);
    return res.ok ? Object.keys(await res.json()).slice(0, 4) : [];
  } catch {
    return [];
  }
}

/** Individual card that scroll-reveals itself */
function ProjectCard({ repo, index, contributed }: { repo: GithubRepo; index: number; contributed: boolean }) {
  const ref = useScrollReveal<HTMLElement>(0.1);
  const { t } = useLanguage();

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

      {(repo.description || !contributed) && (
        <p className="text-sm mt-3 leading-relaxed">
          {repo.description || t("projects.default_desc")}
        </p>
      )}

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
        {t("projects.view_details")} <ExternalLink className="h-3 w-3" />
      </a>
    </article>
  );
}

function Projects() {
  const [personal, setPersonal] = useState<GithubRepo[] | null>();
  const [contributed, setContributed] = useState<GithubRepo[] | null>();
  const headerRef = useScrollReveal();
  const { t } = useLanguage();

  useEffect(() => {
    async function loadRepos() {
      const res = await fetch("https://api.github.com/users/phonghuynh031226/repos?per_page=100");
      if (!res.ok) throw new Error("Could not load personal repositories");
      const data: PersonalRepo[] = await res.json();

      const repos = data
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count);

      const reposWithLanguages = await Promise.all(
        repos.map(async (repo) => ({
          ...repo,
          tags: await getLanguages(repo.languages_url),
        }))
      );

      setPersonal(reposWithLanguages);
    }

    void loadRepos().catch(() => setPersonal(null));
    void getContributedProjects().then(setContributed).catch(() => setContributed(null));
  }, []);

  return (
    <div className="space-y-8">
      <header ref={headerRef} className="space-y-3 reveal-on-scroll">
        <h1 className="text-4xl font-bold">{t("projects.title")}</h1>
        <p className="text-muted-foreground max-w-2xl">
          {t("projects.desc")}
        </p>
      </header>

      <ProjectSection title={t("projects.personal_title")} repos={personal} />
      <ProjectSection title={t("projects.contributed_title")} repos={contributed} contributed />
    </div>
  );
}

function ProjectSection({
  title,
  repos,
  contributed = false,
}: {
  title: string;
  repos: GithubRepo[] | null | undefined;
  contributed?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <section className="space-y-4">
      <h2 className="font-mono text-xl font-bold">{title}</h2>
      {repos === undefined && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
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

      {repos === null && <p className="text-sm text-muted-foreground">{t("projects.unavailable")}</p>}
      {repos?.length === 0 && <p className="text-sm text-muted-foreground">{t("projects.empty")}</p>}
      {repos && repos.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, index) => (
            <ProjectCard key={repo.html_url} repo={repo} index={index} contributed={contributed} />
          ))}
        </div>
      )}
    </section>
  );
}
