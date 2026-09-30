import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "@/components/Icons";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Preparación de exámenes de alemán online",
  description:
    "Preparación online de exámenes de alemán con acompañamiento. Contanos qué examen querés rendir, o si todavía no lo sabés, y conversamos cómo prepararlo.",
  path: "/examenes",
});

export default function ExamenesPage() {
  return (
    <>
      <PageHero
        eyebrow="Exámenes de alemán"
        title="Llegá al examen con confianza."
        lead="Preparación de exámenes de alemán en clases online. Contanos qué examen querés rendir, o si todavía no lo sabés, y conversamos cómo prepararlo."
      >
        <div className="hero__actions">
          <Link href="/contacto?interes=examen" className="btn" data-cta="examenes-hero">
            Consultar por un examen <ArrowRight />
          </Link>
        </div>
      </PageHero>

      <section className="section section--alt" aria-labelledby="como-title">
        <div className="container split">
          <div className="prose reveal">
            <span className="eyebrow">Cómo lo trabajamos</span>
            <h2 id="como-title" style={{ marginTop: 0 }}>Tu examen, tu punto de partida.</h2>
            <p>
              Cada examen tiene su formato y sus exigencias. En la consulta nos contás cuál querés rendir, para cuándo y
              desde qué nivel partís. Con eso conversamos cómo organizar la preparación.
            </p>
            <p>
              Si todavía no sabés qué examen te piden, por ejemplo para estudiar o trabajar, también podemos ayudarte a
              orientarte.
            </p>
          </div>
          <div className="prose reveal">
            <span className="eyebrow">Exámenes habituales</span>
            <h2 style={{ marginTop: 0 }}>Algunas familias de exámenes.</h2>
            <ul className="tile-list">
              <li><strong lang="de">Goethe-Zertifikat</strong></li>
              <li><strong lang="de">telc Deutsch</strong></li>
              <li><strong>ÖSD</strong></li>
              <li><strong>TestDaF</strong></li>
              <li><strong>DSH</strong></li>
            </ul>
            <p className="notice">
              StartEs prepara para rendir exámenes; no es un centro examinador ni emite certificados oficiales. Confirmá en
              la consulta el examen concreto que te interesa.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Qué examen querés rendir?"
        text="Escribilo en la consulta, o elegí «Todavía no sé». Te respondemos para conversar cómo prepararlo."
        href="/contacto?interes=examen"
      />
    </>
  );
}
