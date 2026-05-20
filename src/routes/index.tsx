import { createFileRoute, Link } from "@tanstack/react-router";
import avatar from "@/assets/avatar.png";
import { Code2, BrainCircuit, Coffee } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "phonghuynh — Xin chào 👋" },
      { name: "description", content: "Mình là phonghuynh, sinh viên năm cuối ngành phát triển phần mềm, đang say mê khám phá AI." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="space-y-16">
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Hi, mình là <span className="bg-pastel-green px-2 border-2 border-foreground rounded-md inline-block">phonghuynh</span> 👋
          </h1>
          {/* <p className="text-lg text-muted-foreground">
            Sinh viên năm cuối ngành <strong className="text-foreground">phát triển phần mềm</strong>.
            Hướng nội một chút, nhưng cực kỳ tò mò với mọi thứ liên quan tới
            <strong className="text-foreground"> AI</strong>, code, và công nghệ mới.
          </p> */}
          <p className="text-lg text-muted-foreground">
            Sinh viên ngành phát triển phần mềm, yêu thích AI, code và những công nghệ mới.
          </p>
          <blockquote className="paper-card p-4 bg-pastel-beige italic">
            “Cơ hội giống như bình minh. Nếu bạn chờ quá lâu, bạn sẽ bỏ lỡ nó.”
          </blockquote>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/projects" className="chip bg-pastel-green hover:bg-pastel-blue">
              → Xem dự án
            </Link>
            <Link to="/contact" className="chip">
              → Liên hệ với mình
            </Link>
          </div>
        </div>
        <div className="paper-card p-3 bg-pastel-beige justify-self-center w-full max-w-sm">
          <img
            src={avatar}
            alt="Avatar phonghuynh"
            width={768}
            height={768}
            className="w-full h-auto rounded-md"
          />
          <p className="font-mono text-xs text-center pt-2">avatar.png</p>
        </div>
      </section>

      <section className="paper-card p-6 md:p-8 bg-pastel-blue/40">
        <h2 className="text-2xl font-bold mb-2">Về mình</h2>
        <p className="text-muted-foreground leading-relaxed">
          Mình bắt đầu code từ năm nhất, ban đầu chỉ vì... muốn làm bot Discord cho server bạn bè.
          Rồi vô tình lạc vào thế giới AI, từ đó đến giờ chưa thoát ra được 😄.
          Mình tin rằng AI không phải để thay thế dev, mà để giúp dev trở thành phiên bản tò mò hơn của chính mình.
        </p>
      </section>

      {/* <section className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Code2, title: "Code", desc: "TypeScript, React, Python — và một chút Go khi rảnh." },
          { icon: BrainCircuit, title: "AI nerd", desc: "Mê mẩn LLM, prompt, RAG, agents… đọc paper trước khi đi ngủ." },
          { icon: Coffee, title: "Hướng nội", desc: "Ít nói nhưng chat code thì... viết được cả tiểu thuyết." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="paper-card p-5 bg-card">
            <Icon className="h-6 w-6 mb-3 text-primary" />
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
          </div>
        ))}
      </section> */}
    </div>
  );
}
