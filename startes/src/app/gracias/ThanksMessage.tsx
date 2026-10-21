"use client";

import { useEffect, useRef, useState } from "react";
import { contact, formCopy } from "@/content/site";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";

// Solo confirma un envío si el formulario acaba de recibir la aceptación del servidor
// (marca de un solo uso en sessionStorage). Una visita directa ve un mensaje general.
export function ThanksMessage() {
  const [sent, setSent] = useState<boolean | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let flag = false;
    try {
      flag = sessionStorage.getItem("startes-consulta") === "enviada";
      sessionStorage.removeItem("startes-consulta");
    } catch {}
    setSent(flag);
    headingRef.current?.focus();
  }, []);

  if (sent === null) return <div style={{ minHeight: "40vh" }} />;

  return (
    <div>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="font-wide max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] font-extrabold tracking-tight focus:outline-none"
      >
        {sent ? "¡Gracias por escribirnos!" : "¿Querés hacer una consulta?"}
      </h1>
      <p className="mt-6 max-w-[52ch] text-lg text-ink-soft">
        {sent
          ? formCopy.success
          : "Desde el formulario de contacto podés contarnos qué querés aprender. También podés escribirnos por WhatsApp."}
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
        {sent ? <InteractiveHoverLink href="/">Volver al inicio</InteractiveHoverLink> : <InteractiveHoverLink href="/contacto">Ir al formulario</InteractiveHoverLink>}
        <a
          href={contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline decoration-line decoration-2 underline-offset-6 hover:decoration-brand"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  );
}
