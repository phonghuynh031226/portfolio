import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Newspaper, Smile } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — phonghuynh" },
      { name: "description", content: "News công nghệ AI & những trải nghiệm hài hước của một dev đang lớn." },
    ],
  }),
  component: Blog,
});

const news = [
  {
    title: "GPT-5 vừa ra mắt — có gì mới cho sinh viên?",
    date: "15/05/2026",
    summary: "Mình thử pass GPT-5 đề thi cuối kỳ giả lập, kết quả khá... bất ngờ. Tin này ảnh hưởng gì đến tụi mình?",
    tag: "Phân tích",
  },
  {
    title: "Tin đồn: Google sắp đóng Gemini API miễn phí?",
    date: "10/05/2026",
    summary: "Spoiler: chưa đâu. Mình check 3 nguồn chính thức để giúp bạn không hoang mang.",
    tag: "Fact-check",
  },
  {
    title: "AI agent đầu tiên tự đặt vé máy bay thành công",
    date: "02/05/2026",
    summary: "Một bước nhỏ cho AI, một bước lớn cho ... tụi sinh viên lười.",
    tag: "Tin nhanh",
  },
];

const stories = [
  {
    title: "Lần đầu dùng Copilot: từ 'sao nó biết' tới 'sao nó sai'",
    date: "20/04/2026",
    summary: "Mình từng nghĩ Copilot là phép màu. Sau 3 bug nó tự tin tạo ra... mình hiểu nó là đồng nghiệp, không phải thần thánh.",
  },
  {
    title: "Hành trình từ 'Hello World' đến deploy thật",
    date: "12/03/2026",
    summary: "Spoiler: có khóc một lần vì quên push key lên GitHub public. Đừng lặp lại sai lầm của mình 🙏.",
  },
  {
    title: "Một ngày làm việc cùng 4 con AI khác nhau",
    date: "28/02/2026",
    summary: "ChatGPT, Claude, Gemini và Cursor cãi nhau xem ai viết code đẹp hơn. Mình chỉ ngồi ăn mì.",
  },
];

function Blog() {
  const [tab, setTab] = useState<"news" | "stories">("news");
  const items = tab === "news" ? news : stories;

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">Blog &amp; trải nghiệm</h1>
      <p className="text-muted-foreground max-w-2xl">
        Một góc nhỏ để mình lưu lại những điều đang học, những công nghệ đang khám phá
        và hành trình không ngừng phát triển bản thân mỗi ngày.
      </p>
      </header>

      <div className="flex gap-2">
        <button
          onClick={() => setTab("news")}
          className={`chip ${tab === "news" ? "bg-pastel-green" : "bg-card"}`}
        >
          <Newspaper className="h-3 w-3" /> News công nghệ
        </button>
        <button
          onClick={() => setTab("stories")}
          className={`chip ${tab === "stories" ? "bg-pastel-blue" : "bg-card"}`}
        >
          <Smile className="h-3 w-3" /> Trải nghiệm
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item) => (
          <article key={item.title} className="paper-card p-5 bg-card">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <time>{item.date}</time>
              {"tag" in item && <span className="chip bg-pastel-beige !py-0.5">{String(item.tag)}</span>}
            </div>
            <h3 className="font-bold text-lg mt-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.summary}</p>
            {/* <button className="mt-4 text-xs font-mono hover:underline">đọc tiếp →</button> */}
          </article>
        ))}
      </div>
    </div>
  );
}
