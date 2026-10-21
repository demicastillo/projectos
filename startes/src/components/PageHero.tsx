import type { ReactNode } from "react";

type Props = { title: ReactNode; lead?: ReactNode; children?: ReactNode; aside?: ReactNode };

// Encabezado de página interna: titular ancho, bajada y acciones; a la derecha,
// un dato real de la página (opcional).
export function PageHero({ title, lead, children, aside }: Props) {
  return (
    <section className="container-site grid gap-10 pt-14 pb-16 sm:pt-20 sm:pb-24 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end">
      <div className="min-w-0">
        <h1 className="font-wide max-w-[18ch] hyphens-auto [overflow-wrap:break-word] text-[clamp(2.15rem,6vw,5rem)] leading-[1.02] font-extrabold tracking-tight">
          {title}
        </h1>
        {lead && <p className="mt-6 max-w-[54ch] text-lg text-ink-soft sm:text-xl">{lead}</p>}
        {children && <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">{children}</div>}
      </div>
      {aside && <div className="min-w-0">{aside}</div>}
    </section>
  );
}
