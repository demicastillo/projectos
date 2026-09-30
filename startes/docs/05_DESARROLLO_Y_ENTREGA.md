# Desarrollo, fases y entrega

## Arquitectura inicial propuesta

Para un proyecto nuevo: Next.js en versión estable compatible al iniciar, TypeScript, componentes React y estilos basados en variables CSS. Se puede usar Tailwind si facilita integrar la selección de componentes, sin convertir sus valores por defecto en el diseño de StartEs. GSAP sería el único motor principal si la animación lo necesita; CSS cubre las interacciones sencillas.

Esta es una propuesta, no una dependencia ya instalada. Si el repositorio real contiene una base sólida, evaluarla antes de sustituirla. Registrar versiones elegidas y lockfile. Consultar documentación oficial actual antes de configurar: https://nextjs.org/docs ; https://www.typescriptlang.org/docs/ ; https://gsap.com/docs/v3/ .

- Renderizar las páginas de contenido de forma estática o en servidor según convenga; reservar JavaScript para interacción real.
- Separar contenido, tokens, componentes de interfaz, validación y acceso a servicios externos.
- Mantener contactos en una única configuración para evitar discrepancias.
- Backend del formulario con validación y proveedor de persistencia/notificación encapsulados, de modo que puedan cambiarse sin rediseñar el formulario.
- Registro privado de consultas y notificaciones pendientes, con acceso restringido y conservación definida. No construir un panel complejo sin necesidad: al principio basta un mecanismo operativo seguro para consultar fallos y reintentar.
- Remitente verificado; correo Gmail como destino inicial. No asumir que una dirección Gmail permite enviar automáticamente desde ella sin configurar proveedor/autenticación.
- `.env.example` con nombres y descripciones, nunca valores reales. Documentar la configuración y reinicio necesarios.
- Evitar autenticación pública, pagos, área de alumnos, LMS, blog vacío o reservas automáticas en esta versión.

## Fase 1 — Diagnóstico y preparación

Leer instrucciones, revisar carpeta y versiones instaladas, verificar logo, elegir herramientas disponibles, proponer plan breve y registrar datos pendientes. No pedir al usuario investigar referencias: ya están curadas. El logo debe inspeccionarse antes de derivar favicon o recortes; conservar el original.

Resultado: entorno identificado, decisiones técnicas justificadas y primera dirección lista para representar.

## Fase 2 — Diseño concreto

Representar tres variantes limitadas de hero + primera sección, con captura de escritorio y móvil; no tres implementaciones completas. Comparar claridad, personalidad, pertinencia para edades distintas y peso visual. Recomendar la editorial. Continuar con esa si no hay otra elección; permitir corregirla sin rehacer todo el sitio.

Resultado: dirección visual visible, tokens consistentes y principales estados de botón/campo. Actualizar `DESIGN.md` con decisiones efectivamente adoptadas, distinguiéndolas de las propuestas anteriores.

## Fase 3 — Web navegable

Implementar páginas, menús, temas, contenido, enlaces, FAQ, formulario y estados. Crear favicon/OG adecuados con activos reales o gráficos propios. Mantener borradores legales y contenido pendiente fuera de una publicación accidental. La página debe ser usable sin movimiento.

Resultado: prototipo local completo y revisado visualmente. Integraciones pendientes claramente indicadas en documentación, sin anunciar éxito falso al usuario final.

## Fase 4 — Consulta operativa

Seleccionar proveedor de correo y almacenamiento según coste, privacidad y alojamiento. Pedir solo configuración necesaria. Completar guardado, notificación, acuse, reintentos y protección contra abuso. Implementar analíticas y gestión de cookies acorde con proveedores elegidos.

Resultado: prueba end-to-end controlada. Los mensajes reales se envían únicamente a destinatarios de prueba autorizados. El backend y sus pruebas deben distinguir solicitud guardada, notificación aceptada por proveedor y correo recibido.

## Fase 5 — Calidad y publicación

Ejecutar build/lint/typecheck disponibles, pruebas significativas de formulario y navegación, revisión de capturas, accesibilidad y rendimiento. Corregir fallos concretos antes de ampliar pruebas. Cerrar datos legales y dominio, revisar metadatos y sitemap. Preparar un resultado revisable antes de pedir autorización final de publicación si aún no existe.

Resultado: URL publicada solo cuando se autorice, comprobación posterior de rutas/contactos/correos y guía de mantenimiento. Registrar pendientes residuales con claridad.

## Controles que merecen pruebas automatizadas

- Validación del servidor y rechazo de datos inválidos.
- Prevención de duplicados y comportamiento ante timeout/reintento.
- Persistencia de la consulta aunque falle el correo y reintento de notificación sin duplicar registro.
- Navegación móvil, errores accesibles y camino de envío/confirmación.
- Bloqueo de scripts no esenciales antes del consentimiento, cuando existan.

No crear tests que solo repitan valores de CSS o dependan de una captura idéntica píxel por píxel sin necesidad. Las capturas sirven también para revisión humana de composición.

## Qué significa terminado

La web es coherente, tiene contenido veraz, se navega en móvil y escritorio, el formulario realiza su función y la academia puede recibir y atender consultas. Hay evidencia de las comprobaciones de Q01–Q32. Se entregan instrucciones de ejecución, configuración, cambio de contenido y operación de fallos.

«Diseño listo» y «lista para producción» son estados diferentes. No atribuir al usuario configuración no realizada ni declarar servicios conectados porque existan archivos de ejemplo.
