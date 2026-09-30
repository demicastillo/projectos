# Requisitos y comprobaciones de entrega

Esta matriz reúne la lista del usuario y los detalles necesarios para comprobarla. «Condicional» explica cuándo un elemento aparece; no autoriza a olvidar el requisito. Todo lo siguiente está pendiente de implementación.

| ID | Requisito | Evidencia de aceptación |
|---|---|---|
| Q01 | Política de privacidad | Ruta funcional y texto acorde con titular, formulario, proveedores, datos, conservación y derechos reales; pendientes identificados antes de publicar. |
| Q02 | Términos y condiciones | Términos del sitio; distinguir consulta de contratación. No inventar reglas de pago, cancelación o reembolso. |
| Q03 | Contacto real | Email, WhatsApp e Instagram correctos. Confirmar titular/domicilio legal cuando corresponda; no presentar Dohna como aula presencial. |
| Q04 | Cookies | Inventario real; aceptar/rechazar/configurar; preferencias revisables. Bloqueo efectivo previo de tecnologías que requieren consentimiento, no solo esconder el banner. |
| Q05 | Compresión de imágenes | Archivos adaptados al tamaño de uso, formatos adecuados, dimensiones explícitas y carga diferida fuera de la primera vista; imagen principal sin lazy load innecesario. |
| Q06 | Texto alternativo | Imágenes informativas descritas; decorativas con alt vacío. Iconos de controles con nombre accesible. |
| Q07 | Sitemap XML | URLs públicas canónicas y existentes; excluir gracias, pruebas y rutas privadas. Disponible tras configurar dominio real. |
| Q08 | Metadatos por página | Título y descripción únicos; idioma, canonical y jerarquía de encabezados coherentes. No datos estructurados ni reseñas inventadas. |
| Q09 | Favicon | Reconocible a 16/32 px; formatos adecuados y referencia en metadatos. |
| Q10 | Open Graph | Imagen de marca legible al compartir, título/descripción/URL correctos; sin dominio de ejemplo en producción. |
| Q11 | 404 personalizada | Mantiene identidad, devuelve HTTP 404 y ofrece navegación útil. |
| Q12 | Página de gracias | Solo comunica envío confirmado tras aceptación real; visita directa no afirma un envío nuevo; no indexada. |
| Q13 | Responsive y breakpoints | Sin scroll horizontal accidental, textos cortados o solapamientos a 360/390/768/1024/1440 px e intermedios. |
| Q14 | Navegación móvil | Abrir, cerrar, Escape, foco y retorno al disparador; menú utilizable con teclado y táctil. |
| Q15 | Animación de scroll | Ligera, sin secuestrar desplazamiento; contenido visible sin animación; versión de movimiento reducido. |
| Q16 | Hero animado | Secuencia breve, sin bloquear CTA ni lectura; revisar saltos cuando cargan fuentes. |
| Q17 | Microinteracciones y hover | Botones con respuesta clara; foco visible y estado active; ninguna información solo disponible por hover. |
| Q18 | Transiciones | Consistentes y breves; anclas, historial y navegación siguen funcionando. |
| Q19 | CTA repetido | Presente en momentos pertinentes y dirige al mismo recorrido con contexto correcto; sin saturación. |
| Q20 | Contacto funcional | Validación cliente/servidor, errores por campo, protección contra abuso, persistencia fiable y credenciales fuera del cliente. |
| Q21 | Estados éxito/error | Probar datos inválidos, doble envío, timeout y error de servidor. Datos conservados en memoria al fallar; sin éxito simulado. |
| Q22 | Correos | Notificación a academia y acuse a visitante; remitente autorizado, Reply-To correcto y prueba controlada de recepción. Separar aceptación del proveedor y recepción observada. |
| Q23 | Volver arriba | Visible tras desplazamiento suficiente, accesible y sin tapar formulario/banner. |
| Q24 | Loading/skeleton | Solo ante carga real; estado del envío comunicado; sin espera añadida para mostrar una animación. |
| Q25 | Modo oscuro | Tema coherente, preferencia persistente, logo legible y contraste en todos los estados; sin flash incorrecto inicial. |
| Q26 | Idioma | Español inicial y texto centralizado; no selector ficticio. Si luego se autoriza traducción propia, cubrir páginas, formularios y metadatos completos. |
| Q27 | Redes sociales | Enlaces correctos y accesibles; preferir enlaces simples frente a embeds que añaden tracking y peso. |
| Q28 | Testimonios | Solo material real autorizado. Componente preparado pero no publicado con personas inventadas. |
| Q29 | Analíticas | Medir consultas aceptadas y clics relevantes; no enviar PII ni texto libre; respetar consentimiento aplicable y evitar eventos duplicados. |
| Q30 | Velocidad | Medir build de producción y registrar dispositivo/condiciones. Objetivos iniciales: LCP ≤2,5 s, CLS ≤0,1, INP ≤200 ms en datos de campo cuando existan. No atribuir INP real a una única ejecución de laboratorio. |
| Q31 | Accesibilidad | Teclado, labels, avisos de error, contraste, zoom 200 %, foco, landmarks y movimiento reducido; combinar revisión automática y manual. |
| Q32 | Código y operación | Componentes claros, configuración de entorno documentada, sin secretos ni datos personales en repositorio/logs públicos, dependencias justificadas y licencias conservadas. |

## Analíticas iniciales propuestas

`contact_cta_click` con ubicación de botón, `contact_form_start`, `contact_submit_success` después de aceptación, `contact_submit_error` con categoría genérica y `whatsapp_click`. Sin correo, teléfono, nombre, texto del mensaje ni valores de campos en los eventos. Mantener fuera del código un proveedor concreto hasta elegirlo.

## Alcance legal

Crear estructura y borradores a partir de los datos reales. No declarar cumplimiento legal completo por haber añadido dos páginas. Confirmar dónde opera jurídicamente la academia y los datos de su titular; la residencia en Alemania no basta para cerrar esa decisión. Evaluar entonces el aviso legal/Impressum y demás obligaciones que correspondan. Estas decisiones no bloquean el prototipo local.

La guía europea distingue cookies necesarias y cookies que requieren consentimiento previo, e indica que retirar consentimiento debe ser tan sencillo como concederlo. Fuente consultada: https://europa.eu/youreurope/business/growing/digitalising/online-privacy/index_en.htm . Implementar los controles según los servicios realmente elegidos. Si no existen tecnologías que necesiten consentimiento, documentar por qué un banner de aceptación no es necesario en esa configuración.

## Informe de validación esperado

Por cada comprobación: estado (aprobado/fallido/pendiente/no aplica justificado), prueba o captura, y límite de lo comprobado. El informe debe diferenciar prototipo, integración de pruebas y producción. No escribir «todo funciona» si falta probar correo o guardar consultas reales.
