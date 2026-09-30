import { contact } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Política de privacidad",
  description: "Cómo trata StartEs los datos que enviás desde el formulario de consulta.",
  path: "/privacidad",
  index: false,
});

export default function PrivacidadPage() {
  return (
    <section className="page-hero">
      <div className="container prose">
        <h1>Política de privacidad</h1>
        <p className="notice">
          Borrador en preparación. Antes de publicar el sitio falta completar los datos legales del titular, la
          jurisdicción aplicable y los proveedores de alojamiento y correo elegidos.
        </p>

        <h2>Quién trata tus datos</h2>
        <p>
          StartEs, academia online de idiomas. Contacto para temas de privacidad:{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>

        <h2>Qué datos pedimos y para qué</h2>
        <p>
          En el formulario de consulta pedimos tu nombre y tu correo, y de forma opcional tu nivel, la modalidad que te
          interesa, el examen que querés preparar, un mensaje y un número de WhatsApp. Los usamos únicamente para
          responder tu consulta y conversar sobre las clases.
        </p>
        <p>
          Si escribís por una persona menor de edad, no hace falta que envíes sus datos personales en este primer
          contacto.
        </p>

        <h2>Qué no hacemos</h2>
        <ul>
          <li>No te suscribimos a comunicaciones comerciales por enviar una consulta.</li>
          <li>No vendemos ni cedemos tus datos a terceros para publicidad.</li>
          <li>No incluimos tus datos personales en direcciones web ni en estadísticas de uso.</li>
        </ul>

        <h2>Cuánto tiempo los conservamos</h2>
        <p>Pendiente de definir junto con el proveedor de correo y almacenamiento elegido.</p>

        <h2>Tus derechos</h2>
        <p>
          Podés pedir acceder, corregir o eliminar tus datos escribiendo a{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      </div>
    </section>
  );
}
