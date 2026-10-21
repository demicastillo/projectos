# StartEs — dirección visual

Estado: **dirección adoptada: Escalera** (rediseño completo pedido por el usuario el 21/10/2026, con la consigna «hacé un diseño coherente» y usando componentes reales de las librerías de `docs/03`). Reemplaza a Cuaderno (30/09/2026), que el usuario consideró poco profesional, y a la propuesta Reclam, rechazada. Los datos de negocio prevalecen sobre cualquier referencia estética.

## Qué se corrige y no debe repetirse

Problemas concretos señalados por el usuario en la primera versión:

- Etiquetas pequeñas («eyebrows») encima de prácticamente todos los títulos. Usar una etiqueta solo cuando aporte información que el título no da.
- Hero de texto a la izquierda y decoración abstracta a la derecha.
- Palabras o últimas líneas coloreadas para crear énfasis automáticamente. El énfasis sale de la composición y la escala.
- Curvas gigantes y etiquetas flotantes sin función clara. Todo recurso gráfico tiene que informar o estructurar.
- Secciones con el mismo ritmo y fondos crema alternados.
- Tarjeta negra redondeada como cierre predecible.

Y de las versiones siguientes (21/10/2026):

- Cuaderno: cuadrícula escolar en todo el sitio, fichas giradas, tarjetas con sombra repetidas, tipografías genéricas, marca casi ausente. Se veía poco profesional.
- Reclam (tapa amarilla con marco y serif): «se ve extremadamente raro».
- Componentes reescritos a mano: el usuario pidió usar los componentes reales de las librerías de `docs/03`.

Cambiar fuentes, colores o bordes no resuelve estos problemas: hay que replantear composición, jerarquía y distribución del contenido.


## Dirección adoptada: Escalera

La idea es una sola: aprender alemán es subir del 0 al C2. La marca ya la trae: el logo son tres trayectorias negras, rojas y doradas que despegan, y el logotipo «START ES!» es una palo seco ancha y pesada.

- **Lo memorable (un solo lugar):** la escalera de niveles del hero de la portada. Siete columnas que suben del 0 al C2; la persona marca dónde está, la columna se pinta de rojo, un punto dorado se desplaza hasta ella y el botón pasa a «Consultar desde B1». El formulario recibe el nivel (`?nivel=`). Es un selector real (radios nativos), no decoración.
- **Todo lo demás es tranquilo:** blanco, tinta, una línea fina para separar, titulares anchos y mucho aire. El rojo de marca se reserva para la acción principal y el cierre.
- **Ritmo de secciones (portada):** hero blanco con la escalera, franja oscura de exámenes, objetivos en pestañas, modalidades en un panel piedra (no a todo el ancho), pasos numerados (son una secuencia real), la academia con la foto real, preguntas en acordeón y el cierre en una franja roja a todo el ancho. Ningún fondo se alterna por costumbre.
- **Páginas internas:** titular ancho, bajada y acción; luego contenido propio de cada página (lista de niveles que avanza como la escalera, exámenes en grande sobre fondo oscuro, español en dos columnas español/alemán) y el mismo cierre rojo.
- **Sin**: etiquetas sobre los títulos, mayúsculas en etiquetas, palabras coloreadas, flechas pegadas al texto, cadenas con puntos medios, tarjetas iguales con sombra, fondos decorativos.

## Componentes de librerías

Copiados del código fuente (no de memoria) y adaptados; cada archivo conserva el aviso de licencia. Detalle y motivos en `docs/07_REFERENCIAS_CONSULTADAS.md`.

| Componente | Librería (licencia) | Dónde |
|---|---|---|
| Interactive Hover Button | Magic UI (MIT) | todos los botones principales; también como enlace |
| Marquee | Magic UI (MIT) | franja de exámenes de la portada |
| Text Animate | Magic UI (MIT) | titular del cierre rojo, una vez al aparecer |
| Blur Fade | Magic UI (MIT) | solo los tres pasos de «Cómo se empieza» |
| Direction Aware Tabs | Cult UI (MIT) | «¿Qué querés lograr?» |
| Accordion | shadcn/ui sobre Radix (MIT) | preguntas frecuentes |

Base: Tailwind CSS 4, Motion (un solo motor de animación, cargado con `LazyMotion` para no demorar el primer pintado), iconos Lucide (ISC). Se descartaron fondos decorativos (grillas, partículas, haces) y el botón neumórfico.

