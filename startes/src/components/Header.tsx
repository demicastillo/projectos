"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { contact, nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { InteractiveHoverLink } from "./ui/interactive-hover-button";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Mantener el foco dentro del menú y del botón que lo cierra.
      const items = [
        toggleRef.current,
        ...panel.querySelectorAll<HTMLElement>("a, button"),
      ].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) close(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const isCurrent = (href: string) =>
    href.startsWith("/#") ? false : pathname === href;

  // El panel va fuera del <header>: su backdrop-filter crearía un bloque contenedor
  // y el panel fijo quedaría recortado a la altura de la cabecera.
  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-paper/92 backdrop-blur-md transition-colors",
          scrolled || open ? "border-line" : "border-transparent",
        )}
      >
        <div className="container-site flex h-18 items-center gap-6">
          <Link
            href="/"
            className="logo-plate shrink-0"
            aria-label="StartEs, ir al inicio"
          >
            <Logo width={58} priority />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="relative inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:bottom-1.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-brand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp-header"
              className="hidden min-h-11 items-center gap-2 rounded-full px-3.5 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink xl:inline-flex"
            >
              <MessageCircle className="size-4.5" aria-hidden="true" />
              WhatsApp
            </a>
            <ThemeToggle />
            <InteractiveHoverLink
              href="/contacto"
              data-cta="header"
              className="hidden min-h-11 px-5 py-2 text-[0.95rem] sm:inline-flex"
            >
              Consultar
            </InteractiveHoverLink>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => (open ? close() : setOpen(true))}
              className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-[0.95rem] font-semibold lg:hidden"
            >
              {open ? "Cerrar" : "Menú"}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movil"
        ref={panelRef}
        inert={!open}
        className={cn(
          "fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-paper transition-[opacity,visibility] duration-200 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav
          aria-label="Menú móvil"
          className="container-site flex flex-col gap-8 py-8"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  onClick={() => close(false)}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className="font-wide flex min-h-16 items-center text-3xl font-extrabold tracking-tight aria-[current=page]:text-brand-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <InteractiveHoverLink
              href="/contacto"
              onClick={() => close(false)}
              data-cta="menu"
              className="w-full"
            >
              Consultar por clases
            </InteractiveHoverLink>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp-menu"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line font-semibold"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
