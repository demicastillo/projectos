import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "@/components/Icons";
import { LevelSheet } from "@/components/LevelSheet";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Clases de alemán online, desde cero hasta C2",
  description:
    "Clases online de alemán para cualquier edad y perfil: desde cero y niveles A1, A2, B1, B2, C1 y C2. Individuales o grupales. También para angloparlantes.",
  path: "/aleman",
});

export default function AlemanPage() {
  return (
    <>
      <PageHero
        title="Alemán online, a tu ritmo y con acompañamiento."
        lead="Para cualquier edad y perfil. Empezás desde cero o desde el nivel que ya tengas, en clases individuales o grupales."
      >
        <div className="actions">
          <Link href="/contacto?interes=aleman" className="btn" data-cta="aleman-hero">
            Consultar por clases de alemán <ArrowRight />
          </Link>
        </div>
      </PageHero>

      <section id="niveles" className="section" aria-labelledby="niveles-title">
        <div className="container">
          <div className="section-intro reveal">
            <h2 id="niveles-title" className="section-title">
              Desde cero hasta C2.
            </h2>
            <p className="lead on-paper">
              Los niveles siguen el Marco Común Europeo de Referencia para las lenguas. Si no sabés cuál es el tuyo, lo
              conversamos antes de empezar.
            </p>
          </div>
          <div className="reveal">
            <LevelSheet />
          </div>
        </div>
      </section>

      <section className="section" aria-label="Para quién y cómo">
        <div className="container split">
          <div className="reveal">
            <h2>Cada persona llega con un motivo distinto.</h2>
            <p className="on-paper">
              Viajar, estudiar, trabajar, mudarte, conectar con tu familia o simplemente disfrutar de aprender. Contanos el
              tuyo en la consulta y armamos juntos el camino.
            </p>
          </div>
          <div className="reveal">
            <h2>Alemán para angloparlantes.</h2>
            <p className="on-paper">Si tu idioma es el inglés, también podés aprender alemán en StartEs.</p>
            <p className="card bilingual" lang="en">
              English speakers are welcome to learn German with us.
            </p>
          </div>
          <div className="reveal">
            <h2>Individuales o grupales.</h2>
            <p className="on-paper">
              En las clases individuales, todo el tiempo se dedica a tu objetivo. En las grupales, sumás la práctica con
              otras personas. Horarios, duración y precios se conversan después de tu consulta, por mensaje.
            </p>
          </div>
          <div className="reveal">
            <h2>¿Tenés un examen por delante?</h2>
            <p className="on-paper">También acompañamos la preparación de exámenes de alemán.</p>
            <Link href="/examenes" className="text-link">
              Ver preparación de exámenes <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand href="/contacto?interes=aleman" />
    </>
  );
}
