import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="not-found__code" aria-hidden="true">404</span>
      <h1>Esta página no existe.</h1>
      <p className="lead">Puede que el enlace haya cambiado. Estas páginas te pueden servir:</p>
      <div className="hero__actions">
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
    </section>
  );
}
