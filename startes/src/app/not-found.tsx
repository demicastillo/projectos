import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container">
      <div className="message">
        <p className="card message__card" aria-hidden="true">
          404
        </p>
        <h1>Esta página no existe.</h1>
        <p className="lead on-paper">Puede que el enlace haya cambiado. Estas páginas te pueden servir:</p>
        <div className="actions">
          <Link href="/" className="btn">
            Ir al inicio
          </Link>
          <Link href="/aleman" className="btn btn--ghost">
            Clases de alemán
          </Link>
          <Link href="/contacto" className="btn btn--ghost">
            Contacto
          </Link>
        </div>
      </div>
    </section>
  );
}
