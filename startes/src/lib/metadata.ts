import type { Metadata } from "next";
import { site } from "@/content/site";

// Metadatos por página: título y descripción únicos, canonical y Open Graph.
export function pageMetadata({ title, description, path, index = true }: { title: string; description: string; path: string; index?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: site.url ? { canonical: path } : undefined,
    robots: index ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: site.url ? path : undefined,
      siteName: site.name,
      locale: "es_ES",
      type: "website",
      images: [{ url: "/img/og-startes.png", width: 1200, height: 630, alt: "StartEs, academia online de idiomas" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/img/og-startes.png"] },
  };
}
