import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { FlashCard } from "@/components/FlashCard";
import { GoalTabs } from "@/components/GoalTabs";
import { ArrowRight } from "@/components/Icons";
import { LevelSheet } from "@/components/LevelSheet";
import { faqs } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "StartEs · Academia online de alemán y español",
  description:
    "Clases online de alemán desde cero hasta C2, individuales y grupales. Preparación de exámenes y español para germanoparlantes. Contanos qué querés aprender.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <FlashCard />
          <div className="hero__copy">
            <p className="lead on-paper">
              Clases online individuales y grupales, desde tus primeras palabras hasta niveles avanzados. También
              preparación de exámenes y español para germanoparlantes.
            </p>
            <div className="actions">
              <Link href="/contacto" className="btn" data-cta="hero">
                Consultar por clases <ArrowRight />
              </Link>
              <Link href="#objetivos" className="btn btn--ghost">
                Conocer las propuestas
              </Link>
            </div>
          </div>
          <ul className="facts" aria-label="La academia en resumen">
            <li>
              <b>Dónde</b>
              <span>Online, desde donde estés</span>
            </li>
            <li>
              <b>Niveles</b>
              <span>Desde cero hasta C2</span>
            </li>
            <li>
              <b>Formato</b>
              <span>Individual o grupal</span>
            </li>
            <li>
              <b>Idiomas</b>
              <span>Alemán · Español para germanoparlantes</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="objetivos" className="section" aria-labelledby="objetivos-title">
        <div className="container">
          <h2 id="objetivos-title" className="section-title">
            ¿Qué querés lograr?
          </h2>
          <GoalTabs />
        </div>
      </section>

      <section id="clases" className="section" aria-labelledby="clases-title">
        <div className="container">
          <div className="section-intro reveal">
            <h2 id="clases-title" className="section-title">
              Desde cero hasta C2.
            </h2>
            <p className="lead on-paper">
              Alemán para cualquier edad y perfil, con los niveles del Marco Común Europeo de Referencia. También para
              personas angloparlantes.
            </p>
          </div>
          <div className="reveal">
            <LevelSheet />
          </div>
          <div className="sheet-foot reveal">
            <p className="on-paper">
              <strong>¿No sabés tu nivel?</strong> No hace falta: contanos qué estudiaste y lo conversamos antes de
              empezar.
            </p>
            <Link href="/aleman" className="text-link">
              Ver clases de alemán <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="modalidades-title">
        <div className="container">
          <div className="section-intro reveal">
            <h2 id="modalidades-title" className="section-title">
              Individuales o grupales.
            </h2>
            <p className="lead on-paper">
              Horarios, duración y precios se conversan por mensaje después de tu consulta.
            </p>
          </div>
          <div className="compare reveal">
            <div className="card compare__col">
              <h3>Individual</h3>
              <ul>
                <li>Todo el tiempo de clase se enfoca en tu objetivo.</li>
                <li>Útil si tenés un objetivo muy específico, como un examen.</li>
              </ul>
            </div>
            <div className="card compare__col">
              <h3>Grupal</h3>
              <ul>
                <li>Practicás la conversación con más voces.</li>
                <li>Compartís el proceso y la motivación con otras personas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="academia" className="section" aria-labelledby="academia-title">
        <div className="container about">
          <figure className="card photo reveal">
            <picture>
              <source
                type="image/webp"
                srcSet="/img/mariana-masgoret-480.webp 480w, /img/mariana-masgoret-800.webp 800w"
                sizes="(max-width: 900px) 90vw, 440px"
              />
              <img
                src="/img/mariana-masgoret-480.webp"
                width={480}
                height={480}
                loading="lazy"
                decoding="async"
                alt="Mariana Masgoret, sonriente, frente a una fotografía de una ciudad con torres de iglesia al atardecer."
              />
            </picture>
            <figcaption>Mariana Masgoret, profesora titulada de alemán</figcaption>
          </figure>
          <div className="about__copy reveal">
            <h2 id="academia-title">Aprender con acompañamiento cercano.</h2>
            <p className="lead on-paper">
              En StartEs cada persona llega con una historia distinta, y el aprendizaje se construye a partir de ella.
            </p>
            <ul className="values">
              <li>
                <strong>Entretenidas</strong>
                <span>Para que las ganas de seguir no se pierdan.</span>
              </li>
              <li>
                <strong>Intuitivas</strong>
                <span>Para usar el idioma con naturalidad.</span>
              </li>
              <li>
                <strong>Cercanas</strong>
                <span>Con un trato personal y atento.</span>
              </li>
            </ul>
            <p className="on-paper muted">
              StartEs está a cargo de Mariana Masgoret, profesora titulada de alemán con más de ocho años de experiencia
              en la enseñanza.
            </p>
          </div>
        </div>
      </section>

      <section id="preguntas" className="section" aria-labelledby="faq-title">
        <div className="container faq-layout">
          <h2 id="faq-title" className="section-title">
            Lo que suelen preguntarnos.
          </h2>
          <div className="reveal">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
