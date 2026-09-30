import Link from "next/link";
import { contact } from "@/content/site";
import { ArrowRight, Chat, Instagram, Mail } from "./Icons";

type Props = { title?: string; text?: string; href?: string };

// Cierre de cada página: la doble raya final del cuaderno (Schlussstrich) y los canales reales.
export function CtaBand({
  title = "¿Empezamos a conversar?",
  text = "Contanos qué querés aprender y desde StartEs te escribimos para ver juntos las opciones de clases.",
  href = "/contacto",
}: Props) {
  return (
    <section className="closing" aria-labelledby="cta-title">
      <div className="container">
        <div className="closing__rule reveal" aria-hidden="true" />
        <div className="closing__grid">
          <div>
            <h2 id="cta-title">{title}</h2>
            <p className="lead on-paper">{text}</p>
            <Link href={href} className="btn" data-cta="closing">
              Consultar por clases <ArrowRight />
            </Link>
          </div>
          <ul className="card channels" aria-label="También podés escribirnos por">
            <li>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-closing">
                <Chat />
                <span>
                  WhatsApp <small>{contact.whatsappDisplay}</small>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>
                <Mail />
                <span>
                  Correo <small>{contact.email}</small>
                </span>
              </a>
            </li>
            <li>
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Instagram />
                <span>
                  Instagram <small>{contact.instagramHandle}</small>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
