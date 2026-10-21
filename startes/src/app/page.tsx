import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Closing } from "@/components/Closing";
import { ExamBand } from "@/components/ExamBand";
import { Faq } from "@/components/Faq";
import { GoalTabs } from "@/components/GoalTabs";
import { LevelPicker } from "@/components/LevelPicker";
import { Steps } from "@/components/Steps";
import { Testimonials } from "@/components/Testimonials";
import { contact, faqs } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "StartEs | Academia online de alemán y español",
  description:
    "Clases online de alemán desde cero hasta C2, individuales y grupales. Preparación de exámenes y español para germanoparlantes. Contanos qué querés aprender.",
  path: "/",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section aria-labelledby="hero-title" className="container-site pt-12 pb-20 sm:pt-20 sm:pb-28">
        <h1
          id="hero-title"
          className="font-wide max-w-[15ch] text-[clamp(2.6rem,7.2vw,6.5rem)] leading-[0.98] font-extrabold tracking-[-0.035em]"
        >
          Alemán online, desde tu primera palabra hasta C2.
        </h1>
        <div className="mt-8 flex flex-col gap-6 sm:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <p className="max-w-[46ch] text-lg text-ink-soft sm:text-xl">
            Clases individuales y grupales con acompañamiento cercano. También preparación de exámenes y español para
            germanoparlantes.
          </p>
          <a
            href={contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="whatsapp-hero"
            className="inline-flex shrink-0 items-center gap-2 self-start font-semibold underline decoration-line decoration-2 underline-offset-6 hover:decoration-brand lg:self-auto"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Preferís escribir por WhatsApp
          </a>
        </div>

        <div className="mt-14 sm:mt-20">
          <LevelPicker />
        </div>
      </section>

      <ExamBand />

      <section id="objetivos" aria-labelledby="objetivos-title" className="container-site py-20 sm:py-28">
        <h2 id="objetivos-title" className="font-wide mb-10 text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight">
          ¿Qué querés lograr?
        </h2>
        <GoalTabs />
      </section>

      <section aria-labelledby="modalidades-title" className="container-site">
        <div className="rounded-panel bg-stone px-6 py-14 sm:px-12 sm:py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div>
              <h2 id="modalidades-title" className="font-wide text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight">
                Individuales o grupales.
              </h2>
              <p className="mt-5 max-w-[40ch] text-lg text-ink-soft">
                Todas las clases son online, por Google Meet, y pueden durar hasta unas dos horas. Si no sabés cuál te conviene, lo vemos juntos en la consulta.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-line">
              <div className="sm:pr-10">
                <h3 className="text-2xl font-bold">Individual</h3>
                <ul className="mt-4 flex flex-col gap-3 text-ink-soft">
                  <li>Todo el tiempo de clase se dedica a tu objetivo y a tu ritmo.</li>
                  <li>Conviene si tenés una meta concreta, como un examen o una mudanza.</li>
                </ul>
              </div>
              <div className="sm:pl-10">
                <h3 className="text-2xl font-bold">Grupal</h3>
                <ul className="mt-4 flex flex-col gap-3 text-ink-soft">
                  <li>Practicás la conversación con más voces y acentos.</li>
                  <li>Compartís el proceso y la motivación con otras personas.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Steps />

      <section id="academia" aria-labelledby="academia-title" className="border-t border-line">
        <div className="container-site grid gap-12 py-20 sm:py-28 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center lg:gap-20">
          <figure className="max-w-md">
            <picture>
              <source
                type="image/webp"
                srcSet="/img/mariana-masgoret-480.webp 480w, /img/mariana-masgoret-800.webp 800w"
                sizes="(max-width: 768px) 90vw, 440px"
              />
              <img
                src="/img/mariana-masgoret-480.webp"
                width={480}
                height={480}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-panel object-cover"
                alt="Mariana Masgoret, sonriente, frente a una fotografía de una ciudad con torres de iglesia al atardecer."
              />
            </picture>
            <figcaption className="mt-3 text-sm text-ink-soft">Mariana Masgoret, profesora titulada de alemán.</figcaption>
          </figure>
          <div>
            <h2 id="academia-title" className="font-wide text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight">
              Aprender con acompañamiento cercano.
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg text-ink-soft">
              En StartEs cada persona llega con una historia distinta, y el aprendizaje se construye a partir de ella. Las
              clases buscan ser entretenidas, para que las ganas de seguir no se pierdan; intuitivas, para usar el idioma con
              naturalidad; y cercanas, con un trato personal y atento.
            </p>
            <p className="mt-6 max-w-[52ch] text-ink-soft">
              La academia está a cargo de Mariana Masgoret, profesora titulada de alemán con más de ocho años de experiencia
              en la enseñanza.
            </p>
            <Link
              href="/aleman"
              className="mt-8 inline-flex font-semibold underline decoration-line decoration-2 underline-offset-6 hover:decoration-brand"
            >
              Ver las clases de alemán
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      <section id="preguntas" aria-labelledby="faq-title" className="container-site pb-20 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="faq-title" className="font-wide text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight">
              Preguntas frecuentes
            </h2>
            <p className="mt-5 max-w-[36ch] text-ink-soft">
              ¿Tenés otra duda?{" "}
              <a
                href={contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-brand"
              >
                Escribinos por WhatsApp
              </a>
              .
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <Closing />
    </>
  );
}
