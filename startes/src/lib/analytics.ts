// Punto único para eventos de analítica. Todavía no hay proveedor elegido:
// los eventos se emiten como CustomEvent en window y no salen del navegador.
// Nunca incluir nombre, correo, teléfono ni texto libre en los datos.

export type AnalyticsEvent =
  | "contact_cta_click"
  | "contact_form_start"
  | "contact_submit_success"
  | "contact_submit_error"
  | "whatsapp_click";

export function track(name: AnalyticsEvent, data: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("startes:analytics", { detail: { name, ...data } }));
}
