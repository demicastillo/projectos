# StartEs — dirección visual

Estado: **dirección adoptada: B · Cuaderno** (elegida por el usuario el 30/09/2026, tras descartar A · Afiche). La propuesta «editorial con curvas de marca» de la primera versión quedó rechazada. Los datos de negocio prevalecen sobre cualquier referencia estética.

## Qué se corrige y no debe repetirse

Problemas concretos señalados por el usuario en la primera versión:

- Etiquetas pequeñas («eyebrows») encima de prácticamente todos los títulos. Usar una etiqueta solo cuando aporte información que el título no da.
- Hero de texto a la izquierda y decoración abstracta a la derecha.
- Palabras o últimas líneas coloreadas para crear énfasis automáticamente. El énfasis sale de la composición y la escala.
- Curvas gigantes y etiquetas flotantes sin función clara. Todo recurso gráfico tiene que informar o estructurar.
- Secciones con el mismo ritmo y fondos crema alternados.
- Tarjeta negra redondeada como cierre predecible.

Cambiar fuentes, colores o bordes no resuelve estos problemas: hay que replantear composición, jerarquía y distribución del contenido.

## Dirección adoptada: Cuaderno

El sitio usa los materiales con que se aprende alemán. Referencias y su adaptación: `docs/07_REFERENCIAS_CONSULTADAS.md`. Exploración original de A y B: `design/direcciones/`.

- **Papel**: cuadrícula de 5 mm (20 px; 16 px en móvil) en todo el sitio y un margen rojo vertical, como en los cuadernos escolares alemanes. El contenido empieza a la derecha del margen. La cabecera y el pie son papel liso.
- **Fichas (Karteikarten)**: la superficie común (`.card`) para la ficha del hero, el fichero, la hoja de niveles, las modalidades, la foto, las preguntas, los canales y el formulario. Borde fino, radio 6 px y una sombra suave; algunas fichas llevan un giro leve de menos de 2°.
- **Hero de portada**: una ficha que se da vuelta entre español y alemán («Aprendé alemán» / «Deutsch lernen»). Dos fichas de color asoman detrás con datos reales (A1 → C2, online). Debajo, el texto, las acciones y un resumen de datos.
- **Fichero de objetivos**: pestañas de colores con el recorrido real de cada objetivo («Qué sigue»).
- **Hoja de niveles**: el código de cada nivel va en el margen rojo de la hoja.
- **Convenciones del cuaderno alemán**: los títulos de las páginas internas van subrayados dos veces, y cada página cierra con la doble raya final (*Schlussstrich*) antes de los canales de contacto. Esto reemplaza la tarjeta negra de cierre.
- Sin etiquetas sobre los títulos ni palabras coloreadas. El rojo de marca queda para el margen; el amarillo marca la acción (punto del botón) y la selección.
- Las secciones se separan con una línea de la cuadrícula; no alternan fondos.

## Movimiento adoptado

- Entrada del hero, una vez por carga (menos de 1,6 s en total): se dibuja el margen, llegan las fichas y la ficha principal se da vuelta del alemán al español.
- Ficha del hero: botón «Ver en alemán» / «Ver en español». La ficha se angosta, cambia de cara y se abre (520 ms). El foco pasa al botón de la cara nueva.
- Fichero: el panel entra desde el lado de la pestaña elegida (420 ms). Teclado: flechas, Inicio y Fin.
- Botón: un punto amarillo crece y cubre el botón, la flecha avanza, se hunde al presionar. `:hover` y `:focus-visible` iguales. Deshabilitado sin relleno.
- Apariciones al desplazar de 400 ms y 12 px, sin blur. La doble raya final se traza al aparecer.
- Con movimiento reducido: sin animaciones, la ficha queda en español y todo es visible.

## Color: tokens adoptados

Definidos en `src/app/globals.css`. Validar contrastes reales en cada estado.

