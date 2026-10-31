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
import legacyCss from "../styles-legacy.css?url";
import { legacyStylesheetLoader } from "@/lib/legacy-styles";
import { SiteLayout } from "@/components/SiteLayout";
import { LanguageProvider } from "@/i18n/LanguageContext";

function NotFoundComponent() {
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center paper-card p-8 animate-scale-in">
        <h1 className="text-6xl font-bold animate-bounce-subtle">{t("notFound.title")}</h1>
        <h2 className="mt-4 text-xl font-semibold animate-fade-in-up delay-150">{t("notFound.subTitle")}</h2>
        <p className="mt-2 text-sm text-muted-foreground animate-fade-in-up delay-250">
          {t("notFound.desc")}
        </p>
        <div className="mt-6 animate-fade-in-up delay-400">
          <Link to="/" className="chip bg-pastel-green">{t("notFound.backHome")}</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center paper-card p-8 animate-scale-in">
        <h1 className="text-xl font-semibold animate-fade-in-up">{t("error.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground animate-fade-in-up delay-100">{t("error.desc")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 animate-fade-in-up delay-200">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="chip bg-pastel-blue"
          >
            {t("error.tryAgain")}
          </button>
          <a href="/" className="chip">{t("error.backHome")}</a>
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
      { title: "phonghuynh — Sinh viên ngành phát triển phần mềm" },
      { property: "og:title", content: "phonghuynh — Sinh viên ngành phát triển phần mềm" },
      { name: "twitter:title", content: "phonghuynh — Sinh viên ngành phát triển phần mềm" },
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
        <script dangerouslySetInnerHTML={{ __html: legacyStylesheetLoader(legacyCss) }} />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
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
