import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Solo URLs públicas e indexables. Sin dominio real configurado no se publica ninguna.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return ["/", "/aleman", "/examenes", "/espanol", "/contacto"].map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
