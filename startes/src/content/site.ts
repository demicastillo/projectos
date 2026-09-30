// Datos y textos centralizados del sitio. Cambiar aquí los contactos o textos
// evita discrepancias entre páginas y facilita una futura traducción.

export const site = {
  name: "StartEs",
  description:
    "Academia online de idiomas: alemán desde cero hasta C2, clases individuales y grupales, preparación de exámenes y español para germanoparlantes.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, ""),
  locale: "es",
};

export const contact = {
  email: "masgoret555@gmail.com",
  whatsappDisplay: "+54 9 3515 22-9718",
  whatsappUrl: "https://wa.me/5493515229718",
  instagramHandle: "@start.es",
  instagramUrl: "https://www.instagram.com/start.es/",
};

export const nav = [
  { href: "/aleman", label: "Clases" },
  { href: "/examenes", label: "Exámenes" },
  { href: "/#academia", label: "La academia" },
  { href: "/contacto", label: "Contacto" },
];

export const levels = [
  { code: "0", name: "Desde cero", text: "Tus primeras palabras, sin conocimientos previos." },
  { code: "A1", name: "Inicial", text: "Presentarte y manejar situaciones cotidianas simples." },
  { code: "A2", name: "Básico", text: "Hablar de tu entorno, planes y experiencias." },
  { code: "B1", name: "Intermedio", text: "Desenvolverte con más autonomía en viajes, trabajo o estudio." },
  { code: "B2", name: "Intermedio alto", text: "Argumentar, comprender textos extensos y conversar con fluidez." },
  { code: "C1", name: "Avanzado", text: "Usar el idioma con precisión en contextos académicos y profesionales." },
  { code: "C2", name: "Maestría", text: "Afinar matices, registro y expresión cercana a la de un hablante nativo." },
];

export type Interest = "aleman" | "examen" | "espanol" | "orientacion";

export const interestOptions: { value: Interest; label: string }[] = [
  { value: "aleman", label: "Clases de alemán" },
  { value: "examen", label: "Preparación de examen" },
  { value: "espanol", label: "Clases de español" },
  { value: "orientacion", label: "Necesito orientación" },
];

export const levelOptions = ["Desde cero", "A1", "A2", "B1", "B2", "C1", "C2", "No sé mi nivel"];

export const modalityOptions = ["Individual", "Grupal", "Quiero orientación"];

export const goals = [
  {
    title: "Quiero empezar",
    text: "Nunca estudiaste alemán o lo dejaste hace mucho. Empezamos desde tus primeras palabras.",
    href: "/aleman",
    cta: "Ver clases de alemán",
  },
  {
    title: "Quiero seguir aprendiendo",
    text: "Ya tenés una base y querés avanzar de nivel, ganar fluidez o retomar con constancia.",
    href: "/aleman#niveles",
    cta: "Ver niveles",
  },
  {
    title: "Quiero preparar un examen",
    text: "Tenés un examen de alemán por delante y querés prepararlo con acompañamiento.",
    href: "/examenes",
    cta: "Ver preparación de exámenes",
  },
  {
    title: "Quiero aprender español",
    text: "Hablás alemán y querés aprender o mejorar tu español. Ich möchte Spanisch lernen.",
    href: "/espanol",
    cta: "Ver clases de español",
  },
];

export const faqs = [
  {
    q: "¿Las clases son online?",
    a: "Sí. Todas las clases de StartEs son online, así que podés tomarlas desde donde estés.",
  },
  {
    q: "¿Puedo empezar sin saber nada de alemán?",
    a: "Sí. Hay clases desde cero, pensadas para dar los primeros pasos con confianza.",
  },
  {
    q: "No sé qué nivel tengo. ¿Qué hago?",
    a: "Elegí «No sé mi nivel» en el formulario o contalo en tu mensaje. Lo conversamos y te orientamos antes de empezar.",
  },
  {
    q: "¿Qué diferencia hay entre clases individuales y grupales?",
    a: "Las individuales se enfocan por completo en tu objetivo y tu ritmo. Las grupales suman la práctica con otras personas. Contanos qué buscás y te ayudamos a elegir.",
  },
  {
    q: "¿Preparan exámenes de alemán?",
    a: "Sí. En la consulta podés indicar qué examen querés rendir, o si todavía no lo sabés, y conversamos cómo prepararlo.",
  },
  {
    q: "¿Dónde veo horarios y precios?",
    a: "Horarios, duración y precios se conversan después de tu consulta, por mensaje, según tu objetivo y la modalidad que elijas.",
  },
  {
    q: "¿Enviar la consulta me inscribe?",
    a: "No. La consulta es solo un primer contacto. La inscripción y el comienzo se acuerdan después, por mensaje.",
  },
];

export const formCopy = {
  intro: "Contanos qué querés aprender. Desde StartEs vamos a contactarte para conversar sobre las clases.",
  success:
    "Recibimos tu consulta. Vamos a contactarte para conversar sobre tu objetivo y las opciones de clases. El envío no confirma una inscripción.",
  error:
    "No pudimos enviar tu consulta. Conservamos lo que escribiste para que puedas intentarlo de nuevo. También podés contactarnos por WhatsApp.",
  unavailable:
    "El envío de consultas desde la web todavía no está activo. Conservamos lo que escribiste. Mientras tanto, podés escribirnos por WhatsApp o correo.",
  demo: "Modo demostración: la consulta pasó la validación, pero no se guardó ni se envió a nadie.",
};
