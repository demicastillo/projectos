"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contact, formCopy } from "@/content/site";

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
    <div className="not-found" style={{ paddingBlock: "clamp(32px, 6vw, 80px)" }}>
      <span className="eyebrow">{sent ? "Consulta recibida" : "Consultas"}</span>
      <h1 ref={headingRef} tabIndex={-1}>
        {sent ? "¡Gracias por escribirnos!" : "¿Querés hacer una consulta?"}
      </h1>
      <p className="lead">
        {sent
          ? formCopy.success
          : "Desde el formulario de contacto podés contarnos qué querés aprender. También podés escribirnos por WhatsApp."}
      </p>
      <div className="hero__actions">
        {sent ? (
          <Link href="/" className="btn">
            Volver al inicio
          </Link>
        ) : (
          <Link href="/contacto" className="btn">
            Ir al formulario
          </Link>
        )}
        <a href={contact.whatsappUrl} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  );
}
