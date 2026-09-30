import { levels } from "@/content/site";

// Hoja de niveles: el código de cada nivel va en el margen rojo de la hoja.
export function LevelSheet() {
  return (
    <ol className="card sheet" aria-label="Niveles disponibles">
      {levels.map((l) => (
        <li key={l.code}>
          <span className="sheet__code" aria-hidden={l.code === "0" ? true : undefined}>
            {l.code}
          </span>
          <div className="sheet__body">
            <strong>{l.code === "0" ? "Desde cero" : `${l.code} · ${l.name}`}</strong>
            <span>{l.text}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
