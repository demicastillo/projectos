import Link from "next/link";
import type { Metadata } from "next";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false } };

const linkCls = "font-semibold underline decoration-line decoration-2 underline-offset-6 hover:decoration-brand";

export default function NotFound() {
  return (
    <section className="container-site py-20 sm:py-32">
      <h1 className="font-wide max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-extrabold tracking-tight">
        Esta página no existe.
      </h1>
      <p className="mt-6 max-w-[48ch] text-lg text-ink-soft">Puede que el enlace haya cambiado. Estas páginas te pueden servir:</p>
      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
        <InteractiveHoverLink href="/">Ir al inicio</InteractiveHoverLink>
        <Link href="/aleman" className={linkCls}>
          Clases de alemán
        </Link>
        <Link href="/contacto" className={linkCls}>
          Contacto
        </Link>
      </div>
    </section>
  );
}
