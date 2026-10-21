"use client";

// Blur Fade, de Magic UI (MIT, © Magic UI): https://github.com/magicuidesign/magicui
// Adaptado para StartEs: el contenido se ve quieto hasta hidratar y con movimiento
// reducido; solo se usa en secuencias reales (pasos), no en cada sección.
// Usa componentes m de Motion con LazyMotion (ver MotionProvider).

import { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion, type MotionProps, type UseInViewOptions } from "motion/react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  inViewMargin?: MarginType;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.45,
  delay = 0,
  offset = 10,
  inViewMargin = "-60px",
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once: true, margin: inViewMargin });

  // Solo se «arma» la animación si el bloque está fuera de pantalla al hidratar:
  // así lo que ya se ve nunca desaparece para volver a entrar.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight) setArmed(true);
  }, [reduce]);

  const hidden = { opacity: 0, y: offset, filter: `blur(${blur})` };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <m.div
      ref={ref}
      initial={false}
      animate={armed && !inView ? hidden : shown}
      transition={{ delay: armed ? 0.04 + delay : 0, duration: armed ? duration : 0, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
}
