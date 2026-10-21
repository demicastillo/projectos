// Interactive Hover Button, de Magic UI (MIT, © Magic UI): https://github.com/magicuidesign/magicui
// Adaptado para StartEs: también como enlace (Next Link), con el punto en oro sobre
// el rojo de marca, estado de foco igual al de hover y tamaño táctil de 48 px.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "ink" | "light";

const tones: Record<Tone, { base: string; dot: string }> = {
  brand: { base: "bg-brand text-brand-ink border-brand", dot: "bg-gold" },
  ink: { base: "bg-ink text-paper border-ink", dot: "bg-gold" },
  light: { base: "bg-white text-[#1d1714] border-white", dot: "bg-gold" },
};

function Inner({ children, tone }: { children: React.ReactNode; tone: Tone }) {
  return (
    <>
      <span className="flex items-center justify-center gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            "h-2 w-2 rounded-full transition-transform duration-300 ease-out group-hover:scale-[60] group-focus-visible:scale-[60]",
            tones[tone].dot,
          )}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 group-focus-visible:translate-x-12 group-focus-visible:opacity-0">
          {children}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-10 flex translate-x-12 items-center justify-center gap-2 text-[#1d1714] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        <span>{children}</span>
        <ArrowRight className="size-4.5" strokeWidth={2.25} />
      </span>
    </>
  );
}

const base =
  "group relative inline-flex min-h-12 w-auto cursor-pointer items-center justify-center overflow-hidden rounded-full border px-6 py-3 text-center text-base font-semibold text-balance select-none sm:whitespace-nowrap active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

type LinkProps = { href: string; tone?: Tone; className?: string; children: React.ReactNode } & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
>;

export function InteractiveHoverLink({ href, tone = "brand", className, children, ...props }: LinkProps) {
  return (
    <Link href={href} className={cn(base, tones[tone].base, className)} {...props}>
      <Inner tone={tone}>{children}</Inner>
    </Link>
  );
}

export function InteractiveHoverButton({
  tone = "brand",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button className={cn(base, tones[tone].base, className)} {...props}>
      <Inner tone={tone}>{children}</Inner>
    </button>
  );
}
