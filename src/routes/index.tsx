import { createFileRoute, Link } from "@tanstack/react-router";
import avatar from "@/assets/avt.jpg";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "phonghuynh — Xin chào 👋" }],
  }),
  component: Index,
});

function Index() {
  const aboutRef = useScrollReveal();

  return (
    <div className="space-y-16">

      {/* ── Hero ── */}
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
        <div className="space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in-up delay-0">
            Hi, mình là{" "}
            <span className="bg-pastel-green px-2 border-2 border-foreground rounded-md inline-block animate-bounce-subtle">
              phonghuynh
            </span>{" "}
            👋
          </h1>

          <p className="text-lg text-muted-foreground animate-fade-in-up delay-150">
            Sinh viên ngành phát triển phần mềm, yêu thích AI, code và những công nghệ mới.
          </p>

          <blockquote className="paper-card p-4 bg-pastel-beige italic animate-fade-in-up delay-300">
            "Cơ hội giống như bình minh. Nếu bạn chờ quá lâu, bạn sẽ bỏ lỡ nó."
          </blockquote>

          <div className="flex flex-wrap gap-3 pt-2 animate-fade-in-up delay-400">
            <Link to="/projects" className="chip bg-pastel-green hover:bg-pastel-blue">
              → Xem dự án
            </Link>
            <Link to="/contact" className="chip">
              → Liên hệ với mình
            </Link>
          </div>
        </div>

        {/* Avatar — floats gently */}
        <div className="paper-card p-3 bg-pastel-beige justify-self-center w-full max-w-sm animate-fade-in-up delay-200 animate-float">
          <img
            src={avatar}
            alt="Avatar phonghuynh"
            width={768}
            height={768}
            className="w-full h-auto rounded-md"
          />
        </div>
      </section>

      {/* ── About — scroll triggered ── */}
      <section
        ref={aboutRef}
        className="paper-card p-6 md:p-8 bg-pastel-blue/40 reveal-on-scroll"
      >
        <h2 className="text-2xl font-bold mb-2">Về mình</h2>
        <p className="text-muted-foreground leading-relaxed">
          Mình bắt đầu với lập trình bằng việc mày mò những đoạn code có sẵn,
          thử sửa, thử build lại và tìm hiểu cách mọi thứ hoạt động phía sau.
          Từ những lần "vọc cho vui", coding dần trở thành điều mình thật sự đam mê.
        </p>
      </section>
    </div>
  );
}
