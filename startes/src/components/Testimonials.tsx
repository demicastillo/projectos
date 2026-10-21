import { testimonials } from "@/content/site";

// Se muestra solo si hay opiniones reales cargadas en src/content/site.ts.
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-labelledby="opiniones-title" className="container-site pb-20 sm:pb-28">
      <h2 id="opiniones-title" className="font-wide text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight">
        Lo que cuentan quienes estudian en StartEs
      </h2>
      <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {testimonials.map((t) => (
          <li key={t.name + t.quote.slice(0, 20)} className="border-t-2 border-gold pt-6">
            <figure>
              <blockquote className="text-xl leading-snug font-medium">«{t.quote}»</blockquote>
              <figcaption className="mt-4 text-ink-soft">
                <span className="font-semibold text-ink">{t.name}</span>
                {t.detail && <span>, {t.detail}</span>}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
