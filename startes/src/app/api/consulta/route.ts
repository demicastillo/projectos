import { NextResponse } from "next/server";
import { normalize, validate } from "@/lib/contact/validation";
import { sendConsulta } from "@/lib/contact/service";

// Protección básica en memoria (por instancia). En producción conviene un límite
// compartido (por ejemplo en el proveedor de alojamiento) además de este.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
const recent = new Map<string, number>();

function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: "invalid", errors: {} }, { status: 400 });
  }

  // Campo trampa: las personas no lo ven; si viene completo, se descarta en silencio.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ status: "ignored" }, { status: 202 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ status: "rate_limited" }, { status: 429 });
  }

  const input = normalize(body);
  const errors = validate(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ status: "invalid", errors }, { status: 422 });
  }

  // Evita duplicados por doble envío o reintento: mismo contenido en 2 minutos.
  const idem = typeof body.requestId === "string" ? body.requestId.slice(0, 64) : "";
  const key = idem || `${input.email}|${input.interest}|${input.message}`;
  const prev = recent.get(key);
  if (prev && Date.now() - prev < 2 * 60 * 1000) {
    return NextResponse.json({ status: "sent", duplicate: true }, { status: 200 });
  }

  const result = await sendConsulta(input);
  if (result.status === "sent") recent.set(key, Date.now());

  const code = { sent: 200, demo: 200, unavailable: 503, failed: 502 }[result.status];
  return NextResponse.json({ status: result.status }, { status: code });
}
