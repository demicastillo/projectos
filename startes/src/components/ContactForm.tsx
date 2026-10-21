"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { contact, formCopy, interestOptions, levelOptions, modalityOptions, type Interest } from "@/content/site";
import { LIMITS, normalize, validate, type ConsultaInput, type FieldErrors } from "@/lib/contact/validation";
import { track } from "@/lib/analytics";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";

const labelCls = "mb-2 block font-semibold";
const inputCls =
  "block min-h-12 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-ink-soft hover:border-ink-soft focus-visible:border-ink focus-visible:outline-offset-1 aria-invalid:border-danger";
const hintCls = "mt-2 block text-sm text-ink-soft";
const optionalCls = "font-normal text-ink-soft";

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span id={id} className="mt-2 flex items-start gap-1.5 text-sm font-semibold text-danger">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {children}
    </span>
  );
}

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

// Con Netlify Forms (NEXT_PUBLIC_CONTACT_PROVIDER=netlify) la consulta se guarda en
// Netlify y llega por correo según el aviso configurado en el panel. Los campos deben
// coincidir con public/__forms.html.
const NETLIFY_FORMS = process.env.NEXT_PUBLIC_CONTACT_PROVIDER === "netlify";

function netlifyBody(input: ConsultaInput, honeypot: string) {
  const interest = interestOptions.find((o) => o.value === input.interest)?.label ?? input.interest;
  return new URLSearchParams({
    "form-name": "consulta",
    subject: `Consulta web de ${input.name}: ${interest}`,
    nombre: input.name,
    email: input.email,
    interes: interest,
    nivel: input.level,
    modalidad: input.modality,
    examen: input.exam,
    whatsapp: input.whatsapp,
    menor_de_edad: input.forMinor ? "Sí, escribe una persona adulta responsable" : "No",
    mensaje: input.message,
    website: honeypot,
  }).toString();
}

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
    const params = new URLSearchParams(window.location.search);
    const value = params.get("interes");
    const level = params.get("nivel");
    setData((d) => ({
      ...d,
      ...(value && interestOptions.some((o) => o.value === value) ? { interest: value as Interest } : {}),
      ...(level && levelOptions.includes(level) ? { level } : {}),
    }));
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
      const res = NETLIFY_FORMS
        ? await fetch("/__forms.html", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: netlifyBody(input, honeypot),
            signal: controller.signal,
          })
        : await fetch("/api/consulta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...input, website: honeypot, requestId: requestId.current }),
            signal: controller.signal,
          });
      // Netlify Forms responde 200 con HTML; la API propia responde JSON.
      const body = NETLIFY_FORMS
        ? { status: res.ok ? "sent" : undefined }
        : ((await res.json().catch(() => ({}))) as { status?: string; errors?: FieldErrors });

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
    <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate aria-describedby={id("intro")}>
      <p id={id("intro")} className="sr-only">
        {formCopy.intro}
      </p>

      {status === "invalid" && errorEntries.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className="rounded-xl border border-danger bg-danger-soft p-4" role="alert" aria-labelledby={id("summary-title")}>
          <strong id={id("summary-title")}>Revisá {errorEntries.length === 1 ? "este campo" : `estos ${errorEntries.length} campos`}:</strong>
          <ul className="mt-2 list-disc pl-5">
            {errorEntries.map(([key, msg]) => (
              <li key={key}>
                <a className="underline underline-offset-2" href={`#${id(key)}`}>
                  {FIELD_LABELS[key]}: {msg}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={id("name")}>Nombre</label>
          <input
            id={id("name")}
            className={inputCls}
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
            <FieldError id={id("name-error")}>{errors.name}</FieldError>
          )}
        </div>
        <div>
          <label className={labelCls} htmlFor={id("email")}>Correo</label>
          <input
            id={id("email")}
            className={inputCls}
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
            <FieldError id={id("email-error")}>{errors.email}</FieldError>
          )}
        </div>
      </div>

      <fieldset aria-describedby={errors.interest ? id("interest-error") : undefined}>
        <legend className={labelCls}>Qué te interesa</legend>
        <div className="grid gap-2 sm:grid-cols-2" id={id("interest")} tabIndex={-1}>
          {interestOptions.map((o) => (
            <label
              key={o.value}
              className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3 transition-colors hover:border-ink-soft has-checked:border-ink has-checked:bg-stone has-focus-visible:outline-3 has-focus-visible:outline-offset-1 has-focus-visible:outline-focus"
            >
              <input
                type="radio"
                name="interest"
                value={o.value}
                checked={data.interest === o.value}
                onChange={() => set("interest", o.value)}
                aria-invalid={errors.interest ? true : undefined}
                className="size-4.5 shrink-0 accent-brand focus-visible:outline-none"
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
        {errors.interest && (
          <FieldError id={id("interest-error")}>{errors.interest}</FieldError>
        )}
      </fieldset>

      {data.interest === "examen" && (
        <div>
          <label className={labelCls} htmlFor={id("exam")}>
            ¿Qué examen querés preparar? <span className={optionalCls}>(opcional)</span>
          </label>
          <input
            id={id("exam")}
            className={inputCls}
            name="exam"
            type="text"
            maxLength={LIMITS.exam}
            value={data.exam}
            onChange={(e) => set("exam", e.target.value)}
            aria-describedby={describedBy("exam", true)}
            aria-invalid={errors.exam ? true : undefined}
          />
          <span id={id("exam-hint")} className={hintCls}>
            Por ejemplo Goethe-Zertifikat B1, telc B2 o «Todavía no sé».
          </span>
          {errors.exam && (
            <FieldError id={id("exam-error")}>{errors.exam}</FieldError>
          )}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor={id("level")}>
            Nivel aproximado <span className={optionalCls}>(opcional)</span>
          </label>
          <select
            id={id("level")}
            className={inputCls}
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
        <div>
          <label className={labelCls} htmlFor={id("modality")}>
            Modalidad <span className={optionalCls}>(opcional)</span>
          </label>
          <select
            id={id("modality")}
            className={inputCls}
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

      <div>
        <label className={labelCls} htmlFor={id("message")}>
          Objetivo o consulta <span className={optionalCls}>(opcional)</span>
        </label>
        <textarea
          id={id("message")}
          className={inputCls + " min-h-36 resize-y"}
          name="message"
          maxLength={LIMITS.message}
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          aria-describedby={describedBy("message", true)}
          aria-invalid={errors.message ? true : undefined}
        />
        <span id={id("message-hint")} className={hintCls}>
          Por ejemplo: para qué querés aprender, si ya estudiaste antes o qué días te resultan cómodos. {data.message.length}/{LIMITS.message}
        </span>
        {errors.message && (
          <FieldError id={id("message-error")}>{errors.message}</FieldError>
        )}
      </div>

      <div>
        <label className={labelCls} htmlFor={id("whatsapp")}>
          WhatsApp <span className={optionalCls}>(opcional)</span>
        </label>
        <input
          id={id("whatsapp")}
          className={inputCls}
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
        <span id={id("whatsapp-hint")} className={hintCls}>
          Solo si preferís que te respondamos por WhatsApp. Incluí el código de país.
        </span>
        {errors.whatsapp && (
          <FieldError id={id("whatsapp-error")}>{errors.whatsapp}</FieldError>
        )}
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-stone p-4 text-[0.95rem]">
        <input type="checkbox" name="forMinor" checked={data.forMinor} onChange={(e) => set("forMinor", e.target.checked)} className="mt-1 size-4.5 shrink-0 accent-brand" />
        <span>
          Escribo como persona adulta responsable por una persona menor de edad. No hace falta que envíes sus datos
          personales: los conversamos después.
        </span>
      </label>

      {/* Campo trampa para bots; oculto para personas y lectores de pantalla. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label className={labelCls} htmlFor={id("website")}>No completar este campo</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-ink-soft">
        Usamos tus datos solo para responder esta consulta. Más información en la{" "}
        <Link className="underline underline-offset-2" href="/privacidad">política de privacidad</Link>. Enviar la consulta no te inscribe ni te suscribe a
        comunicaciones comerciales.
      </p>

      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {status === "error" && (
          <div className="rounded-xl border border-danger bg-danger-soft p-4" role="alert">
            <p>{formCopy.error}</p>
            <a className="font-semibold underline underline-offset-2" href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "form-error" })}>
              Escribir por WhatsApp
            </a>
          </div>
        )}
        {status === "unavailable" && (
          <div className="rounded-xl border border-danger bg-danger-soft p-4" role="alert">
            <p>{formCopy.unavailable}</p>
            <p>
              <a className="font-semibold underline underline-offset-2" href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { location: "form-unavailable" })}>
                WhatsApp {contact.whatsappDisplay}
              </a>{" "}
              o <a className="font-semibold underline underline-offset-2" href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          </div>
        )}
        {status === "demo" && (
          <div className="rounded-xl border border-gold bg-gold-soft p-4" role="status">
            <p>{formCopy.demo}</p>
          </div>
        )}
        {submitting && <span className="sr-only">Enviando consulta…</span>}
      </div>

      <div>
        <InteractiveHoverButton type="submit" disabled={submitting} aria-disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle className="size-4.5 animate-spin" aria-hidden="true" /> Enviando…
            </span>
          ) : (
            "Enviar consulta"
          )}
        </InteractiveHoverButton>
      </div>
    </form>
  );
}
