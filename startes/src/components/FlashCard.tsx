"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TurnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
    <path d="M18 3v4h-4M6 21v-4h4" />
  </svg>
);

// Ficha de vocabulario del hero: una cara en español y otra en alemán.
// Se da vuelta como una ficha real: se angosta, cambia de cara a mitad de camino y vuelve a abrirse.
// Al cargar llega del lado alemán y se da vuelta al español una sola vez.
export function FlashCard() {
  const [de, setDe] = useState(false);
  const [turning, setTurning] = useState(false);
  const toDe = useRef<HTMLButtonElement>(null);
  const toEs = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  const turn = useCallback((next: boolean, focus: boolean) => {
    timers.current.forEach(clearTimeout);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const focusFace = () => {
      if (focus) requestAnimationFrame(() => (next ? toEs : toDe).current?.focus({ preventScroll: true }));
    };
    if (reduce) {
      setDe(next);
      focusFace();
      return;
    }
    setTurning(false);
    requestAnimationFrame(() => setTurning(true));
    timers.current = [
      window.setTimeout(() => {
        setDe(next);
        focusFace();
      }, 260),
      window.setTimeout(() => setTurning(false), 540),
    ];
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setDe(true);
    const t = window.setTimeout(() => turn(false, false), 760);
    const list = timers.current;
    return () => {
      clearTimeout(t);
      list.forEach(clearTimeout);
    };
  }, [turn]);

  return (
    <div className="stack">
      <div className="card peek peek--1" aria-hidden="true">
        A1 → C2
      </div>
      <div className="card peek peek--2" aria-hidden="true">
        online
      </div>
      <div className={`flip${de ? " is-de" : ""}${turning ? " is-turning" : ""}`}>
        <div className="card face face--es">
          <div className="face__meta">
            <span className="lang">
              <i>ES</i>
              <span className="lang-txt">Academia de idiomas</span>
            </span>
            <button ref={toDe} type="button" className="turn" onClick={() => turn(true, true)}>
              <TurnIcon />
              <span>Ver en alemán</span>
            </button>
          </div>
          <h1 id="hero-title" className="face__title">
            Aprendé alemán.
          </h1>
          <p className="face__sub">Hacé lugar a lo que viene.</p>
        </div>
        <div className="card face face--de" lang="de">
          <div className="face__meta">
            <span className="lang">
              <i>DE</i>
              <span className="lang-txt">Sprachschule</span>
            </span>
            <button ref={toEs} type="button" className="turn" lang="es" onClick={() => turn(false, true)}>
              <TurnIcon />
              <span>Ver en español</span>
            </button>
          </div>
          <p className="face__title">Deutsch lernen.</p>
          <p className="face__sub">Platz machen für das, was kommt.</p>
        </div>
      </div>
    </div>
  );
}
