import Link from "next/link";
import { contact } from "@/content/site";
import { BrandCurves } from "./BrandCurves";
import { ArrowRight } from "./Icons";

type Props = { title?: string; text?: string; href?: string };

export function CtaBand({
  title = "¿Empezamos a conversar?",
  text = "Contanos qué querés aprender y desde StartEs te escribimos para ver juntos las opciones de clases.",
  href = "/contacto",
}: Props) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band reveal">
          <BrandCurves variant="band" />
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
          <div className="cta-band__actions">
            <Link href={href} className="btn" data-cta="closing">
              Consultar por clases <ArrowRight />
            </Link>
            <a href={contact.whatsappUrl} className="btn btn--ghost" target="_blank" rel="noopener noreferrer" data-cta="whatsapp-closing">
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
