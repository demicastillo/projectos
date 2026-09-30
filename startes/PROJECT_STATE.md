# Estado del proyecto StartEs

Actualizado: 30/09/2026.

## Realizado

- Preparado un paquete nuevo para Claude Code y un brief consolidado para la IA que redactará el prompt.
- Registrados datos reales y últimas correcciones del usuario.
- Definida arquitectura de información y lógica de consulta.
- Seleccionadas referencias públicas concretas y su aplicación a StartEs.
- Propuesta dirección editorial con alternativas acotadas.
- Preparada matriz de requisitos y protocolo proactivo de herramientas/permisos.
- Incluido logo original sin modificar.

## Estado real (30/09/2026)

Prototipo navegable completo en Next.js (`npm run dev`). No está publicado, no hay dominio, y el envío real de consultas no está configurado: sin `CONTACT_MODE` el formulario valida y responde que el envío no está activo, ofreciendo WhatsApp y correo. No se envió ningún correo.

## Decisiones del usuario que no se reabren por defecto

- StartEs es protagonista; Mariana tiene una mención breve.
- Clases online; consulta inicial y conversación posterior por mensajes.
- Horarios, duración, precios y condiciones particulares quedan fuera de la web pública inicial.
- Paleta ligada al logo y bandera alemana, con jerarquía de colores.
- Estética original, coherencia, fluidez y código limpio.
- Uso de Claude Code. El usuario delega la búsqueda de referencias y la preparación del proyecto.
- El agente debe avisar si una herramienta o permiso concreto permitiría mejorar el resultado.

## Propuestas iniciales aún ajustables

- ~~Dirección editorial con curvas de marca.~~ Rechazada por el usuario el 30/09/2026 (ver sesión de revisión abajo).
- Tokens de DESIGN.md, pareja tipográfica, textos propuestos y arquitectura técnica.
- Variantes acotadas antes de desarrollar el sitio completo.

## Próximo trabajo de Claude

Leer instrucciones, inspeccionar entorno, comprobar herramientas, representar las propuestas de diseño y desarrollar la web según el prompt recibido. Actualizar este documento con resultados reales.

## Pendientes para operación/publicación, sin bloquear diseño local

Dominio/alojamiento; proveedor de correo, almacenamiento y remitente autorizado; datos legales reales; testimonios si se publican; confirmación de catálogo de exámenes si se anuncian variantes concretas. No pedir horarios ni precios para llenar la web.

## Sesión 30/09/2026 — primera versión

**Decisiones**
- Arquitectura: Next.js 16 + TypeScript, como propone el documento 05. Páginas estáticas; solo `/api/consulta` es dinámica. Sin Tailwind, sin librerías de componentes y sin GSAP: las animaciones (título por líneas, trazado de curvas, apariciones al desplazar) se resolvieron con CSS y un IntersectionObserver.
- Dirección visual: editorial con curvas de marca (la recomendada). **Rechazada después; ver la sesión de revisión.** Las tres direcciones están comparadas en `design/exploracion/comparacion.png`; en esa exploración las fuentes web no cargaron (sin red en el entorno) y se ven con tipografía de reserva.
- Tipografías Bricolage Grotesque + Manrope, servidas localmente (`@fontsource-variable`, licencia OFL).
- Tema oscuro: el rojo de marca se aclara a `#E0514F` solo para texto y acentos, porque `#A11312` sobre `#171716` no alcanza contraste legible. La acción principal pasa a dorado con texto oscuro. El logo se muestra sobre una placa clara.
- Foto de Mariana (aportada por el usuario) en la sección «La academia», junto a la mención institucional. No se generó ninguna imagen de personas.
- Favicon: símbolo del logo (sin el wordmark) sobre fondo claro redondeado; revisado a 16 y 32 px.
- Envío de consultas encapsulado en `src/lib/contact/service.ts` con tres modos: sin configurar (503, sin éxito falso), `demo` (solo desarrollo) y `resend` (notificación a la academia con el visitante en Reply-To + acuse). Anti-abuso: campo trampa, límite por IP en memoria, validación en servidor y deduplicación por `requestId`.
- Páginas legales como borradores visibles y marcados, con `noindex` hasta completar datos del titular.
- Cookies: hoy no hay tecnologías que requieran consentimiento (solo `localStorage` para el tema y `sessionStorage` para la página de gracias), por eso no hay banner; documentado en `/cookies`.
- Testimonios: no se incluyó el componente en la web pública (no hay opiniones reales).

**Comprobaciones realizadas (build de producción local, Chromium headless)**
- Capturas revisadas a 360, 390, 768, 1024 y 1440 px de todas las páginas; sin desbordamiento horizontal. Portada y contacto también en tema oscuro.
- Menú móvil: abre, enfoca el primer enlace, Escape cierra y devuelve el foco, se cierra al navegar. Se corrigió un fallo real (el menú quedaba sin altura por un `backdrop-filter` en la cabecera).
- Formulario: resumen de errores con foco, error de correo, preselección por `?interes=` validada (valores extraños ignorados), estado «no disponible» con datos conservados, error 500 simulado, botón bloqueado durante el envío, paso a `/gracias` con respuesta `sent` simulada por intercepción de red; `/gracias` recargada o abierta directamente no afirma un envío.
- API: 422 con errores por campo, 503 sin proveedor, 202 silencioso con campo trampa.
- 404 personalizada con código HTTP 404 real.