## Color: tokens adoptados

Definidos en `src/app/globals.css` como variables y expuestos a Tailwind con `@theme` (`bg-paper`, `text-ink`, `bg-brand`…). Los nombres de shadcn (`primary`, `border`, `ring`) apuntan a los mismos valores.

| Rol | Claro | Oscuro |
|---|---|---|
| Papel (fondo) | #FFFFFF | #151110 |
| Piedra (panel) | #F5F1EE | #201A18 |
| Línea | #E6DFDA | #352D2A |
| Tinta (texto) | #1D1714 | #F4EEE9 |
| Texto secundario | #5C524C | #B9AEA7 |
| Marca (botón, cierre) | #A11312, texto blanco | #B81F1B, texto blanco |
| Texto en rojo | #A11312 | #F08077 |
| Oro (punto, relleno al pasar, selección) | #EABF34 | #EABF34 |
| Noche (franja de exámenes) | #1D1714 | #0C0908 |
| Foco | contorno #1D1714 de 3 px | contorno #EABF34 de 3 px |

En oscuro, el logo original va sobre una placa blanca; no se invierten sus colores.

## Tipografía y composición

- Una sola familia: **Archivo** (OFL), variable en peso y ancho, recortada por `scripts/subset-font.py` (peso 400–800, ancho 70–116, latín y Latin-1) y servida desde `public/fonts/` con precarga.
- Titulares: ancho 116 (`font-wide`), peso 800, interletrado negativo; replican el logotipo. Exámenes: ancho 70 (`font-condensed`), como señalética. Texto: ancho normal, 17–20 px, interlineado 1,6.
- Contenedor de 76 rem con márgenes de 20/32 px. Texto corrido de 40–60 caracteres. Todo alineado a la izquierda.
- Radios por jerarquía: botones y pestañas en píldora; paneles y foto 20 px; campos 12 px.

## Movimiento adoptado

- Hero: las columnas de la escalera suben una vez al cargar (CSS, 0,7 s escalonado). El punto dorado se mueve con resorte al elegir un nivel (Motion, `layoutId`). El titular no se anima: es el LCP.
- Botones: el punto dorado crece y cubre el botón; el texto sale y entra con una flecha. Igual con foco de teclado.
- Pestañas: el panel entra desde el lado de la pestaña elegida; la burbuja se desliza. Flechas, Inicio y Fin.
- Franja de exámenes: desfile continuo, se pausa al pasar el mouse.
- Acordeón: altura animada al abrir y cerrar.
- Cierre: el titular entra palabra por palabra una vez.
- Con movimiento reducido: nada se desplaza; el desfile se convierte en una lista quieta; todo es visible. Sin JavaScript, todo el contenido se ve.

## Uso de otras corrientes

Glassmorfismo, neumorfismo, claymorfismo y brutalismo son recursos disponibles. Elegirlos por su función. El neumorfismo debe conservar bordes y foco distinguibles; el claymorfismo puede aparecer en un detalle ilustrativo sin infantilizar toda la academia; el brutalismo necesita una escala legible. No mezclar las cuatro corrientes en la interfaz base.

## Identidad y contenido visual

- Priorizar logo, tipografía, composición propia y gráficos ligeros. Fotografías auténticas solo cuando aporten contexto.
- No inventar retratos de Mariana, aulas presenciales, alumnos ni instalaciones.
- El favicon usa una simplificación reconocible del símbolo, comprobada a 16 y 32 px; no comprimir el wordmark entero hasta volverlo ilegible.
- Open Graph: 1200 × 630 con el titular y la escalera, generado con `scripts/build-og.mjs`.
- Testimonios reales se presentan con buena lectura; sin carruseles automáticos que dificulten leerlos.

## Revisión visual obligatoria

Observar capturas reales a 360, 390, 768, 1024 y 1440 px, más algún ancho intermedio. Revisar portada y formulario en ambos temas, teclado, zoom al 200 % y movimiento reducido. Corregir recortes, saltos, ritmos repetitivos, contraste y elementos fijos superpuestos.

No considerar «premium» un resultado por tener muchos efectos. Debe reconocerse StartEs, comprenderse la oferta de inmediato y poder consultarse sin fricción.
