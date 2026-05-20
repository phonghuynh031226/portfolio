import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Github, Linkedin, Send, Youtube, Facebook, MessageCircle, Music2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Liên hệ — phonghuynh" },
      { name: "description", content: "Gửi tin nhắn cho phonghuynh — mình luôn sẵn sàng nghe ý tưởng mới." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <h1 className="text-4xl font-bold">Liên hệ</h1>
        <p className="text-muted-foreground">
          Nếu bạn có một ý tưởng hay, muốn build thứ gì đó cùng nhau, 
          hoặc chỉ muốn nói lời chào — cứ nhắn cho mình nhé.
        </p>
        <div className="space-y-2 font-mono text-sm">
          <a href="mailto:phonghuynh031226@gmail.com" className="flex items-center gap-2 hover:text-primary">
            <Mail className="h-4 w-4" /> phonghuynh031226@gmail.com
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
            <Github className="h-4 w-4" /> github.com/phonghuynh031226
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
            <Linkedin className="h-4 w-4" /> linkedin.com/in/phonghuynh031226
          </a>
          {/* <a href="https://discord.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
            <MessageCircle className="h-4 w-4" /> discord: phonghuynh
          </a> */}
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
            <Youtube className="h-4 w-4" /> youtube.com/@RAYKIVN
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
            <Music2 className="h-4 w-4" /> tiktok.com/@phonghuynh031226
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
            <Facebook className="h-4 w-4" /> facebook.com/phonghuynh031226
          </a>
        </div>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        className="paper-card p-6 bg-pastel-beige space-y-4"
      >
        <div>
          <label className="font-mono text-xs">tên_của_bạn</label>
          <input
            required
            type="text"
            className="w-full mt-1 px-3 py-2 rounded-md border-2 border-foreground bg-background"
            placeholder="Phong Huynh"
          />
        </div>
        <div>
          <label className="font-mono text-xs">email</label>
          <input
            required
            type="email"
            className="w-full mt-1 px-3 py-2 rounded-md border-2 border-foreground bg-background"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="font-mono text-xs">lời_nhắn</label>
          <textarea
            required
            rows={5}
            className="w-full mt-1 px-3 py-2 rounded-md border-2 border-foreground bg-background"
            placeholder="Xin chào phong, mình muốn..."
          />
        </div>
        <button
          type="submit"
          className="chip bg-pastel-green w-full justify-center !py-2 hover:bg-pastel-blue"
        >
          <Send className="h-3 w-3" /> Gửi tin nhắn
        </button>
        {sent && (
          <p className="text-sm font-mono text-center">✅ Đã gửi! Mình sẽ reply sớm 💌</p>
        )}
      </form>
    </div>
  );
}
