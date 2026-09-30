import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/manrope/index.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Enhancements } from "@/components/Enhancements";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title: { default: "StartEs · Academia online de alemán y español", template: "%s · StartEs" },
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
    { media: "(prefers-color-scheme: light)", color: "#FDFDFB" },
    { media: "(prefers-color-scheme: dark)", color: "#15171B" },
  ],
};

// Se ejecuta antes de pintar: aplica el tema guardado (o el del sistema) sin parpadeo
// y activa las animaciones solo si hay JavaScript. Si la hidratación falla, a los 3 s
// se muestran todos los bloques que esperaban animarse.
const bootScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.dataset.theme=t}catch(e){}d.classList.add('js');setTimeout(function(){if(!d.dataset.enhanced){document.querySelectorAll('.reveal').forEach(function(e){e.classList.add('is-visible')})}},3000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Enhancements />
      </body>
    </html>
  );
}
