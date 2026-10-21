# Referencias consultadas para la revisión de dirección artística

Fecha: 30/09/2026. Registro previo a implementar las dos direcciones de `design/direcciones/`.

## Cómo se consultaron (límite importante)

La red de este entorno bloquea `styles.refero.design`, `magicui.design`, `cult-ui.com`, `gsap.com`, `uiverse.io` y `awwwards.com` para el navegador y la terminal (el proxy responde 403). Por eso:

- El **texto** de las páginas se leyó con una herramienta de lectura web que no pasa por ese proxy. No es un navegador: no ejecuta las demos.
- El **código fuente** de los componentes se leyó desde sus repositorios públicos en `raw.githubusercontent.com`, que sí está permitido.
- **No se observó ninguna animación ni demo en vivo** de estas referencias. Todo lo que se dice sobre su movimiento sale del código o de la documentación.

Para ver las demos hace falta permitir esos dominios en la configuración de red del entorno del proyecto. Sin eso, el comportamiento de cada interacción se verificó únicamente en la implementación propia de StartEs.

## Composición

### C1 — Figma en Refero (R02)
- **URL:** https://styles.refero.design/style/5fd3b3b4-02ab-456a-87aa-e4395636b671
- **Principio tomado:** un solo color saturado para la acción principal por pantalla, y la jerarquía por escala y peso tipográfico en lugar de por color. El análisis lo resume como color «como puntuación funcional».
- **Dónde:** dirección A (afiche). El rojo ocupa un único campo por pantalla: el bloque de consulta del hero. El resto es negro sobre blanco. Se eliminan las palabras coloreadas automáticamente dentro de los títulos.
- **Adaptación:** el rojo de marca `#A11312` reemplaza al índigo. El amarillo queda para una sola marca informativa (la escala de niveles). En móvil, el bloque rojo pasa a ancho completo debajo del titular. El foco usa contorno negro de 3 px, no depende del color.
- **Código:** no se reutiliza código.

### C2 — Slush en Refero (R03), usada con cautela
- **URL:** https://styles.refero.design/style/8b6b547f-a357-4f1b-9842-4579c62dd42b
- **Principio tomado:** la tipografía de display tratada como objeto gráfico («esculturas, no frases»), con interlineado muy cerrado, en vez de un titular con una decoración al lado.
- **Dónde:** dirección A. El titular es la composición del hero. No hay ilustración a la derecha.
- **Adaptación:** sin cintas 3D, stickers ni paleta arcoíris. Tamaño máximo limitado para que el titular no se corte a 360 px. El texto sigue siendo seleccionable y el `h1` es real.
- **Código:** no se reutiliza código.

### Descartada como base — ElevenLabs en Refero (R01)
- **URL:** https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26
- **Motivo:** su sistema (lienzo cálido casi acromático, fondos alternados crema y taupe, hero asimétrico texto/visual) es justamente el esquema que la propuesta anterior reprodujo y que se corrige ahora.

## Interacción

### I1 — Interactive Hover Button, Magic UI (R04)
- **URLs:** https://magicui.design/docs/components/interactive-hover-button · código: https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/registry/magicui/interactive-hover-button.tsx · licencia: https://raw.githubusercontent.com/magicuidesign/magicui/main/LICENSE.md
- **Qué hace según el código:** un punto de color crece (`scale`) hasta cubrir el botón y una segunda copia del texto entra con una flecha.
- **Principio tomado:** el relleno que nace de un punto y la flecha que entra.
- **Dónde:** botones principales de ambas direcciones.
- **Adaptación:** el original duplica la etiqueta dentro del botón. Aquí hay una sola etiqueta, así que el lector de pantalla no la lee dos veces. Mismo estado para `:hover` y `:focus-visible`; `:active` con leve hundimiento; en táctil no hace falta el hover para entender el botón. Con movimiento reducido el cambio es instantáneo.
- **Licencia y dependencias:** MIT (Magic UI). El original usa Tailwind y `lucide-react`. No se copia su código: se reescribe en CSS propio sin dependencias. Si más adelante se copia literalmente, conservar el aviso MIT.

