// Validación compartida entre el formulario (cliente) y la ruta /api/consulta (servidor).

import { interestOptions, levelOptions, modalityOptions, type Interest } from "@/content/site";

export const LIMITS = { name: 100, email: 254, exam: 120, message: 1500, whatsapp: 30 } as const;

export type ConsultaInput = {
  name: string;
  email: string;
  interest: Interest | "";
  level: string;
  modality: string;
  exam: string;
  message: string;
  whatsapp: string;
  forMinor: boolean;
};

export type FieldErrors = Partial<Record<keyof ConsultaInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Teléfono opcional: dígitos, espacios, +, guiones y paréntesis.
const PHONE_RE = /^\+?[\d\s()-]{6,}$/;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max * 2) : "";
}

export function normalize(raw: Record<string, unknown>): ConsultaInput {
  return {
    name: str(raw.name, LIMITS.name),
    email: str(raw.email, LIMITS.email),
    interest: str(raw.interest, 20) as Interest | "",
    level: str(raw.level, 30),
    modality: str(raw.modality, 30),
    exam: str(raw.exam, LIMITS.exam),
    message: str(raw.message, LIMITS.message),
    whatsapp: str(raw.whatsapp, LIMITS.whatsapp),
    forMinor: raw.forMinor === true || raw.forMinor === "on" || raw.forMinor === "true",
  };
}

export function validate(input: ConsultaInput): FieldErrors {
  const e: FieldErrors = {};
  if (!input.name) e.name = "Escribí tu nombre.";
  else if (input.name.length > LIMITS.name) e.name = `Usá como máximo ${LIMITS.name} caracteres.`;

  if (!input.email) e.email = "Escribí tu correo para poder responderte.";
  else if (input.email.length > LIMITS.email || !EMAIL_RE.test(input.email))
    e.email = "Revisá el correo: debería tener el formato nombre@dominio.com.";

  if (!interestOptions.some((o) => o.value === input.interest)) e.interest = "Elegí qué te interesa.";

  if (input.level && !levelOptions.includes(input.level)) e.level = "Elegí un nivel de la lista.";
  if (input.modality && !modalityOptions.includes(input.modality)) e.modality = "Elegí una modalidad de la lista.";

  if (input.exam.length > LIMITS.exam) e.exam = `Usá como máximo ${LIMITS.exam} caracteres.`;
  if (input.message.length > LIMITS.message) e.message = `Usá como máximo ${LIMITS.message} caracteres.`;

  if (input.whatsapp && (input.whatsapp.length > LIMITS.whatsapp || !PHONE_RE.test(input.whatsapp)))
    e.whatsapp = "Revisá el número. Incluí el código de país, por ejemplo +49 o +54.";

  return e;
}
