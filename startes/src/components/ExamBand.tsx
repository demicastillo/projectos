import Link from "next/link";
import { Marquee } from "./ui/marquee";

const exams = ["Goethe-Zertifikat", "telc Deutsch", "ÖSD", "TestDaF", "DSH"];

// Franja de exámenes: nombres reales de las familias de exámenes que se preparan.
export function ExamBand() {
  return (
    <section aria-labelledby="examenes-franja" className="overflow-hidden bg-night py-16 text-night-ink sm:py-20">
      <div className="container-site flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="examenes-franja" className="font-wide max-w-[20ch] text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold tracking-tight">
          Preparación de exámenes de alemán
        </h2>
        <Link
          href="/examenes"
          className="self-start font-semibold text-night-ink underline decoration-gold decoration-2 underline-offset-6 sm:self-auto"
        >
          Ver cómo los preparamos
        </Link>
      </div>
      <Marquee pauseOnHover repeat={3} className="mt-10 [--duration:36s] [--gap:2.5rem] motion-reduce:container-site" aria-label="Exámenes que se preparan">
        {exams.map((e) => (
          <span key={e} lang={e === "ÖSD" || e === "DSH" || e === "TestDaF" ? undefined : "de"} className="flex items-center gap-10">
            <span className="font-condensed text-[clamp(3rem,8vw,6.5rem)] leading-none font-extrabold tracking-tight">{e}</span>
            <span aria-hidden="true" className="size-3 rounded-full bg-gold" />
          </span>
        ))}
      </Marquee>
      <p className="container-site mt-10 max-w-3xl text-night-soft">
        StartEs prepara para rendir: no es centro examinador ni emite certificados oficiales.
      </p>
    </section>
  );
}