### I2 — Direction Aware Tabs, Cult UI (R06)
- **URLs:** https://www.cult-ui.com/docs/components/direction-aware-tabs · código: https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/registry/default/ui/direction-aware-tabs.tsx · licencia: https://raw.githubusercontent.com/nolly-studio/cult-ui/main/LICENSE.md
- **Qué hace según el código:** calcula si la pestaña nueva está a la derecha o a la izquierda y desliza el contenido en esa dirección, con la altura animada.
- **Principio tomado:** el contenido entra desde el lado de la pestaña elegida, así la persona entiende hacia dónde se movió.
- **Dónde:** dirección B, sección «¿Qué querés lograr?» (pestañas de fichero).
- **Adaptación:** el original no tiene `role="tablist"`/`tab`/`tabpanel` ni navegación con flechas; se agregan. Desplazamiento de 40 px en lugar de 300 px y sin blur. En móvil las pestañas pasan a una cuadrícula de 2×2. Con movimiento reducido el cambio es inmediato.
- **Licencia y dependencias:** MIT (Jordan Gilliam, 2023). El original usa `motion/react` y `react-use-measure`. No se copia código: se reescribe con CSS y unas líneas de JavaScript sin dependencias.

### I3 — SplitText, GSAP (R08)
- **URLs:** https://gsap.com/docs/v3/Plugins/SplitText/ · licencia: https://gsap.com/standard-license
- **Principio tomado:** revelar el titular por líneas con una máscara (`mask`), y mantener el texto accesible (SplitText pone `aria-label` en el padre y oculta los fragmentos).
- **Dónde:** entrada del hero en ambas direcciones.
- **Adaptación:** los titulares tienen cortes de línea definidos por diseño, así que la máscara se resuelve con CSS (`overflow: clip` por línea) sin partir el texto con JavaScript ni duplicarlo. Si más adelante hace falta partir textos largos que cambian de ancho, SplitText con `autoSplit` es la opción documentada.
- **Licencia y dependencias:** hoy no se usa GSAP. Su licencia estándar es gratuita para uso comercial, incluido SplitText, con una única prohibición: herramientas que compitan con el constructor visual de Webflow. No afecta a StartEs.

### I4 — Blur Fade, Magic UI (R05), solo como criterio
- **URL:** código: https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/registry/magicui/blur-fade.tsx
- **Principio tomado:** entrada breve (400 ms, 6 px) una sola vez por elemento.
- **Adaptación:** sin `filter: blur` (costoso y reduce legibilidad durante la transición). El contenido está visible si el script no corre.

## Rediseño completo (21/10/2026)

El usuario pidió rehacer el sitio porque no se veía profesional y eligió «Rediseño completo». Referencias de esta etapa:

