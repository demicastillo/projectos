import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "@/components/Icons";
import { levels } from "@/content/site";
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
        eyebrow="Clases de alemán"
        title="Alemán online, a tu ritmo y con acompañamiento."
        lead="Para cualquier edad y perfil. Empezás desde cero o desde el nivel que ya tengas, en clases individuales o grupales."
      >
        <div className="hero__actions">
          <Link href="/contacto?interes=aleman" className="btn" data-cta="aleman-hero">
            Consultar por clases de alemán <ArrowRight />
          </Link>
        </div>
      </PageHero>

      <section id="niveles" className="section section--alt" aria-labelledby="niveles-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Niveles</span>
            <h2 id="niveles-title">Desde cero hasta C2.</h2>
            <p className="lead">
              Los niveles siguen el Marco Común Europeo de Referencia para las lenguas. Si no sabés cuál es el tuyo, lo
              conversamos antes de empezar.
            </p>
          </div>
          <ul className="tile-list reveal">
            {levels.map((l) => (
              <li key={l.code}>
                <strong>
                  {l.code === "0" ? "Desde cero" : `${l.code} · ${l.name}`}
                </strong>
                <span>{l.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="para-quien-title">
        <div className="container split">
          <div className="prose reveal">
            <span className="eyebrow">Para quién</span>
            <h2 id="para-quien-title" style={{ marginTop: 0 }}>Cada persona llega con un motivo distinto.</h2>
            <p>
              Viajar, estudiar, trabajar, mudarte, conectar con tu familia o simplemente disfrutar de aprender. Contanos el
              tuyo en la consulta y armamos juntos el camino.
            </p>
          </div>
          <div className="prose reveal">
            <span className="eyebrow" lang="en">
              For English speakers
            </span>
            <h2 style={{ marginTop: 0 }}>Alemán para angloparlantes.</h2>
            <p>
              Si tu idioma es el inglés, también podés aprender alemán en StartEs.{" "}
              <span lang="en">English speakers are welcome to learn German with us.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="modalidad-title">
        <div className="container split">
          <div className="prose reveal">
            <span className="eyebrow">Modalidades</span>
            <h2 id="modalidad-title" style={{ marginTop: 0 }}>Individuales o grupales.</h2>
            <p>
              En las clases individuales, todo el tiempo se dedica a tu objetivo. En las grupales, sumás la práctica con
              otras personas. Horarios, duración y precios se conversan después de tu consulta, por mensaje.
            </p>
          </div>
          <div className="prose reveal">
            <span className="eyebrow">Exámenes</span>
            <h2 style={{ marginTop: 0 }}>¿Tenés un examen por delante?</h2>
            <p>También acompañamos la preparación de exámenes de alemán.</p>
            <div>
              <Link href="/examenes" className="text-link">
                Ver preparación de exámenes <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand href="/contacto?interes=aleman" />
    </>
  );
}
