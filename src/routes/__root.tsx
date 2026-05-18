import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteLayout } from "@/components/SiteLayout";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center paper-card p-8">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lạc đường rồi 🥲</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Trang này hình như chưa được code, hoặc bị AI ăn mất.
        </p>
        <div className="mt-6">
          <Link to="/" className="chip bg-pastel-green">→ về trang chủ</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center paper-card p-8">
        <h1 className="text-xl font-semibold">Trang này không tải được</h1>
        <p className="mt-2 text-sm text-muted-foreground">Thử lại nhé!</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="chip bg-pastel-blue"
          >
            Thử lại
          </button>
          <a href="/" className="chip">Về trang chủ</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "phonghuynh — Sinh viên phát triển phần mềm & người mê AI" },
      { name: "description", content: "Portfolio cá nhân của phonghuynh — sinh viên năm cuối ngành phát triển phần mềm, đang khám phá thế giới AI." },
      { property: "og:title", content: "phonghuynh — Sinh viên phát triển phần mềm & người mê AI" },
      { name: "twitter:title", content: "phonghuynh — Sinh viên phát triển phần mềm & người mê AI" },
      { property: "og:description", content: "Portfolio cá nhân của phonghuynh — sinh viên năm cuối ngành phát triển phần mềm, đang khám phá thế giới AI." },
      { name: "twitter:description", content: "Portfolio cá nhân của phonghuynh — sinh viên năm cuối ngành phát triển phần mềm, đang khám phá thế giới AI." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6ac2f692-311f-4e1e-85dd-7e242ab7014d/id-preview-c58a1bcc--7f6cfd69-a387-4cf0-9af8-105e385f7199.lovable.app-1778825580772.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6ac2f692-311f-4e1e-85dd-7e242ab7014d/id-preview-c58a1bcc--7f6cfd69-a387-4cf0-9af8-105e385f7199.lovable.app-1778825580772.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SiteLayout />
    </QueryClientProvider>
  );
}
