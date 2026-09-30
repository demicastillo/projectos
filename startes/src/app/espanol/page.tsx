import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "@/components/Icons";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Clases de español para germanoparlantes",
  description:
    "Clases online de español para personas de habla alemana, individuales o grupales. Spanischunterricht online für Deutschsprachige.",
  path: "/espanol",
});

export default function EspanolPage() {
  return (
    <>
      <PageHero
        title="Español para germanoparlantes."
        lead="Si tu idioma es el alemán y querés aprender o mejorar tu español, en StartEs tenés clases online individuales o grupales."
      >
        <p className="card bilingual" lang="de">
          Du möchtest Spanisch lernen? Schreib uns – wir melden uns bei dir.
        </p>
        <div className="actions">
          <Link href="/contacto?interes=espanol" className="btn" data-cta="espanol-hero">
            Consultar por clases de español <ArrowRight />
          </Link>
        </div>
      </PageHero>

      <section className="section" aria-label="Para quién y cómo">
        <div className="container split">
          <div className="reveal">
            <h2>Desde cero o para seguir avanzando.</h2>
            <p className="on-paper">
              Para viajar, trabajar, estudiar o conectar con personas de habla hispana. Contanos tu objetivo y tu punto de
              partida en la consulta.
            </p>
          </div>
          <div className="reveal">
            <h2>Individuales o grupales.</h2>
            <p className="on-paper">Horarios, duración y precios se conversan después de tu consulta, por mensaje.</p>
          </div>
        </div>
      </section>

      <CtaBand href="/contacto?interes=espanol" />
    </>
  );
}
