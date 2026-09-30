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

- Dirección editorial con curvas de marca.
- Tokens de DESIGN.md, pareja tipográfica, textos propuestos y arquitectura técnica.
- Variantes acotadas antes de desarrollar el sitio completo.

## Próximo trabajo de Claude

Leer instrucciones, inspeccionar entorno, comprobar herramientas, representar las propuestas de diseño y desarrollar la web según el prompt recibido. Actualizar este documento con resultados reales.

## Pendientes para operación/publicación, sin bloquear diseño local

Dominio/alojamiento; proveedor de correo, almacenamiento y remitente autorizado; datos legales reales; testimonios si se publican; confirmación de catálogo de exámenes si se anuncian variantes concretas. No pedir horarios ni precios para llenar la web.

## Sesión 30/09/2026 — primera versión

**Decisiones**
- Arquitectura: Next.js 16 + TypeScript, como propone el documento 05. Páginas estáticas; solo `/api/consulta` es dinámica. Sin Tailwind, sin librerías de componentes y sin GSAP: las animaciones (título por líneas, trazado de curvas, apariciones al desplazar) se resolvieron con CSS y un IntersectionObserver.
- Dirección visual: editorial con curvas de marca (la recomendada). Las tres direcciones están comparadas en `design/exploracion/comparacion.png`; en esa exploración las fuentes web no cargaron (sin red en el entorno) y se ven con tipografía de reserva.
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

## Registro futuro

Añadir por sesión: decisión adoptada y razón; archivos principales afectados; comprobaciones ejecutadas con evidencia; limitaciones; próximo paso. No acumular transcripciones ni afirmar pruebas no realizadas.
