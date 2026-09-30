import Link from "next/link";
import { contact } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo width={84} />
            <p>Academia online de idiomas. Alemán desde cero hasta C2, exámenes y español para germanoparlantes.</p>
          </div>
          <div>
            <h2>Clases</h2>
            <ul>
              <li><Link href="/aleman">Alemán</Link></li>
              <li><Link href="/examenes">Exámenes</Link></li>
              <li><Link href="/espanol">Español</Link></li>
              <li><Link href="/contacto">Consultar</Link></li>
            </ul>
          </div>
          <div>
            <h2>Contacto</h2>
            <ul>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-footer">WhatsApp {contact.whatsappDisplay}</a></li>
              <li><a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {contact.instagramHandle}</a></li>
            </ul>
          </div>
          <div>
            <h2>Legal</h2>
            <ul>
              <li><Link href="/privacidad">Privacidad</Link></li>
              <li><Link href="/terminos">Términos</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} StartEs</span>
          <span>Clases online de alemán y español</span>
        </div>
      </div>
    </footer>
  );
}
