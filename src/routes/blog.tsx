import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Newspaper, Smile } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — phonghuynh" },
      { name: "description", content: "News công nghệ AI & những trải nghiệm hài hước của một dev đang lớn." },
    ],
  }),
  component: Blog,
});

const news: { title: string; date: string; summary: string; tag: string }[] = [];
const stories: { title: string; date: string; summary: string }[] = [];

function Blog() {
  const [tab, setTab] = useState<"news" | "stories">("news");
  const items = tab === "news" ? news : stories;

  const headerRef = useScrollReveal();
  const gridRef   = useStaggerReveal<HTMLDivElement>(0.08, 90);

  return (
    <div className="space-y-8">

      <header ref={headerRef} className="space-y-3 reveal-on-scroll">
        <h1 className="text-4xl font-bold">Blog &amp; trải nghiệm</h1>
        <p className="text-muted-foreground max-w-2xl">
          Một góc nhỏ để mình lưu lại những điều đang học, những công nghệ đang khám phá
          và hành trình không ngừng phát triển bản thân mỗi ngày.
        </p>
      </header>

      {/* Tab switcher */}
      <div className="flex gap-2 animate-fade-in-up delay-200">
        <button
          onClick={() => setTab("news")}
          className={`chip transition-all duration-200 ${
            tab === "news" ? "bg-pastel-green scale-105" : "bg-card"
          }`}
        >
          <Newspaper className="h-3 w-3" /> News công nghệ
        </button>
        <button
          onClick={() => setTab("stories")}
          className={`chip transition-all duration-200 ${
            tab === "stories" ? "bg-pastel-blue scale-105" : "bg-card"
          }`}
        >
          <Smile className="h-3 w-3" /> Trải nghiệm
        </button>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="paper-card p-12 bg-pastel-beige text-center animate-scale-in">
          <p className="text-4xl mb-3 animate-bounce-subtle inline-block">✍️</p>
          <p className="font-mono text-muted-foreground">
            Chưa có bài viết nào... mình đang viết!
          </p>
        </div>
      )}

      {/* Articles — stagger reveal */}
      {items.length > 0 && (
        <div ref={gridRef} className="grid md:grid-cols-2 gap-5">
          {items.map((item) => (
            <article key={item.title} className="paper-card p-5 bg-card">
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                <time>{item.date}</time>
                {"tag" in item && (
                  <span className="chip bg-pastel-beige !py-0.5">{String(item.tag)}</span>
                )}
              </div>
              <h3 className="font-bold text-lg mt-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.summary}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
