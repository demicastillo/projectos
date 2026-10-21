// Marquee, de Magic UI (MIT, © Magic UI): https://github.com/magicuidesign/magicui
// Adaptado para StartEs: con movimiento reducido la fila queda quieta y se ajusta
// en varias líneas; las copias repetidas se ocultan a lectores de pantalla.

import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  repeat?: number;
}

export function Marquee({ className, reverse = false, pauseOnHover = false, children, repeat = 4, ...props }: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex flex-row gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem] motion-reduce:flex-wrap",
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0 ? true : undefined}
            className={cn(
              "flex shrink-0 animate-marquee flex-row justify-around gap-(--gap) motion-reduce:animate-none motion-reduce:flex-wrap",
              i > 0 && "motion-reduce:hidden",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "[animation-direction:reverse]",
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
