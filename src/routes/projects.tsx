import { createFileRoute } from "@tanstack/react-router";
import { Github, ExternalLink, Folder, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { getContributedProjects, getPersonalProjects } from "@/lib/github-contributions";

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
};

const accents = ["bg-pastel-blue", "bg-pastel-green", "bg-pastel-beige"];

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
        <span className="font-mono text-[11px] px-2 py-0.5 bg-background border border-foreground rounded transition-colors duration-200 hover:bg-pastel-blue">
          {repo.language || "Code"}
        </span>
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
  const [tab, setTab] = useState<"personal" | "contributed">("personal");
  const [personal, setPersonal] = useState<GithubRepo[] | null>();
  const [contributed, setContributed] = useState<GithubRepo[] | null>();
  const headerRef = useScrollReveal();
  const { t } = useLanguage();

  useEffect(() => {
    void getPersonalProjects().then(setPersonal).catch(() => setPersonal(null));
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

      <div className="flex flex-wrap gap-2 animate-fade-in-up delay-200">
        <button
          type="button"
          aria-pressed={tab === "personal"}
          onClick={() => setTab("personal")}
          className={`chip transition-all duration-200 ${tab === "personal" ? "bg-pastel-green scale-105" : "bg-card"}`}
        >
          <Folder className="h-3 w-3" /> {t("projects.personal_title")}
        </button>
        <button
          type="button"
          aria-pressed={tab === "contributed"}
          onClick={() => setTab("contributed")}
          className={`chip transition-all duration-200 ${tab === "contributed" ? "bg-pastel-blue scale-105" : "bg-card"}`}
        >
          <Users className="h-3 w-3" /> {t("projects.contributed_title")}
        </button>
      </div>

      <ProjectSection key={tab} repos={tab === "personal" ? personal : contributed} contributed={tab === "contributed"} />
    </div>
  );
}

function ProjectSection({
  repos,
  contributed = false,
}: {
  repos: GithubRepo[] | null | undefined;
  contributed?: boolean;
}) {
  const { t } = useLanguage();

  return (
    <section className="space-y-4">
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