| Rol | Claro | Oscuro |
|---|---|---|
| Papel | #FDFDFB | #15171B |
| Cuadrícula / líneas | #DDE6EE / #C9D6E2 | #22262D / #2F353D |
| Margen del cuaderno | #D9534F | #C9443F |
| Ficha | #FFFFFF | #1E2125 |
| Texto principal | #151515 | #F1EEE8 |
| Texto secundario | #4A4845 | #BAB6AE |
| Botón principal | #151515, texto blanco | #F1EEE8, texto oscuro |
| Relleno del botón (hover/foco) | #EABF34 | #EABF34 |
| Fichas de color | amarilla #F7E39A, azul #E4EEF6, rosa #F6E0DC, verde #E5F0E3 | versiones oscuras de cada una |
| Foco | contorno #151515 de 3 px | contorno #EABF34 de 3 px |

El rojo de marca #A11312 queda para el logo y los errores. En oscuro, el logo original se muestra sobre una placa blanca; no se invierten sus colores.

## Tipografía y composición

- Bricolage Grotesque (títulos, peso 750) + Manrope (texto), servidas localmente con licencia OFL y caracteres españoles y alemanes completos.
- Máximo dos familias; servir archivos optimizados localmente cuando sea posible y usar fallbacks métricamente razonables.
- Cuerpo 16–18 px, interlineado generoso; campos de móvil al menos 16 px. Evitar textos esenciales diminutos.
- Titulares fluidos, sin cortar palabras ni diacríticos. El titular del hero vive dentro de la ficha (hasta 132 px).
- Ancho de lectura 55–70 caracteres. Contenedor general aproximado 1200 px. Espaciado basado en múltiplos de 4/8, con densidad ajustada al contenido.
- Radios: 6 px en fichas, 10–12 px en controles y botones.
- No usar sombras si un borde o espacio resuelve mejor la separación. Una familia de iconos coherente; iconos acompañan etiquetas.

## Movimiento

| Interacción | Tratamiento propuesto |
|---|---|
| Hero | Margen que se dibuja, fichas que llegan y ficha que se da vuelta, una vez por carga |
| Secciones | Desplazamiento corto/opacidad de 250–450 ms; evitar retrasos acumulativos |
| Botones | Color, borde o flecha en 120–200 ms; estado equivalente por teclado |
| Navegación móvil | Transición breve, cierre inmediato y gestión de foco |
| Formulario | Estados discretos, sin movimiento que desplace el campo activo |
| Tema oscuro | Cambio breve sin parpadeo inicial ni animación invasiva |

CSS y unas líneas de React; sin motor de animación. No combinar GSAP y Motion para el mismo efecto. Contenido visible si JavaScript falla. Respetar `prefers-reduced-motion`; no bloquear scroll nativo ni sustituir el cursor. Nada importante depende de hover.

## Uso de otras corrientes

Glassmorfismo, neumorfismo, claymorfismo y brutalismo son recursos disponibles. Elegirlos por su función. El neumorfismo debe conservar bordes y foco distinguibles; el claymorfismo puede aparecer en un detalle ilustrativo sin infantilizar toda la academia; el brutalismo necesita una escala legible. No mezclar las cuatro corrientes en la interfaz base.

## Identidad y contenido visual

- Priorizar logo, tipografía, composición propia y gráficos ligeros. Fotografías auténticas solo cuando aporten contexto.
- No inventar retratos de Mariana, aulas presenciales, alumnos ni instalaciones.
- El favicon usa una simplificación reconocible del símbolo, comprobada a 16 y 32 px; no comprimir el wordmark entero hasta volverlo ilegible.
- Open Graph actual: 1200 × 630 con las curvas de la primera versión. Pendiente de rehacer en estilo Cuaderno.
- Testimonios reales se presentan con buena lectura; sin carruseles automáticos que dificulten leerlos.

## Revisión visual obligatoria

Observar capturas reales a 360, 390, 768, 1024 y 1440 px, más algún ancho intermedio. Revisar portada y formulario en ambos temas, teclado, zoom al 200 % y movimiento reducido. Corregir recortes, saltos, ritmos repetitivos, contraste y elementos fijos superpuestos.

No considerar «premium» un resultado por tener muchos efectos. Debe reconocerse StartEs, comprenderse la oferta de inmediato y poder consultarse sin fricción.
