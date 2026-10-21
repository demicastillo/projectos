import Link from "next/link";
import { Closing } from "@/components/Closing";
import { LevelList } from "@/components/LevelList";
import { PageHero } from "@/components/PageHero";
import { Steps } from "@/components/Steps";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Clases de alemán online, desde cero hasta C2",
  description:
    "Clases online de alemán para cualquier edad y perfil: desde cero y niveles A1, A2, B1, B2, C1 y C2. Individuales o grupales. También para angloparlantes.",
  path: "/aleman",
});

const linkCls = "font-semibold underline decoration-line decoration-2 underline-offset-6 hover:decoration-brand";

export default function AlemanPage() {
  return (
    <>
      <PageHero
        title="Clases de alemán online, a tu ritmo."
        lead="Para cualquier edad y perfil. Empezás desde cero o desde el nivel que ya tengas, en clases individuales o grupales."
      >
        <InteractiveHoverLink href="/contacto?interes=aleman" data-cta="aleman-hero">
          Consultar por clases de alemán
        </InteractiveHoverLink>
        <Link href="#niveles" className={linkCls}>
          Ver los niveles
        </Link>
      </PageHero>

      <section id="niveles" aria-labelledby="niveles-title" className="container-site pb-20 sm:pb-28">
        <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end">
          <h2 id="niveles-title" className="font-wide text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight">
            Desde cero hasta C2.
          </h2>
          <p className="max-w-[52ch] text-lg text-ink-soft">
            Los niveles siguen el Marco Común Europeo de Referencia para las lenguas. Si no sabés cuál es el tuyo, lo
            conversamos antes de empezar.
          </p>
        </div>
        <LevelList />
      </section>

      <section aria-label="Para quién y cómo" className="container-site">
        <div className="grid gap-px overflow-hidden rounded-panel bg-line sm:grid-cols-2">
          <div className="bg-stone p-8 sm:p-12">
            <h2 className="text-2xl font-bold">Cada persona llega con un motivo distinto.</h2>
            <p className="mt-4 text-ink-soft">
              Viajar, estudiar, trabajar, mudarte, conectar con tu familia o simplemente disfrutar de aprender. Contanos el
              tuyo en la consulta y armamos juntos el camino.
            </p>
          </div>
          <div className="bg-stone p-8 sm:p-12">
            <h2 className="text-2xl font-bold">Individuales o grupales.</h2>
            <p className="mt-4 text-ink-soft">
              En las clases individuales, todo el tiempo se dedica a tu objetivo. En las grupales, sumás la práctica con
              otras personas. Horarios, duración y precios se conversan después de tu consulta, por mensaje.
            </p>
          </div>
          <div className="bg-stone p-8 sm:p-12">
            <h2 className="text-2xl font-bold">Alemán para angloparlantes.</h2>
            <p className="mt-4 text-ink-soft">Si tu idioma es el inglés, también podés aprender alemán en StartEs.</p>
            <p lang="en" className="mt-4 font-medium">
              English speakers are welcome to learn German with us.
            </p>
          </div>
          <div className="bg-stone p-8 sm:p-12">
            <h2 className="text-2xl font-bold">¿Tenés un examen por delante?</h2>
            <p className="mt-4 text-ink-soft">También acompañamos la preparación de exámenes de alemán.</p>
            <Link href="/examenes" className={`mt-4 inline-flex ${linkCls}`}>
              Ver preparación de exámenes
            </Link>
          </div>
        </div>
      </section>

      <Steps />

      <Closing href="/contacto?interes=aleman" />
    </>
  );
}
