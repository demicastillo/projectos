import type { ReactNode } from "react";
import { BrandCurves } from "./BrandCurves";

type Props = { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; curves?: boolean };

export function PageHero({ eyebrow, title, lead, children, curves = true }: Props) {
  return (
    <section className="page-hero">
      {curves && <BrandCurves variant="corner" className="page-hero__curves" />}
      <div className="container">
        <div className="page-hero__inner">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
