import { createFileRoute } from "@tanstack/react-router";
import qr from "@/assets/qr.png";
import { Coffee, Heart } from "lucide-react";

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
  return (
    <div className="space-y-8 max-w-2xl mx-auto text-center">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold">Donate ☕🍜</h1>
        <p className="text-muted-foreground">
          Nếu blog hay dự án của mình giúp ích cho bạn,
          một <strong>ly cà phê</strong> hoặc <strong>gói mì</strong> sẽ tiếp năng lượng cho mình code tiếp 💚
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="paper-card p-5 bg-pastel-beige">
          <Coffee className="h-8 w-8 mx-auto" />
          <p className="font-mono mt-2">1 ly cà phê</p>
          <p className="text-sm text-muted-foreground">~ 25.000đ</p>
        </div>
        <div className="paper-card p-5 bg-pastel-green">
          <span className="text-3xl">🍜</span>
          <p className="font-mono mt-2">1 gói mì Hảo Hảo</p>
          <p className="text-sm text-muted-foreground">~ 5.000đ</p>
        </div>
      </div>

      <div className="paper-card p-6 bg-card space-y-4">
        <h2 className="text-xl font-bold">Quét mã QR ATM</h2>
        <img
          src={qr}
          alt="QR ATM phonghuynh"
          width={640}
          height={640}
          loading="lazy"
          className="w-64 h-64 mx-auto rounded-md border-2 border-foreground"
        />
        <div className="font-mono text-sm space-y-1 text-center mx-auto">
          <p><span className="text-muted-foreground">Ngân hàng:</span> Vietcombank</p>
          <p><span className="text-muted-foreground">Số TK:</span> 0123 456 789</p>
          <p><span className="text-muted-foreground">Chủ TK:</span> HUYNH XUAN PHONG</p>
          <p><span className="text-muted-foreground">Nội dung:</span> donate phonghuynh</p>
        </div>
      </div>

      <p className="flex items-center justify-center gap-2 font-mono text-sm">
        <Heart className="h-4 w-4 text-destructive" />
        Cảm ơn bạn rất nhiều — mỗi lượt ủng hộ là một dòng commit cho động lực của mình!
      </p>
    </div>
  );
}
