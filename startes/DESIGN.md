# StartEs — dirección visual inicial

Estado: **dirección artística en revisión** (corrección del usuario, 30/09/2026). La propuesta «editorial con curvas de marca» implementada en la primera versión **no está aprobada** y no debe extenderse. Los datos de negocio prevalecen sobre cualquier referencia estética.

## Qué se corrige y no debe repetirse

Problemas concretos señalados por el usuario en la primera versión:

- Etiquetas pequeñas («eyebrows») encima de prácticamente todos los títulos. Usar una etiqueta solo cuando aporte información que el título no da.
- Hero de texto a la izquierda y decoración abstracta a la derecha.
- Palabras o últimas líneas coloreadas para crear énfasis automáticamente. El énfasis sale de la composición y la escala.
- Curvas gigantes y etiquetas flotantes sin función clara. Todo recurso gráfico tiene que informar o estructurar.
- Secciones con el mismo ritmo y fondos crema alternados.
- Tarjeta negra redondeada como cierre predecible.

Cambiar fuentes, colores o bordes no resuelve estos problemas: hay que replantear composición, jerarquía y distribución del contenido.

## Exploración en curso

Dos direcciones visualmente distintas, con el mismo contenido real, limitadas a navegación, hero y una segunda sección (`design/direcciones/`). Referencias consultadas y su adaptación: `docs/07_REFERENCIAS_CONSULTADAS.md`.

1. **Afiche** (candidata inicial del usuario): composición de afiche contemporáneo de academia de idiomas. El titular es la estructura del hero; grilla visible; un único campo rojo para la consulta; la escala de niveles 0–C2 como recurso gráfico propio que se vuelve interactivo en la segunda sección.
2. **Cuaderno**: materiales del aprendizaje del alemán (papel cuadriculado de 5 mm con margen rojo de los cuadernos escolares alemanes, fichas de vocabulario o *Karteikarten*). El hero es una ficha que se da vuelta del alemán al español; la segunda sección usa pestañas de fichero.

No extender ninguna al resto del sitio hasta que el usuario elija. Tras la elección, reemplazar esta sección por las decisiones adoptadas.

## Movimiento exigido en la exploración

- Secuencia breve de entrada del hero (menos de 1,2 s en total), una vez por carga.
- Una interacción significativa en la segunda sección, operable con teclado.
- Botones con estados cuidados: reposo, hover, foco visible, activo y deshabilitado.
- Scroll natural, texto legible durante toda la animación y versión con movimiento reducido.

## Color: propuesta de tokens

Valores de marca compatibles con el logo; siguen vigentes. Ajustar a partir de pruebas de contraste. En tema oscuro, el rojo usado como texto o acento se aclara (`#E0514F`) porque `#A11312` no es legible sobre fondo oscuro.

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

- La tipografía depende de la dirección elegida (Afiche: Archivo, con sus anchos variables; Cuaderno: Bricolage Grotesque + Manrope). Todas con licencia OFL y caracteres españoles/alemanes completos.
- Máximo dos familias; servir archivos optimizados localmente cuando sea posible y usar fallbacks métricamente razonables.
- Cuerpo 16–18 px, interlineado generoso; campos de móvil al menos 16 px. Evitar textos esenciales diminutos.
- Titulares fluidos, sin cortar palabras ni diacríticos. La dirección Afiche usa un titular mucho mayor (hasta ~220 px) como estructura del hero.
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
