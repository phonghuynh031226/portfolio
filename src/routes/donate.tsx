import { createFileRoute } from "@tanstack/react-router";
import qr from "@/assets/donate.jpg";
import { Coffee, Heart } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — phonghuynh" },
      { name: "description", content: "Ủng hộ phonghuynh một ly cà phê hoặc một gói mì 🍜" },
    ],
  }),
  component: Donate,
});

function Donate() {
  const headerRef  = useScrollReveal();
  const tiersRef   = useStaggerReveal<HTMLDivElement>(0.1, 100);
  const qrRef      = useScrollReveal();
  const footerRef  = useScrollReveal();

  return (
    <div className="space-y-8 max-w-2xl mx-auto text-center">

      <header ref={headerRef} className="space-y-3 reveal-on-scroll">
        <h1 className="text-4xl font-bold animate-fade-in-up">Donate ☕🍜</h1>
        <p className="text-muted-foreground animate-fade-in-up delay-100">
          Nếu blog hay dự án của mình giúp ích cho bạn,
          một <strong>ly cà phê</strong> hoặc <strong>gói mì</strong> sẽ tiếp năng lượng cho mình code tiếp 💚
        </p>
      </header>

      {/* Donation tiers */}
      <div ref={tiersRef} className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="paper-card aspect-square sm:aspect-auto flex flex-col items-center justify-center p-3 sm:py-6 sm:px-5 bg-pastel-beige text-center">
          <div className="h-8 flex items-center justify-center">
            <Coffee className="h-7 w-7 sm:h-8 sm:w-8 animate-bounce-subtle" />
          </div>
          <p className="font-mono text-sm sm:text-base font-medium mt-2 leading-snug">1 ly cà phê</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">~ 10.000đ</p>
        </div>
        <div className="paper-card aspect-square sm:aspect-auto flex flex-col items-center justify-center p-3 sm:py-6 sm:px-5 bg-pastel-green text-center">
          <div className="h-8 flex items-center justify-center">
            <span className="text-2xl sm:text-3xl leading-none animate-bounce-subtle" style={{ animationDelay: "200ms" }}>🍜</span>
          </div>
          <p className="font-mono text-sm sm:text-base font-medium mt-2 leading-snug">1 gói mì Hảo Hảo</p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">~ 3.000đ</p>
        </div>
      </div>

      {/* QR Code */}
      <div ref={qrRef} className="paper-card p-6 bg-card space-y-4 reveal-on-scroll">
        <h2 className="text-xl font-bold">Quét mã QR ATM</h2>
        <img
          src={qr}
          alt="QR ATM phonghuynh"
          width={640}
          height={640}
          loading="lazy"
          className="w-64 h-64 mx-auto rounded-md border-2 border-foreground transition-transform duration-300 hover:scale-105"
        />
        <div className="font-mono text-sm space-y-1 text-center mx-auto">
          <p><span className="text-muted-foreground">Ngân hàng:</span> Vietcombank</p>
          <p><span className="text-muted-foreground">Số TK:</span> 1051026253</p>
          <p><span className="text-muted-foreground">Chủ TK:</span> HUYNH THANH PHONG</p>
          <p><span className="text-muted-foreground">Nội dung:</span> donate phonghuynh</p>
        </div>
      </div>

      {/* Footer thank-you */}
      <p
        ref={footerRef}
        className="flex items-center justify-center gap-2 font-mono text-sm reveal-on-scroll"
      >
        <Heart className="h-4 w-4 text-destructive animate-pulse-scale" />
        Cảm ơn bạn rất nhiều — mỗi lượt ủng hộ là một dòng commit cho động lực của mình!
      </p>
    </div>
  );
}
