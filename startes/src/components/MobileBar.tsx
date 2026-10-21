"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { contact } from "@/content/site";
import { cn } from "@/lib/utils";

// Barra fija en celulares: aparece al pasar el inicio de la página. No se muestra
// donde ya está el formulario.
export function MobileBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const hidden = pathname === "/contacto" || pathname === "/gracias";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden) return null;

  return (
    <div
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md transition-[transform,opacity] duration-300 lg:hidden",
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-md gap-2 text-[0.95rem]">
        <Link
          href="/contacto"
          data-cta="barra-movil"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-brand px-5 font-semibold whitespace-nowrap text-brand-ink"
        >
          Consultar por clases
        </Link>
        <a
          href={contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="whatsapp-barra"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-4 font-semibold whitespace-nowrap"
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
