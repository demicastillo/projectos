import { levels } from "@/content/site";

// Lista de niveles del Marco Común Europeo: cada fila avanza un poco más,
// como la escalera de la portada.
export function LevelList() {
  return (
    <ol className="border-t border-line">
      {levels.map((l, i) => (
        <li
          key={l.code}
          className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-line py-5 sm:grid-cols-[6rem_12rem_minmax(0,1fr)] sm:gap-8"
        >
          <span className="font-wide text-3xl font-extrabold text-brand-text sm:text-4xl">{l.code}</span>
          <span className="font-semibold">{l.code === "0" ? "Desde cero" : l.name}</span>
          <span className="col-start-2 text-ink-soft sm:col-start-auto" style={{ paddingLeft: `min(${i * 0.75}rem, 4vw)` }}>
            {l.text}
          </span>
        </li>
      ))}
    </ol>
  );
}
