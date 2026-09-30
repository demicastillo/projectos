// Envío de consultas encapsulado: el formulario no sabe qué proveedor se usa.
// CONTACT_MODE decide el comportamiento (ver .env.example).

import { contact, interestOptions } from "@/content/site";
import type { ConsultaInput } from "./validation";

export type SendResult =
  | { status: "sent" }
  | { status: "demo" }
  | { status: "unavailable" }
  | { status: "failed" };

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function summary(input: ConsultaInput): [string, string][] {
  const interest = interestOptions.find((o) => o.value === input.interest)?.label ?? input.interest;
  const rows: [string, string][] = [
    ["Nombre", input.name],
    ["Correo", input.email],
    ["Interés", interest],
    ["Nivel aproximado", input.level || "—"],
    ["Modalidad", input.modality || "—"],
  ];
  if (input.interest === "examen") rows.push(["Examen", input.exam || "—"]);
  rows.push(["WhatsApp", input.whatsapp || "—"]);
  rows.push(["Consulta para una persona menor", input.forMinor ? "Sí (escribe una persona adulta responsable)" : "No"]);
  rows.push(["Mensaje", input.message || "—"]);
  return rows;
}

async function sendWithResend(input: ConsultaInput): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || contact.email;
  if (!key || !from) return { status: "unavailable" };

  const rows = summary(input);
  const html = `<h2>Nueva consulta desde la web</h2><table>${rows
    .map(([k, v]) => `<tr><th align="left" style="padding:4px 12px 4px 0">${escapeHtml(k)}</th><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const post = (body: object) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });

  // Notificación a la academia: el visitante va en Reply-To, nunca como remitente.
  const notify = await post({ from, to: [to], reply_to: input.email, subject: `Consulta web: ${input.name}`, html, text });
  if (!notify.ok) return { status: "failed" };

  // Acuse para la persona. Si falla, la consulta ya llegó a la academia: no se informa error.
  await post({
    from,
    to: [input.email],
    reply_to: to,
    subject: "Recibimos tu consulta · StartEs",
    text: `Hola, ${input.name}:\n\nRecibimos tu consulta. Vamos a contactarte para conversar sobre tu objetivo y las opciones de clases. El envío no confirma una inscripción.\n\nStartEs`,
  }).catch(() => undefined);

  return { status: "sent" };
}

export async function sendConsulta(input: ConsultaInput): Promise<SendResult> {
  const mode = process.env.CONTACT_MODE ?? "";
  if (mode === "demo" && process.env.NODE_ENV !== "production") return { status: "demo" };
  if (mode === "resend") {
    try {
      return await sendWithResend(input);
    } catch {
      return { status: "failed" };
    }
  }
  return { status: "unavailable" };
}
