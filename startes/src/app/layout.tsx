import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { MotionProvider } from "@/components/MotionProvider";
import { contact, site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: { default: "StartEs | Academia online de alemán y español", template: "%s | StartEs" },
  description: site.description,
  icons: {
    icon: [
      { url: "/img/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/img/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/img/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#151110" },
  ],
};

// Se ejecuta antes de pintar: aplica el tema guardado (o el del sistema) sin parpadeo.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){d.dataset.theme='light'}})();`;

// Datos estructurados de la academia. Solo datos reales; sin dirección ni reseñas.
const organization = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: site.name,
  description: site.description,
  ...(site.url ? { url: site.url, logo: `${site.url}/img/icon-512.png` } : {}),
  email: contact.email,
  sameAs: [contact.instagramUrl],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+5493515229718",
    email: contact.email,
    availableLanguage: ["es", "de"],
  },
  knowsLanguage: ["es", "de"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preload" href="/fonts/archivo-startes.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body>
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-50 -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-paper focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <MotionProvider>
          <Header />
          <main id="contenido" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <MobileBar />
        </MotionProvider>
      </body>
    </html>
  );
}
