import Link from "next/link";
import { contact } from "@/content/site";
import { Logo } from "./Logo";

const linkCls = "inline-flex min-h-10 items-center text-ink-soft transition-colors hover:text-ink";

export function Footer() {
  return (
    <footer className="border-t border-line pb-24 lg:pb-0">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_repeat(3,minmax(0,2fr))]">
        <div className="flex flex-col items-start gap-4">
          <span className="logo-plate">
            <Logo width={76} />
          </span>
          <p className="max-w-[34ch] text-ink-soft">
            Academia online de idiomas. Alemán desde cero hasta C2, preparación de exámenes y español para germanoparlantes.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Clases</h2>
          <ul className="mt-3">
            <li><Link className={linkCls} href="/aleman">Alemán</Link></li>
            <li><Link className={linkCls} href="/examenes">Exámenes</Link></li>
            <li><Link className={linkCls} href="/espanol">Español</Link></li>
            <li><Link className={linkCls} href="/contacto">Consultar</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Contacto</h2>
          <ul className="mt-3">
            <li><a className={linkCls} href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li>
              <a className={linkCls} href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-footer">
                WhatsApp <span className="ml-1 whitespace-nowrap">{contact.whatsappDisplay}</span>
              </a>
            </li>
            <li>
              <a className={linkCls} href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram {contact.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Legal</h2>
          <ul className="mt-3">
            <li><Link className={linkCls} href="/privacidad">Privacidad</Link></li>
            <li><Link className={linkCls} href="/terminos">Términos</Link></li>
            <li><Link className={linkCls} href="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-site">
        <div className="flex flex-wrap justify-between gap-2 border-t border-line py-6 text-sm text-ink-soft">
          <span>© {new Date().getFullYear()} StartEs</span>
          <span>Clases online de alemán y español</span>
        </div>
      </div>
    </footer>
  );
}
