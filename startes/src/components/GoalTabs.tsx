"use client";

import Link from "next/link";
import { goals } from "@/content/site";
import { DirectionAwareTabs } from "./ui/direction-aware-tabs";
import { InteractiveHoverLink } from "./ui/interactive-hover-button";

const short = ["Empezar", "Seguir aprendiendo", "Preparar un examen", "Aprender español"];

export function GoalTabs() {
  const tabs = goals.map((g, i) => ({
    id: i,
    label: short[i] ?? g.tab,
    content: (
      <div className="grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
        <div>
          <h3 className="font-wide text-[clamp(1.75rem,3.2vw,2.6rem)] font-extrabold tracking-tight">{g.title}</h3>
          <p className="mt-5 max-w-[56ch] text-lg text-ink-soft">{g.text}</p>
          {g.de && (
            <p lang="de" className="mt-6 inline-block rounded-xl bg-gold-soft px-4 py-3 font-medium">
              {g.de}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-sm font-semibold text-ink-soft">Qué sigue</h4>
            <ol className="mt-3 flex flex-col">
              {g.next.map((step, n) => (
                <li key={step} className="flex gap-4 border-t border-line py-3.5 first:border-t-0 first:pt-1">
                  <span className="font-wide w-5 shrink-0 font-extrabold text-brand-text tabular-nums">{n + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <InteractiveHoverLink href={g.href} data-cta={`objetivo-${i}`}>
              {g.cta}
            </InteractiveHoverLink>
            <Link href={g.more.href} className="font-semibold underline decoration-line decoration-2 underline-offset-6 hover:decoration-brand">
              {g.more.label}
            </Link>
          </div>
        </div>
      </div>
    ),
  }));

  return <DirectionAwareTabs tabs={tabs} label="Objetivos" />;
}
