import { ContactForm } from "@/components/ContactForm";
import { Chat, Instagram, Mail } from "@/components/Icons";
import { contact, formCopy } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contacto y consulta por clases",
  description:
    "Contanos qué querés aprender y desde StartEs te contactamos para conversar sobre las clases. También por WhatsApp, correo o Instagram.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <section className="page-hero" aria-labelledby="contacto-title">
      <div className="container contact-layout">
        <div className="contact-aside">
          <h1 id="contacto-title" className="underline2">Contanos qué querés aprender.</h1>
          <p className="lead on-paper">{formCopy.intro.replace("Contanos qué querés aprender. ", "")}</p>
          <p className="on-paper">La consulta no es una inscripción: horarios, precios y comienzo se conversan después, por mensaje.</p>
          <ul className="card channels" aria-label="Otros canales">
            <li>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-contact">
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
        <div className="card form-card">
          <h2 className="visually-hidden">Formulario de consulta</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
