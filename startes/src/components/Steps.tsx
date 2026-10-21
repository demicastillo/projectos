import { BlurFade } from "./ui/blur-fade";

const steps = [
  {
    title: "Nos escribís",
    text: "Desde el formulario o por WhatsApp. Contás qué querés aprender y, si lo sabés, tu nivel.",
  },
  {
    title: "Conversamos",
    text: "Te respondemos para entender tu objetivo, recomendarte una modalidad y, si querés, coordinar una clase de prueba.",
  },
  {
    title: "Acordamos el comienzo",
    text: "Horarios, duración, precio y primera clase se arreglan por mensaje. Recién ahí te inscribís.",
  },
];

export function Steps({ title = "Cómo se empieza" }: { title?: string }) {
  return (
    <section aria-labelledby="pasos-title" className="container-site py-20 sm:py-28">
      <h2 id="pasos-title" className="font-wide text-[clamp(2rem,4vw,3.25rem)] font-extrabold tracking-tight">
        {title}
      </h2>
      <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {steps.map((s, i) => (
          <li key={s.title}>
            <BlurFade delay={i * 0.12}>
              <div className="flex items-center gap-4">
                <span className="font-wide grid size-12 shrink-0 place-items-center rounded-full bg-gold text-xl font-extrabold text-[#1d1714]">
                  {i + 1}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
              </div>
              <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 max-w-[34ch] text-ink-soft">{s.text}</p>
            </BlurFade>
          </li>
        ))}
      </ol>
    </section>
  );
}
