import { Mail, MessageCircle } from "lucide-react";
import { contact } from "@/content/site";
import { Instagram } from "./Icons";
import { TextAnimate } from "./ui/text-animate";
import { InteractiveHoverLink } from "./ui/interactive-hover-button";

type Props = { title?: string; text?: string; href?: string };

// Cierre de cada página: franja roja de marca con la consulta y los canales reales.
export function Closing({
  title = "Contanos qué querés aprender.",
  text = "Te respondemos para conversar tu objetivo y las opciones de clases. La consulta no te inscribe ni te compromete.",
  href = "/contacto",
}: Props) {
  return (
    <section aria-labelledby="cierre-title" className="bg-brand text-white">
      <div className="container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
        <div>
          <TextAnimate
            as="h2"
            id="cierre-title"
            by="word"
            animation="blurInUp"
            once
            duration={0.6}
            className="font-wide text-[clamp(2.4rem,5.6vw,4.75rem)] leading-[1.02] font-extrabold tracking-tight"
          >
            {title}
          </TextAnimate>
          <p className="mt-6 max-w-[46ch] text-lg text-white/88">{text}</p>
          <InteractiveHoverLink href={href} tone="light" data-cta="cierre" className="mt-9">
            Consultar por clases
          </InteractiveHoverLink>
        </div>
        <ul className="flex flex-col border-t border-white/25" aria-label="También podés escribirnos por">
          <li className="border-b border-white/25">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="whatsapp-cierre"
              className="flex min-h-16 items-center gap-4 py-3 hover:underline"
            >
              <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
              <span className="font-semibold">WhatsApp</span>
              <span className="ml-auto text-white/80 tabular-nums">{contact.whatsappDisplay}</span>
            </a>
          </li>
          <li className="border-b border-white/25">
            <a href={`mailto:${contact.email}`} className="flex min-h-16 items-center gap-4 py-3 hover:underline">
              <Mail className="size-5 shrink-0" aria-hidden="true" />
              <span className="font-semibold">Correo</span>
              <span className="ml-auto truncate text-white/80">{contact.email}</span>
            </a>
          </li>
          <li className="border-b border-white/25">
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-16 items-center gap-4 py-3 hover:underline"
            >
              <Instagram className="size-5 shrink-0" />
              <span className="font-semibold">Instagram</span>
              <span className="ml-auto text-white/80">{contact.instagramHandle}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