**No comprobado todavía**
- Envío real con Resend (falta cuenta, dominio verificado y clave). Correos de notificación y acuse sin probar.
- Rendimiento (LCP/CLS/INP) y auditoría automática de accesibilidad; zoom al 200 %.
- Aspecto en Safari/Firefox y dispositivos reales.

**Próximos pasos**
1. Elegir alojamiento y dominio (Vercel encaja con Next.js) y definir `NEXT_PUBLIC_SITE_URL`.
2. Crear cuenta de Resend con dominio verificado; configurar `CONTACT_MODE=resend` y probar con destinatarios autorizados.
3. Decidir el registro privado de consultas (hoy no se guardan: si el correo a la academia falla, se muestra error y se conservan los datos en el navegador).
4. Completar datos legales del titular y quitar `noindex` de las páginas legales.
5. Confirmar con la academia el catálogo de exámenes antes de detallar fichas.

## Sesión 30/09/2026 (2) — revisión de dirección artística

**Pedido del usuario:** la propuesta editorial no está aprobada. Replantear composición y jerarquía; explorar dos direcciones con el mismo contenido (navegación, hero y una segunda sección), con movimiento implementado, y recomendar una antes de extender el diseño.

**Hecho**
- `CLAUDE.md`, `DESIGN.md` y `docs/05` corregidos: la dirección editorial queda rechazada, se listan los patrones a evitar y se exige la elección del usuario antes de extender el diseño.
- Referencias consultadas y registradas en `docs/07_REFERENCIAS_CONSULTADAS.md` (URL, principio, aplicación, adaptación, licencia). Las demos en vivo no se pudieron abrir: la red del entorno bloquea esos dominios. Se leyó su texto y su código fuente.
- Dos direcciones en `design/direcciones/index.html` (archivo de exploración, no forma parte del sitio Next.js): **A · Afiche** y **B · Cuaderno**.

**Comprobado (Chromium headless, fuentes reales cargadas)**
- Sin scroll horizontal a 360, 390, 768, 1024 y 1440 px en ambas.
- A: la regla del hero abre el nivel correspondiente; acordeón de niveles con clic y flechas, foco correcto; menú móvil con Escape y retorno de foco.
- B: la ficha entra en alemán y se da vuelta al español; el botón la da vuelta y mueve el foco; pestañas con clic, flechas y End, un solo panel visible.
- Movimiento reducido: sin animaciones y la ficha queda en español.
- Se corrigió un fallo real: tras dar vuelta la ficha, la cara oculta bloqueaba los clics (se reemplazó el giro 3D por uno 2D que muestra una sola cara).

**No comprobado:** demos originales de las referencias, Safari/Firefox, dispositivos reales, lector de pantalla real, zoom al 200 %, tema oscuro (no diseñado en esta etapa).

**Pendiente (resuelto en la sesión 3):** elección del usuario entre A y B.

## Sesión 30/09/2026 (3) — dirección Cuaderno en todo el sitio

**Decisión:** el usuario eligió primero A · Afiche y enseguida cambió a **B · Cuaderno**. Antes del cambio no se había modificado el sitio; la dependencia de Archivo se quitó.

**Hecho**
- `globals.css` reescrito con el sistema Cuaderno, claro y oscuro (tokens en `DESIGN.md`).
- Componentes nuevos: `FlashCard` (ficha del hero que se da vuelta), `GoalTabs` (fichero de objetivos con semántica de pestañas), `LevelSheet` (hoja de niveles). `CtaBand` pasa a ser el cierre con doble raya y canales; `PageHero` sin etiqueta y con título subrayado dos veces. Se eliminó `BrandCurves`.
- Portada rehecha: ficha, fichero, niveles, modalidades, academia (foto y mención breve de Mariana), preguntas y cierre. Páginas internas, contacto, gracias, legales y 404 adaptadas. Sin etiquetas sobre los títulos.
- Contenido del fichero en `src/content/site.ts` (`goals`), con enlaces a `/contacto?interes=…`.

**Comprobado (build de producción local, Chromium headless)**
- Todas las páginas a 1440 y 360 px; portada a 1440, 1024, 768, 390 y 360 px en claro y a 1440 y 390 px en oscuro; contacto en oscuro a 390 px. Sin scroll horizontal ni errores de consola (salvo el 404 esperado de la página inexistente).
- Ficha: entra en alemán y queda en español; el botón la da vuelta y mueve el foco; con Enter vuelve. Con movimiento reducido no se anima y arranca en español.
- Fichero: clic, flechas, Inicio y Fin; un solo panel visible; entrada según dirección.
- Menú móvil y formulario: se repitió el recorrido completo de la sesión 1 (errores, preselección, 503, 500 simulado, botón bloqueado, `/gracias` simulada, API 422/503/202). Todo con respuestas simuladas: no hubo envío real de correo.
- Se corrigió el título de preguntas, que se salía de su columna a 1440 px.

**No comprobado:** Safari/Firefox, dispositivos reales, lector de pantalla real, zoom al 200 %, rendimiento, envío real con Resend. La imagen Open Graph todavía usa las curvas de la primera versión.

**Próximos pasos:** rehacer la imagen Open Graph en estilo Cuaderno; luego los pasos de operación de la sesión 1 (alojamiento, Resend, datos legales).

## Registro futuro

Añadir por sesión: decisión adoptada y razón; archivos principales afectados; comprobaciones ejecutadas con evidencia; limitaciones; próximo paso. No acumular transcripciones ni afirmar pruebas no realizadas.
