"use client";

import { useId, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { levels } from "@/content/site";
import { cn } from "@/lib/utils";
import { InteractiveHoverLink } from "./ui/interactive-hover-button";

// Escalera del Marco Común Europeo: la persona marca dónde está hoy y la consulta
// llega con ese nivel ya elegido. «0» se envía como «Desde cero».
const heights = [22, 33, 45, 57, 69, 82, 100];
const UNKNOWN = "no-se";

export function LevelPicker() {
  const uid = useId();
  const reduce = useReducedMotion();
  const [value, setValue] = useState<string | null>(null);

  const level = levels.find((l) => l.code === value);
  const formLevel = value === UNKNOWN ? "No sé mi nivel" : level?.code === "0" ? "Desde cero" : level?.code;
  const href = formLevel ? `/contacto?interes=aleman&nivel=${encodeURIComponent(formLevel)}` : "/contacto?interes=aleman";

  return (
    <fieldset className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
      <legend className="mb-6 text-lg font-semibold">¿Desde dónde empezás?</legend>

      <div>
        <div className="grid h-44 grid-cols-7 items-end gap-1.5 sm:h-60 sm:gap-2.5">
          {levels.map((l, i) => {
            const checked = value === l.code;
            return (
              <label
                key={l.code}
                className="group relative flex h-full cursor-pointer flex-col justify-end"
                title={`${l.code === "0" ? "Desde cero" : l.code}: ${l.name}`}
              >
                <input
                  type="radio"
                  name={`${uid}-nivel`}
                  value={l.code}
                  checked={checked}
                  onChange={() => setValue(l.code)}
                  className="peer sr-only"
                  aria-describedby={`${uid}-detalle`}
                />
                <span className="sr-only">
                  {l.code === "0" ? "Desde cero" : `${l.code}, ${l.name}`}
                </span>
                <span
                  aria-hidden="true"
                  style={{ height: `${heights[i]}%`, animationDelay: `${i * 55}ms` }}
                  className={cn(
                    "relative flex origin-bottom animate-rise flex-col justify-end rounded-t-xl px-1.5 pb-2.5 transition-colors duration-200 motion-reduce:animate-none sm:rounded-t-2xl sm:px-3 sm:pb-4",
                    "peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-focus",
                    checked ? "bg-brand text-brand-ink" : "bg-stone text-ink group-hover:bg-line",
                  )}
                >
                  {checked && (
                    <m.span
                      layoutId={`${uid}-pin`}
                      transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.3, duration: 0.45 }}
                      className="absolute -top-3 left-1/2 size-6 -translate-x-1/2 rounded-full border-4 border-paper bg-gold"
                    />
                  )}
                  <span className="font-wide text-lg leading-none font-extrabold sm:text-3xl">{l.code}</span>
                  <span
                    className={cn(
                      "mt-1.5 hidden text-xs leading-tight font-medium md:block",
                      checked ? "text-brand-ink/85" : "text-ink-soft",
                    )}
                  >
                    {l.name}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm text-ink-soft">
          <span>Primeras palabras</span>
          <span>Dominio cercano al nativo</span>
        </div>
      </div>

      <div className="flex flex-col justify-end gap-5">
        <label
          className={cn(
            "inline-flex min-h-11 cursor-pointer items-center gap-3 self-start rounded-full border px-4 text-[0.95rem] font-medium transition-colors has-focus-visible:outline-3 has-focus-visible:outline-offset-3 has-focus-visible:outline-focus",
            value === UNKNOWN ? "border-ink bg-ink text-paper" : "border-line hover:border-ink-soft",
          )}
        >
          <input
            type="radio"
            name={`${uid}-nivel`}
            value={UNKNOWN}
            checked={value === UNKNOWN}
            onChange={() => setValue(UNKNOWN)}
            className="sr-only"
            aria-describedby={`${uid}-detalle`}
          />
          No sé mi nivel
        </label>
        <div id={`${uid}-detalle`} aria-live="polite" className="min-h-24">
          {level ? (
            <>
              <p className="font-semibold">
                {level.code === "0" ? "Desde cero" : `${level.code}, ${level.name.toLowerCase()}`}
              </p>
              <p className="text-ink-soft">{level.text}</p>
            </>
          ) : value === UNKNOWN ? (
            <>
              <p className="font-semibold">No hace falta saberlo.</p>
              <p className="text-ink-soft">Contanos qué estudiaste y cuándo, y lo conversamos antes de empezar.</p>
            </>
          ) : (
            <p className="text-ink-soft">
              Marcá tu nivel aproximado y lo sumamos a tu consulta. Los niveles siguen el Marco Común Europeo.
            </p>
          )}
        </div>
        <InteractiveHoverLink href={href} data-cta="hero-nivel" className="self-start">
          {formLevel && value !== UNKNOWN ? `Consultar desde ${level?.code === "0" ? "cero" : level?.code}` : "Consultar por clases"}
        </InteractiveHoverLink>
      </div>
    </fieldset>
  );
}
