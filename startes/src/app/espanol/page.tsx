import { Closing } from "@/components/Closing";
import { PageHero } from "@/components/PageHero";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Clases de español para germanoparlantes",
  description:
    "Clases online de español para personas de habla alemana, individuales o grupales. Spanischunterricht online für Deutschsprachige.",
  path: "/espanol",
});

// Cada bloque va en los dos idiomas: la página es para personas de habla alemana.
const blocks = [
  {
    es: { title: "Desde cero o para seguir avanzando.", text: "Para viajar, trabajar, estudiar o conectar con personas de habla hispana. Contanos tu objetivo y tu punto de partida en la consulta." },
    de: { title: "Von Anfang an oder zum Weiterlernen.", text: "Zum Reisen, Arbeiten, Studieren oder um mit spanischsprachigen Menschen in Kontakt zu kommen. Erzähl uns in deiner Anfrage von deinem Ziel und deinen Vorkenntnissen." },
  },
  {
    es: { title: "Individuales o grupales, online.", text: "Horarios, duración y precios se conversan después de tu consulta, por mensaje." },
    de: { title: "Einzel- oder Gruppenunterricht, online.", text: "Zeiten, Dauer und Preise besprechen wir nach deiner Anfrage per Nachricht." },
  },
  {
    es: { title: "Escribinos en el idioma que prefieras.", text: "Podés hacer la consulta en español o en alemán." },
    de: { title: "Schreib uns in der Sprache, die dir lieber ist.", text: "Deine Anfrage kannst du auf Spanisch oder auf Deutsch stellen." },
  },
];

export default function EspanolPage() {
  return (
    <>
      <PageHero
        title={"Español para germano\u00ADparlantes."}
        lead="Si tu idioma es el alemán y querés aprender o mejorar tu español, en StartEs tenés clases online individuales o grupales."
        aside={
          <p lang="de" className="font-wide text-2xl leading-tight font-bold text-brand-text sm:text-3xl">
            Spanisch lernen, online und mit persönlicher Begleitung.
          </p>
        }
      >
        <InteractiveHoverLink href="/contacto?interes=espanol" data-cta="espanol-hero">
          Consultar por clases de español
        </InteractiveHoverLink>
      </PageHero>

      <section aria-label="Para quién y cómo" className="container-site pb-20 sm:pb-28">
        <div className="hidden grid-cols-2 gap-12 border-b border-line pb-3 text-sm font-semibold text-ink-soft md:grid">
          <span>Español</span>
          <span lang="de">Deutsch</span>
        </div>
        {blocks.map((b) => (
          <div key={b.es.title} className="grid gap-6 border-b border-line py-10 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="text-2xl font-bold">{b.es.title}</h2>
              <p className="mt-3 text-ink-soft">{b.es.text}</p>
            </div>
            <div lang="de">
              <h2 className="text-2xl font-bold">{b.de.title}</h2>
              <p className="mt-3 text-ink-soft">{b.de.text}</p>
            </div>
          </div>
        ))}
      </section>

      <Closing
        title="Contanos qué querés aprender."
        text="Schreib uns, wir melden uns bei dir. Te respondemos para conversar tu objetivo y las opciones de clases."
        href="/contacto?interes=espanol"
      />
    </>
  );
}
