# StartEs — dirección visual inicial

> **Adoptado el 30/09/2026:** dirección 1 (editorial con movimiento). Tokens reales en `src/app/globals.css`. Diferencias con la propuesta: en tema oscuro el rojo de texto y acentos es `#E0514F` (el `#A11312` no es legible sobre fondo oscuro); cabecera con fondo sólido; animaciones solo con CSS (sin GSAP). Comparación de las tres direcciones en `design/exploracion/comparacion.png`.

Estado: propuesta concreta para iniciar exploración, no diseño ya aprobado ni maqueta final. Los datos de negocio prevalecen sobre cualquier referencia estética.

## Concepto recomendado

Una academia contemporánea con ritmo editorial y un gesto gráfico continuo inspirado en las curvas del logo. El idioma se presenta como algo que se usa y se incorpora a la vida. La composición debe sentirse intencional, cercana y adulta sin excluir edades.

Comenzar con una portada asimétrica: texto dominante a la izquierda, composición de curvas y palabras breves a la derecha, seguida por una lista de objetivos con divisores y numeración discreta. Alternar una comparación compacta, un bloque institucional y un cierre de contacto. No repetir tarjetas de tres columnas en todas las secciones.

El logo original se conserva. Las curvas decorativas son nuevas piezas inspiradas en su gesto, no un redibujo automático que cambie la marca. Se pueden construir con SVG/CSS; evitar un vídeo de fondo pesado como requisito visual.

## Exploración acotada

Crear tres variantes pequeñas del mismo hero y primera sección, con contenido real y vista móvil:

1. **Editorial con movimiento (recomendada):** papel cálido, tipografía expresiva y curvas de marca; estructura despejada.
2. **Geometría con contraste:** composición de bloques, bordes precisos, rojo y negro; neobrutalismo moderado sin agresividad tipográfica.
3. **Capas ligeras:** base clara con transparencias puntuales y profundidad; glassmorfismo contenido con alternativas de alto contraste.

Recomendar una con razones ligadas al público y al contenido. Si el usuario no elige otra, avanzar con la primera. No desarrollar tres sitios completos. El usuario puede revisar resultados; no necesita buscar referencias.

## Color: propuesta de tokens

Valores de partida compatibles con el logo; ajustar a partir de inspección y pruebas de contraste. No tratarlos como un manual oficial preexistente.

| Rol | Claro | Oscuro |
|---|---|---|
| Fondo | #FAF8F3 | #171716 |
| Superficie | #FFFFFF | #242321 |
| Texto principal | #171717 | #F7F4EC |
| Texto secundario | #57534E | #C8C2B7 |
| Marca roja | #A11312 | #A11312 |
| Acción principal | #A11312 con texto blanco | #EABF34 con texto oscuro |
| Acento dorado | #EABF34 | #EABF34 |
| Separadores | #D9D3C9 | #49443C |

Rojo es el color principal de marca; el tema oscuro puede asignar otro relleno a la acción para asegurar legibilidad. Negro estructura. Amarillo señala detalles. Evitar franjas de bandera como plantilla repetida. Validar contrastes reales en cada estado, no asumirlos por esta tabla.

En oscuro, mostrar el logo original en una superficie clara discreta hasta contar con una variante oficial. No invertir todos los píxeles con filtros que cambien rojo/amarillo.

## Tipografía y composición

- Primera pareja a evaluar: Bricolage Grotesque para titulares y Manrope para cuerpo/UI. Son candidatas; verificar licencia, caracteres españoles/alemanes y archivos antes de incorporar.
- Máximo dos familias; servir archivos optimizados localmente cuando sea posible y usar fallbacks métricamente razonables.
- Cuerpo 16–18 px, interlineado generoso; campos de móvil al menos 16 px. Evitar textos esenciales diminutos.
- Titulares fluidos: aproximadamente 40–76 px según ancho y longitud, sin cortar palabras o diacríticos.
- Ancho de lectura 55–70 caracteres. Contenedor general aproximado 1200 px. Espaciado basado en múltiplos de 4/8, con densidad ajustada al contenido.
- Radios moderados: 8–12 px en controles; superficies especiales 16–24 px. No hacer todo redondo por defecto.
- No usar sombras si un borde o espacio resuelve mejor la separación. Una familia de iconos coherente; iconos acompañan etiquetas.

## Movimiento

| Interacción | Tratamiento propuesto |
|---|---|
| Hero | Entrada de título por líneas y un gesto de curva de 600–900 ms, una vez por carga |
| Secciones | Desplazamiento corto/opacidad de 250–450 ms; evitar retrasos acumulativos |
| Botones | Color, borde o flecha en 120–200 ms; estado equivalente por teclado |
| Navegación móvil | Transición breve, cierre inmediato y gestión de foco |
| Formulario | Estados discretos, sin movimiento que desplace el campo activo |
| Tema oscuro | Cambio breve sin parpadeo inicial ni animación invasiva |

CSS para interacciones simples; un motor de animación principal si hace falta (GSAP es el candidato inicial). No combinar GSAP y Motion para el mismo efecto. Contenido visible si JavaScript falla. Respetar `prefers-reduced-motion`; no bloquear scroll nativo ni sustituir el cursor. Nada importante depende de hover.

## Uso de otras corrientes

Glassmorfismo, neumorfismo, claymorfismo y brutalismo son recursos disponibles. Elegirlos por su función. El neumorfismo debe conservar bordes y foco distinguibles; el claymorfismo puede aparecer en un detalle ilustrativo sin infantilizar toda la academia; el brutalismo necesita una escala legible. No mezclar las cuatro corrientes en la interfaz base.

## Identidad y contenido visual

- Priorizar logo, tipografía, composición propia y gráficos ligeros. Fotografías auténticas solo cuando aporten contexto.
- No inventar retratos de Mariana, aulas presenciales, alumnos ni instalaciones.
- El favicon usa una simplificación reconocible del símbolo, comprobada a 16 y 32 px; no comprimir el wordmark entero hasta volverlo ilegible.
- Open Graph propuesto: 1200 × 630, StartEs, servicio claro y curvas de marca dentro de márgenes amplios. Comprobar recortes al compartir.
- Testimonios reales se presentan con buena lectura; sin carruseles automáticos que dificulten leerlos.

## Revisión visual obligatoria

Observar capturas reales a 360, 390, 768, 1024 y 1440 px, más algún ancho intermedio. Revisar portada y formulario en ambos temas, teclado, zoom al 200 % y movimiento reducido. Corregir recortes, saltos, ritmos repetitivos, contraste y elementos fijos superpuestos.

No considerar «premium» un resultado por tener muchos efectos. Debe reconocerse StartEs, comprenderse la oferta de inmediato y poder consultarse sin fricción.
