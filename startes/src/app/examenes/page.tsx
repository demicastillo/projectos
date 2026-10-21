import { Closing } from "@/components/Closing";
import { PageHero } from "@/components/PageHero";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Preparación de exámenes de alemán online",
  description:
    "Preparación online de exámenes de alemán con acompañamiento: Goethe-Zertifikat, telc, ÖSD, TestDaF o DSH. Contanos qué examen querés rendir y conversamos cómo prepararlo.",
  path: "/examenes",
});

const exams = [
  { name: "Goethe-Zertifikat", de: true, text: "Exámenes del Goethe-Institut, del A1 al C2." },
  { name: "telc Deutsch", de: true, text: "Exámenes telc de alemán general y para fines específicos." },
  { name: "ÖSD", de: false, text: "Diploma austríaco de alemán, Österreichisches Sprachdiplom." },
  { name: "TestDaF", de: false, text: "Examen de alemán para estudiar en universidades de Alemania." },
  { name: "DSH", de: false, text: "Examen de acceso lingüístico que toman las propias universidades alemanas." },
];

export default function ExamenesPage() {
  return (
    <>
      <PageHero
        title="Llegá al examen con confianza."
        lead="Preparación de exámenes de alemán en clases online. Contanos qué examen querés rendir, o si todavía no lo sabés, y conversamos cómo prepararlo."
      >
        <InteractiveHoverLink href="/contacto?interes=examen" data-cta="examenes-hero">
          Consultar por un examen
        </InteractiveHoverLink>
      </PageHero>

      <section aria-labelledby="familias-title" className="bg-night py-20 text-night-ink sm:py-24">
        <div className="container-site">
          <h2 id="familias-title" className="font-wide text-[clamp(1.75rem,3.4vw,2.6rem)] font-extrabold tracking-tight">
            Exámenes que podés preparar
          </h2>
          <ul className="mt-10 border-t border-white/15">
            {exams.map((e) => (
              <li
                key={e.name}
                className="grid gap-2 border-b border-white/15 py-6 sm:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] sm:items-baseline sm:gap-8"
              >
                <span lang={e.de ? "de" : undefined} className="font-condensed text-[clamp(2.4rem,6vw,4.25rem)] leading-none font-extrabold">
                  {e.name}
                </span>
                <span className="text-night-soft">{e.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-night-soft">
            StartEs prepara para rendir exámenes; no es un centro examinador ni emite certificados oficiales. Confirmá en la
            consulta el examen concreto que te interesa.
          </p>
        </div>
      </section>

      <section aria-label="Cómo lo trabajamos" className="container-site grid gap-12 py-20 sm:py-28 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="font-wide text-[clamp(1.75rem,3.4vw,2.6rem)] font-extrabold tracking-tight">Tu examen, tu punto de partida.</h2>
          <p className="mt-5 text-lg text-ink-soft">
            Cada examen tiene su formato y sus exigencias. En la consulta nos contás cuál querés rendir, para cuándo y desde qué
            nivel partís. Con eso conversamos cómo organizar la preparación.
          </p>
        </div>
        <div>
          <h2 className="font-wide text-[clamp(1.75rem,3.4vw,2.6rem)] font-extrabold tracking-tight">¿No sabés cuál te piden?</h2>
          <p className="mt-5 text-lg text-ink-soft">
            Si necesitás un certificado para estudiar, trabajar o tramitar una visa y todavía no sabés qué examen corresponde,
            también podemos ayudarte a orientarte. Elegí «Necesito orientación» en la consulta.
          </p>
        </div>
      </section>

      <Closing
        title="¿Qué examen querés rendir?"
        text="Escribilo en la consulta, o contanos que todavía no lo sabés. Te respondemos para conversar cómo prepararlo."
        href="/contacto?interes=examen"
      />
    </>
  );
}
