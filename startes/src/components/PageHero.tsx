import type { ReactNode } from "react";

type Props = { title: ReactNode; lead?: ReactNode; children?: ReactNode };

// Encabezado de página interna: título subrayado dos veces, como en el cuaderno escolar alemán.
export function PageHero({ title, lead, children }: Props) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="page-hero__inner">
          <h1 className="underline2">{title}</h1>
          {lead && <p className="lead on-paper">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
