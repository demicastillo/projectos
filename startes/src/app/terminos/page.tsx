import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Términos de uso",
  description: "Condiciones de uso del sitio web de StartEs.",
  path: "/terminos",
  index: false,
});

export default function TerminosPage() {
  return (
    <section className="section">
      <div className="container prose">
        <span className="eyebrow">Legal</span>
        <h1>Términos de uso del sitio</h1>
        <p className="notice">
          Borrador en preparación. Falta completar los datos legales del titular y la jurisdicción aplicable.
        </p>

        <h2>Sobre este sitio</h2>
        <p>
          Este sitio presenta las clases online de StartEs y permite enviar una consulta. La información publicada es
          general y puede actualizarse.
        </p>

        <h2>Consulta no es inscripción</h2>
        <p>
          Enviar el formulario de consulta no constituye una inscripción, una reserva ni un contrato. Las condiciones de
          las clases (horarios, duración, precios y forma de pago) se acuerdan después, por mensaje.
        </p>

        <h2>Uso adecuado</h2>
        <p>Te pedimos no enviar contenido falso, ofensivo o automatizado a través del formulario.</p>

        <h2>Propiedad intelectual</h2>
        <p>El nombre StartEs, su logo y los textos de este sitio pertenecen a StartEs.</p>
      </div>
    </section>
  );
}
