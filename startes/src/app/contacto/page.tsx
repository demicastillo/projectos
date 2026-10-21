import { Mail, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Instagram } from "@/components/Icons";
import { contact } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contacto y consulta por clases",
  description:
    "Contanos qué querés aprender y desde StartEs te contactamos para conversar sobre las clases. También por WhatsApp, correo o Instagram.",
  path: "/contacto",
});

const channelCls = "flex min-h-16 items-center gap-4 border-b border-line py-3 transition-colors hover:text-brand-text";

export default function ContactoPage() {
  return (
    <section aria-labelledby="contacto-title" className="container-site pt-12 pb-20 sm:pt-20 sm:pb-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h1
            id="contacto-title"
            className="font-wide text-[clamp(2.5rem,5.4vw,4.5rem)] leading-[1.02] font-extrabold tracking-tight"
          >
            Contanos qué querés aprender.
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg text-ink-soft">
            Desde StartEs te contactamos para conversar sobre las clases. La consulta no es una inscripción: horarios,
            precios y comienzo se conversan después, por mensaje.
          </p>
          <h2 className="mt-12 text-sm font-semibold text-ink-soft">Si preferís, escribinos directo</h2>
          <ul className="mt-2 border-t border-line">
            <li>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-contacto" className={channelCls}>
                <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
                <span className="font-semibold">WhatsApp</span>
                <span className="ml-auto text-ink-soft tabular-nums">{contact.whatsappDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className={channelCls}>
                <Mail className="size-5 shrink-0" aria-hidden="true" />
                <span className="font-semibold">Correo</span>
                <span className="ml-auto truncate text-ink-soft">{contact.email}</span>
              </a>
            </li>
            <li>
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={channelCls}>
                <Instagram className="size-5 shrink-0" />
                <span className="font-semibold">Instagram</span>
                <span className="ml-auto text-ink-soft">{contact.instagramHandle}</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-panel border border-line p-5 sm:p-10">
          <h2 className="sr-only">Formulario de consulta</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
