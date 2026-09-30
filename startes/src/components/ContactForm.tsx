"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { contact, formCopy, interestOptions, levelOptions, modalityOptions, type Interest } from "@/content/site";
import { LIMITS, normalize, validate, type ConsultaInput, type FieldErrors } from "@/lib/contact/validation";
import { track } from "@/lib/analytics";
import { Alert } from "./Icons";

type Status = "idle" | "submitting" | "invalid" | "error" | "unavailable" | "demo";

const EMPTY: ConsultaInput = {
  name: "",
  email: "",
  interest: "",
  level: "",
  modality: "",
  exam: "",
  message: "",
  whatsapp: "",
  forMinor: false,
};

const FIELD_LABELS: Record<keyof ConsultaInput, string> = {
  name: "Nombre",
  email: "Correo",
  interest: "Qué te interesa",
  level: "Nivel aproximado",
  modality: "Modalidad",
  exam: "Examen",
  message: "Objetivo o consulta",
  whatsapp: "WhatsApp",
  forMinor: "Consulta para una persona menor",
};

function newRequestId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now() + Math.random());
}

export function ContactForm() {
  const router = useRouter();
  const uid = useId();
  const [data, setData] = useState<ConsultaInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const requestId = useRef<string>("");
  const started = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Preselección desde otra página: ?interes=aleman|examen|espanol|orientacion (validado).
  useEffect(() => {
    requestId.current = newRequestId();
    const value = new URLSearchParams(window.location.search).get("interes");
    if (value && interestOptions.some((o) => o.value === value)) {
      setData((d) => ({ ...d, interest: value as Interest }));
    }
  }, []);

  const id = (name: string) => `${uid}-${name}`;

  const set = <K extends keyof ConsultaInput>(key: K, value: ConsultaInput[K]) => {
    if (!started.current) {
      started.current = true;
      track("contact_form_start");
    }
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const describedBy = (name: keyof ConsultaInput, hint = false) =>
    [hint ? id(`${name}-hint`) : null, errors[name] ? id(`${name}-error`) : null].filter(Boolean).join(" ") || undefined;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const input = normalize(data as unknown as Record<string, unknown>);
    const found = validate(input);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("invalid");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus("submitting");
    const honeypot = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15_000);

    try {
      const res = await fetch("/api/consulta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: honeypot, requestId: requestId.current }),
        signal: controller.signal,
      });
      const body = (await res.json().catch(() => ({}))) as { status?: string; errors?: FieldErrors };

      if (res.ok && body.status === "sent") {
        track("contact_submit_success", { interest: input.interest });
        try {
          sessionStorage.setItem("startes-consulta", "enviada");
        } catch {}
        requestId.current = newRequestId();
        router.push("/gracias");
        return;
      }
      if (res.ok && body.status === "demo") {
        setStatus("demo");
      } else if (res.status === 422 && body.errors) {
        setErrors(body.errors);
        setStatus("invalid");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      } else if (res.status === 503) {
        track("contact_submit_error", { category: "unavailable" });
        setStatus("unavailable");
      } else {
        track("contact_submit_error", { category: res.status === 429 ? "rate_limited" : "server" });
        setStatus("error");
      }
    } catch {
      track("contact_submit_error", { category: "network" });
      setStatus("error");
    } finally {
      clearTimeout(timer);
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const errorEntries = Object.entries(errors).filter(([, v]) => v) as [keyof ConsultaInput, string][];
  const submitting = status === "submitting";

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-describedby={id("intro")}>
      <p id={id("intro")} className="visually-hidden">
        {formCopy.intro}
      </p>

      {status === "invalid" && errorEntries.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className="form-status form-status--error" role="alert" aria-labelledby={id("summary-title")}>
          <strong id={id("summary-title")}>Revisá {errorEntries.length === 1 ? "este campo" : `estos ${errorEntries.length} campos`}:</strong>
          <ul>
            {errorEntries.map(([key, msg]) => (
              <li key={key}>
                <a href={`#${id(key)}`}>
                  {FIELD_LABELS[key]}: {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-row">
        <div className="field">
          <label htmlFor={id("name")}>Nombre</label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
          />
          {errors.name && (
            <span id={id("name-error")} className="field-error">
              <Alert /> {errors.name}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor={id("email")}>Correo</label>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={LIMITS.email}
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
          />
          {errors.email && (
            <span id={id("email-error")} className="field-error">
              <Alert /> {errors.email}
            </span>
          )}
        </div>
      </div>

      <fieldset className="choice-group field" aria-describedby={errors.interest ? id("interest-error") : undefined}>
        <legend>Qué te interesa</legend>
        <div className="choices" id={id("interest")} tabIndex={-1}>
          {interestOptions.map((o) => (
            <label key={o.value} className="choice">
              <input
                type="radio"
                name="interest"
                value={o.value}
                checked={data.interest === o.value}
                onChange={() => set("interest", o.value)}
                aria-invalid={errors.interest ? true : undefined}
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
        {errors.interest && (
          <span id={id("interest-error")} className="field-error">
            <Alert /> {errors.interest}
          </span>
        )}
      </fieldset>

      {data.interest === "examen" && (
        <div className="field">
          <label htmlFor={id("exam")}>
            ¿Qué examen querés preparar? <span className="optional">(opcional)</span>
          </label>
          <input
            id={id("exam")}
            name="exam"
            type="text"
            maxLength={LIMITS.exam}
            value={data.exam}
            onChange={(e) => set("exam", e.target.value)}
            aria-describedby={describedBy("exam", true)}
            aria-invalid={errors.exam ? true : undefined}
          />
          <span id={id("exam-hint")} className="hint">
            Por ejemplo Goethe-Zertifikat B1, telc B2 o «Todavía no sé».
          </span>
          {errors.exam && (
            <span id={id("exam-error")} className="field-error">
              <Alert /> {errors.exam}
            </span>
          )}
        </div>
      )}

      <div className="form-row">
        <div className="field">
          <label htmlFor={id("level")}>
            Nivel aproximado <span className="optional">(opcional)</span>
          </label>
          <select
            id={id("level")}
            name="level"
            value={data.level}
            onChange={(e) => set("level", e.target.value)}
            aria-describedby={describedBy("level")}
          >
            <option value="">Elegí una opción</option>
            {levelOptions.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={id("modality")}>
            Modalidad <span className="optional">(opcional)</span>
          </label>
          <select
            id={id("modality")}
            name="modality"
            value={data.modality}
            onChange={(e) => set("modality", e.target.value)}
            aria-describedby={describedBy("modality")}
          >
            <option value="">Elegí una opción</option>
            {modalityOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor={id("message")}>
          Objetivo o consulta <span className="optional">(opcional)</span>
        </label>
        <textarea
          id={id("message")}
          name="message"
          maxLength={LIMITS.message}
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          aria-describedby={describedBy("message", true)}
          aria-invalid={errors.message ? true : undefined}
        />
        <span id={id("message-hint")} className="hint">
          Por ejemplo: para qué querés aprender, si ya estudiaste antes o qué días te resultan cómodos. {data.message.length}/{LIMITS.message}
        </span>
        {errors.message && (
          <span id={id("message-error")} className="field-error">
            <Alert /> {errors.message}
          </span>
        )}
      </div>

      <div className="field">
        <label htmlFor={id("whatsapp")}>
          WhatsApp <span className="optional">(opcional)</span>
        </label>
        <input
          id={id("whatsapp")}
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={LIMITS.whatsapp}
          value={data.whatsapp}
          onChange={(e) => set("whatsapp", e.target.value)}
          aria-describedby={describedBy("whatsapp", true)}
          aria-invalid={errors.whatsapp ? true : undefined}
        />
        <span id={id("whatsapp-hint")} className="hint">
          Solo si preferís que te respondamos por WhatsApp. Incluí el código de país.
        </span>
        {errors.whatsapp && (
          <span id={id("whatsapp-error")} className="field-error">
            <Alert /> {errors.whatsapp}
          </span>
        )}
      </div>

      <label className="check">
        <input type="checkbox" name="forMinor" checked={data.forMinor} onChange={(e) => set("forMinor", e.target.checked)} />
        <span>
          Escribo como persona adulta responsable por una persona menor de edad. No hace falta que envíes sus datos
          personales: los conversamos después.
        </span>
      </label>

      {/* Campo trampa para bots; oculto para personas y lectores de pantalla. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id("website")}>No completar este campo</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="form-privacy">
        Usamos tus datos solo para responder esta consulta. Más información en la{" "}
        <Link href="/privacidad">política de privacidad</Link>. Enviar la consulta no te inscribe ni te suscribe a
        comunicaciones comerciales.
      </p>

      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {status === "error" && (
          <div className="form-status form-status--error" role="alert">
            <p>{formCopy.error}</p>
            <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "form-error" })}>
              Escribir por WhatsApp
            </a>
          </div>
        )}
        {status === "unavailable" && (
          <div className="form-status form-status--error" role="alert">
            <p>{formCopy.unavailable}</p>
            <p>
              <a href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "form-unavailable" })}>
                WhatsApp {contact.whatsappDisplay}
              </a>{" "}
              · <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        )}
        {status === "demo" && (
          <div className="form-status form-status--demo" role="status">
            <p>{formCopy.demo}</p>
          </div>
        )}
        {submitting && <span className="visually-hidden">Enviando consulta…</span>}
      </div>

      <div>
        <button type="submit" className="btn" disabled={submitting} aria-disabled={submitting}>
          {submitting ? (
            <>
              <span className="spinner" aria-hidden="true" /> Enviando…
            </>
          ) : (
            "Enviar consulta"
          )}
        </button>
      </div>
    </form>
  );
}
