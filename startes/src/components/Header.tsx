"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";
import { ArrowRight, Moon, Sun } from "./Icons";
import { Logo } from "./Logo";

function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setDark(next === "dark");
  };

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label="Tema oscuro"
      title={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      <Moon className="icon-moon" />
      <Sun className="icon-sun" />
    </button>
  );
}

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

  // Cerrar al navegar.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a")?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      // Mantener el foco dentro del menú y del botón que lo cierra.
      const items = [toggleRef.current, ...panel.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
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
      if (window.innerWidth > 900) close(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const isCurrent = (href: string) => (href.startsWith("/#") ? false : pathname === href);

  return (
    <header className="site-header" data-scrolled={scrolled || open}>
      <div className="site-header__row">
        <Link href="/" className="brand" aria-label="StartEs, ir al inicio">
          <Logo width={70} priority />
        </Link>

        <nav className="main-nav" aria-label="Principal">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Link href="/contacto" className="btn" data-cta="header">
            Consultar por clases <ArrowRight />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      <div id="mobile-nav" ref={panelRef} className="mobile-nav" data-open={open} inert={!open}>
        <nav aria-label="Menú móvil">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => close(false)} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contacto" className="btn" onClick={() => close(false)} data-cta="menu">
            Consultar por clases <ArrowRight />
          </Link>
        </nav>
      </div>
    </header>
  );
}