### C3 — Tapas amarillas de Reclam Universal-Bibliothek
- **URLs:** https://en.wikipedia.org/wiki/Reclam · https://fontsinuse.com/uses/48109/reclam-universal-bibliothek-1988-2012
- **Qué dicen:** los «librillos amarillos» de Reclam son ediciones económicas de clásicos para escuelas y universidades; tapa amarilla desde 1970 y Stempel Garamond como tipografía de la serie (rediseño de Brigitte y Hans Peter Willberg, 1988).
- **Principio tomado:** la tapa amarilla con marco negro fino y título en serif, un objeto que cualquier estudiante de alemán reconoce. El amarillo de la marca (#EABF34) ocupa ese lugar.
- **Dónde:** hero de la portada (la «tapa») y la sección de niveles (un estante de cuadernillos que engrosan con el nivel).
- **Adaptación:** no se copia ninguna tapa, logotipo ni marca de Reclam. Serif Literata (OFL) en lugar de Garamond; el marco se dibuja con CSS.
- **Licencia y dependencias:** sin código ni imágenes de terceros.

### Guías aplicadas en la auditoría
- **Web Interface Guidelines** (Vercel, MIT): https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
- **Frontend Design** (Anthropic): señales de diseño genérico que se evitan (eyebrows, mayúsculas en etiquetas, palabras resaltadas, tarjetas idénticas con sombra).

## Rediseño Escalera (21/10/2026)

El usuario rechazó Reclam y pidió usar los componentes reales de las librerías que había enviado (R05 y siguientes en `docs/03`), con criterio profesional y un diseño coherente. Las páginas de demostración (magicui.design, cult-ui.com, ui.aceternity.com, ui.watermelon.sh, uiverse.io, reactbits.dev) están bloqueadas por la red de este entorno: se leyó el código fuente en GitHub y **no se vieron las demos en movimiento**. Lo que se describe es lo que hace el código.

### E1 — Interactive Hover Button (Magic UI)
- **URL:** https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/registry/magicui/interactive-hover-button.tsx
- **Principio tomado:** un punto que crece hasta cubrir el botón y un texto que se desplaza dejando paso a la versión con flecha.
- **Dónde:** todos los botones principales (`src/components/ui/interactive-hover-button.tsx`).
- **Adaptación:** punto dorado sobre rojo de marca; variante enlace (Next `Link`); el mismo efecto con foco de teclado; 48 px de alto; la copia con flecha es `aria-hidden`.
- **Licencia:** MIT, © Magic UI.

### E2 — Marquee (Magic UI)
- **URL:** https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/registry/magicui/marquee.tsx
- **Principio tomado:** fila repetida que se desplaza en bucle con CSS.
- **Dónde:** franja de exámenes de la portada (`ExamBand`).
- **Adaptación:** copias repetidas ocultas a lectores de pantalla; con movimiento reducido queda una sola fila quieta que se ajusta en varias líneas; se pausa al pasar el mouse.
- **Licencia:** MIT, © Magic UI.

### E3 — Text Animate y Blur Fade (Magic UI)
- **URLs:** https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/registry/magicui/text-animate.tsx · https://raw.githubusercontent.com/magicuidesign/magicui/main/apps/www/registry/magicui/blur-fade.tsx
- **Principio tomado:** entrada palabra por palabra con desenfoque; aparición breve al entrar en pantalla.
- **Dónde:** Text Animate solo en el titular del cierre rojo; Blur Fade solo en los tres pasos de «Cómo se empieza» (una secuencia real). No en cada sección.
- **Adaptación:** el texto se ve quieto hasta hidratar y con movimiento reducido; Blur Fade solo se arma si el bloque está fuera de pantalla al cargar, así nada visible desaparece; se quitó el `aria-label` duplicado; los espacios entre palabras quedan como texto normal para que ninguna línea empiece con un espacio.
- **Licencia:** MIT, © Magic UI.

### E4 — Direction Aware Tabs (Cult UI)
- **URL:** https://raw.githubusercontent.com/nolly-studio/cult-ui/main/apps/www/registry/default/ui/direction-aware-tabs.tsx
- **Principio tomado:** el panel entra desde el lado de la pestaña elegida y la burbuja se desliza entre pestañas.
- **Dónde:** «¿Qué querés lograr?» de la portada (`GoalTabs`).
- **Adaptación:** semántica `tablist`/`tab`/`tabpanel`, flechas, Inicio y Fin; colores de marca; desplazamiento lateral menor (120 px); sin movimiento con movimiento reducido; la pestaña elegida se lleva a la vista en celulares.
- **Licencia:** MIT, © 2023 Jordan-Gilliam.

### E5 — Accordion (shadcn/ui sobre Radix)
- **URL:** https://github.com/shadcn-ui/ui (componente `accordion`, estilo new-york)
- **Dónde:** preguntas frecuentes.
- **Adaptación:** signo más que gira y se pinta de oro al abrir; tipografía y líneas del sitio. Las respuestas también van en los datos estructurados `FAQPage`.
- **Licencia:** MIT (shadcn/ui y Radix UI).

### Evaluados y no usados
- **Aceternity UI** (Sticky Scroll Reveal, Timeline): licencia propia que permite sitios de clientes; su código no está en un repositorio público accesible desde aquí y la demo está bloqueada. Los pasos se resolvieron con Blur Fade.
- **Watermelon UI**: bloques de testimonios y pie. Sin testimonios reales todavía, no se usa; el pie se hizo con la misma grilla del sitio.
- **Number Ticker** (Magic UI): descartado; las cifras animadas son el recurso genérico que se evita y solo hay un dato real (más de ocho años de experiencia).
- **React Bits, Uiverse, Embla**: reservados. Embla servirá para un carrusel de testimonios reales, con controles manuales.
- **Neumorph button, fondos decorativos** (grillas, partículas, haces): descartados por decorar sin informar.

### Tipografía
- **Archivo** (Omnibus-Type, OFL): https://github.com/Omnibus-Type/Archivo. Variable en ancho: el ancho 116 replica el logotipo «START ES!» y el 70 da la voz de señalética de la franja de exámenes. Una sola familia en todo el sitio.
