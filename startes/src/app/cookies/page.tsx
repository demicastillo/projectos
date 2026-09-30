import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cookies",
  description: "Qué almacenamiento usa el sitio de StartEs en tu navegador.",
  path: "/cookies",
  index: false,
});

export default function CookiesPage() {
  return (
    <section className="page-hero">
      <div className="container prose">
        <h1>Cookies y almacenamiento</h1>
        <p>
          Hoy este sitio no usa cookies de analítica, publicidad ni redes sociales, y no incrusta contenido de terceros
          que las instale. Por eso no te mostramos un aviso para aceptarlas.
        </p>
        <h2>Qué guardamos en tu navegador</h2>
        <ul>
          <li>
            <strong>Tema claro u oscuro</strong>: si elegís uno, lo recordamos en el almacenamiento local de tu navegador
            para mostrártelo la próxima vez. No sale de tu dispositivo.
          </li>
          <li>
            <strong>Confirmación de envío</strong>: una marca temporal para mostrarte la página de agradecimiento correcta
            después de enviar el formulario. Se borra al mostrarse.
          </li>
        </ul>
        <p>Podés borrar estos datos en cualquier momento desde la configuración de tu navegador.</p>
        <p className="notice">
          Si más adelante se incorporan estadísticas u otros servicios que necesiten tu consentimiento, esta página y un
          panel de preferencias se actualizarán antes de activarlos.
        </p>
      </div>
    </section>
  );
}
