import Link from "next/link";
import { BrandCurves } from "@/components/BrandCurves";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ArrowRight } from "@/components/Icons";
import { faqs, goals, levels } from "@/content/site";
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
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Academia de idiomas · Clases online</span>
            <h1 id="hero-title">
              <span className="line">Aprendé alemán.</span>
              <span className="line">
                Hacé lugar a <span className="accent">lo que viene.</span>
              </span>
            </h1>
            <p className="lead">
              Clases individuales y grupales, desde tus primeras palabras hasta niveles avanzados. También preparación de
              exámenes y español para germanoparlantes.
            </p>
            <div className="hero__actions">
              <Link href="/contacto" className="btn" data-cta="hero">
                Consultar por clases <ArrowRight />
              </Link>
              <Link href="#objetivos" className="btn btn--ghost">
                Conocer las propuestas
              </Link>
            </div>
            <ul className="hero__facts" aria-label="En resumen">
              <li>100 % online</li>
              <li>Desde cero hasta C2</li>
              <li>Individuales o grupales</li>
            </ul>
          </div>
          <div className="hero__art">
            <BrandCurves animate />
            <span className="word-chip word-chip--1" lang="de">
              Hallo! <small lang="es">¡Hola!</small>
            </span>
            <span className="word-chip word-chip--2" lang="de">
              Los geht&apos;s <small lang="es">¡Vamos!</small>
            </span>
            <span className="word-chip word-chip--3" lang="de">
              Schritt für Schritt <small lang="es">paso a paso</small>
            </span>
          </div>
        </div>
      </section>

      {/* Objetivos */}
      <section id="objetivos" className="section" aria-labelledby="objetivos-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Tu punto de partida</span>
            <h2 id="objetivos-title">¿Qué querés lograr?</h2>
          </div>
          <ol className="goals reveal">
            {goals.map((g) => (
              <li key={g.title} className="goal">
                <Link href={g.href} aria-label={`${g.title}. ${g.cta}`}>
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                  <span className="goal__arrow" aria-hidden="true">
                    <ArrowRight className="" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Clases */}
      <section id="clases" className="section section--alt" aria-labelledby="clases-title">
        <div className="container offer">
          <div className="offer__main reveal">
            <span className="eyebrow">Clases de alemán</span>
            <h2 id="clases-title">Del primer «Hallo» a un alemán con matices.</h2>
            <p className="lead">
              El alemán es la propuesta principal de StartEs: para cualquier edad y perfil, desde cero y en todos los
              niveles. También acompañamos a personas angloparlantes que quieren aprender alemán.
            </p>
            <ol className="levels" aria-label="Niveles disponibles">
              {levels.map((l, i) => (
                <li key={l.code} className="level" style={{ ["--p" as string]: (i + 1) / levels.length }}>
                  <span className="level__code">{l.code === "0" ? "0" : l.code}</span>
                  <span className="level__name">{l.name}</span>
                </li>
              ))}
            </ol>
            <div className="unknown-level">
              <strong>¿No sabés tu nivel?</strong>
              <span>No hace falta. Contanos qué estudiaste y lo conversamos antes de empezar.</span>
            </div>
            <div>
              <Link href="/aleman" className="text-link">
                Ver clases de alemán <ArrowRight />
              </Link>
            </div>
          </div>
          <aside className="side-card reveal" aria-labelledby="espanol-card-title">
            <span className="side-card__lang" lang="de">
              Spanisch lernen
            </span>
            <h3 id="espanol-card-title">Español para germanoparlantes</h3>
            <p>
              Si tu idioma es el alemán y querés aprender o mejorar tu español, también tenés tu lugar en StartEs.
            </p>
            <div>
              <Link href="/espanol" className="text-link">
                Ver clases de español <ArrowRight />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Modalidades */}
      <section className="section" aria-labelledby="modalidades-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Modalidades</span>
            <h2 id="modalidades-title">Individuales o grupales.</h2>
            <p className="lead">Contanos qué buscás y conversemos sobre las opciones.</p>
          </div>
          <div className="compare reveal">
            <div className="compare__col">
              <span className="compare__tag">Individual</span>
              <h3>Una clase pensada para vos</h3>
              <ul>
                <li>Todo el tiempo de clase se enfoca en tu objetivo.</li>
                <li>Útil si tenés un objetivo muy específico, como un examen.</li>
              </ul>
            </div>
            <div className="compare__col">
              <span className="compare__tag">Grupal</span>
              <h3>Aprender junto a otras personas</h3>
              <ul>
                <li>Practicás la conversación con más voces.</li>
                <li>Compartís el proceso y la motivación con otras personas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo empezar */}
      <section className="section section--alt" aria-labelledby="empezar-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Cómo empezar</span>
            <h2 id="empezar-title">Tres pasos, sin compromiso.</h2>
          </div>
          <ol className="steps reveal">
            <li className="step">
              <h3>Contanos tu objetivo</h3>
              <p>Completás el formulario o nos escribís por WhatsApp. Solo te pedimos lo necesario para responderte.</p>
            </li>
            <li className="step">
              <h3>Conversamos</h3>
              <p>Desde StartEs te contactamos para conocer tu punto de partida y ver qué modalidad te conviene.</p>
            </li>
            <li className="step">
              <h3>Acordamos el comienzo</h3>
              <p>Horarios, inscripción y comienzo se acuerdan por mensaje. Enviar la consulta no te compromete.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* La academia */}
      <section id="academia" className="section" aria-labelledby="academia-title">
        <div className="container about">
          <div className="about__photo reveal">
            <picture>
              <source
                type="image/webp"
                srcSet="/img/mariana-masgoret-480.webp 480w, /img/mariana-masgoret-800.webp 800w"
                sizes="(max-width: 880px) 360px, 440px"
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
            <BrandCurves variant="band" />
          </div>
          <div className="about__copy reveal">
            <span className="eyebrow">La academia</span>
            <h2 id="academia-title">Aprender con acompañamiento cercano.</h2>
            <p className="lead">
              En StartEs las clases son entretenidas, intuitivas y cercanas. Cada persona llega con una historia distinta,
              y el aprendizaje se construye a partir de ella.
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
            <p className="about__note">
              StartEs está a cargo de Mariana Masgoret, profesora titulada de alemán con más de ocho años de experiencia
              en la enseñanza.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="preguntas" className="section section--alt" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 id="faq-title">Lo que suelen preguntarnos.</h2>
          </div>
          <div className="reveal">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
