"use client";

// Direction Aware Tabs, de Cult UI (MIT, © 2023 Jordan-Gilliam): https://github.com/nolly-studio/cult-ui
// Adaptado para StartEs: semántica de pestañas (tablist, tab, tabpanel), flechas,
// Inicio y Fin con el teclado, colores de marca, burbuja con layoutId propio y sin
// desplazamiento lateral con movimiento reducido.
// Usa componentes m de Motion con LazyMotion (ver MotionProvider).

import { useId, useMemo, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { AnimatePresence, m, MotionConfig, useReducedMotion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

export type DirectionTab = { id: number; label: string; content: ReactNode };

interface Props {
  tabs: DirectionTab[];
  label: string;
  className?: string;
  onChange?: (id: number) => void;
}

export function DirectionAwareTabs({ tabs, label, className, onChange }: Props) {
  const uid = useId();
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 0);
  const [direction, setDirection] = useState(0);
  const [ref, bounds] = useMeasure();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const content = useMemo(() => tabs.find((t) => t.id === activeTab)?.content ?? null, [activeTab, tabs]);

  const select = (id: number) => {
    if (id === activeTab) return;
    setDirection(id > activeTab ? 1 : -1);
    setActiveTab(id);
    onChange?.(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((t) => t.id === activeTab);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(tabs[next].id);
    buttons.current[next]?.focus();
    buttons.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  };

  const shift = reduce ? 0 : 120;
  const variants = {
    initial: (d: number) => ({ x: shift * d, opacity: 0, filter: reduce ? "none" : "blur(4px)" }),
    active: { x: 0, opacity: 1, filter: reduce ? "none" : "blur(0px)" },
    exit: (d: number) => ({ x: -shift * d, opacity: 0, filter: reduce ? "none" : "blur(4px)" }),
  };

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="-mx-1 flex gap-1 overflow-x-auto rounded-full bg-stone p-1 [scrollbar-width:none] sm:mx-0 sm:self-start"
      >
        {tabs.map((tab, i) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              id={`${uid}-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={(e) => {
                select(tab.id);
                e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce ? "auto" : "smooth" });
              }}
              className={cn(
                "relative min-h-11 shrink-0 rounded-full px-4 py-2 text-[0.95rem] font-semibold whitespace-nowrap transition-colors focus-visible:outline-offset-1",
                selected ? "text-paper" : "text-ink-soft hover:text-ink",
              )}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {selected && (
                <m.span
                  layoutId={`${uid}-bubble`}
                  className="absolute inset-0 z-0 rounded-full bg-ink"
                  transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.19, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      <MotionConfig transition={reduce ? { duration: 0 } : { duration: 0.4, type: "spring", bounce: 0.15 }}>
        <m.div
          className="relative w-full overflow-hidden"
          initial={false}
          animate={{ height: bounds.height || "auto" }}
        >
          <div ref={ref}>
            <AnimatePresence custom={direction} mode="popLayout" initial={false}>
              <m.div
                key={activeTab}
                id={`${uid}-panel`}
                role="tabpanel"
                aria-labelledby={`${uid}-tab-${activeTab}`}
                tabIndex={0}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
                className="pt-8 focus-visible:outline-offset-[-3px]"
              >
                {content}
              </m.div>
            </AnimatePresence>
          </div>
        </m.div>
      </MotionConfig>
    </div>
  );
}
