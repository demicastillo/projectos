"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { goals } from "@/content/site";
import { ArrowRight } from "./Icons";

// Pestañas de fichero. El contenido entra desde el lado de la pestaña elegida
// (principio de Direction Aware Tabs, Cult UI, MIT; reescrito con semántica de tabs; ver docs/07, I2).
export function GoalTabs() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<"left" | "right" | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus: boolean) => {
    if (i !== current) {
      setDir(i > current ? "right" : "left");
      setCurrent(i);
    }
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const n = goals.length;
    const map: Record<string, number> = {
      ArrowRight: (current + 1) % n,
      ArrowLeft: (current - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Objetivos" onKeyDown={onKey}>
        {goals.map((g, i) => (
          <button
            key={g.tab}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${i}`}
            className="tab"
            aria-selected={i === current}
            aria-controls={`panel-${i}`}
            tabIndex={i === current ? 0 : -1}
            onClick={() => select(i, false)}
          >
            {g.tab}
          </button>
        ))}
      </div>
      <div className="card folder">
        {goals.map((g, i) => (
          <div
            key={g.tab}
            // Al pasar de oculto a visible, la animación de entrada se repite.
            className={`panel${i === current && dir ? ` enter-from-${dir}` : ""}`}
            id={`panel-${i}`}
            role="tabpanel"
            aria-labelledby={`tab-${i}`}
            tabIndex={0}
            hidden={i !== current}
          >
            <div>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
              {g.de && (
                <p className="de-line" lang="de">
                  {g.de}
                </p>
              )}
              <div className="actions">
                <Link href={g.href} className="btn" data-cta={`goal-${i}`}>
                  {g.cta} <ArrowRight />
                </Link>
                <Link href={g.more.href} className="text-link">
                  {g.more.label}
                </Link>
              </div>
            </div>
            <div className="next">
              <p className="next__title" id={`next-${i}`}>
                Qué sigue
              </p>
              <ol aria-labelledby={`next-${i}`}>
                {g.next.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
