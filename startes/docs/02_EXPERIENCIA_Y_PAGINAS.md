# Experiencia, páginas y formulario

## Recorrido principal

Comprender la oferta → reconocer un objetivo → conocer modalidades → consultar → recibir confirmación → continuar por mensaje con la academia. La consulta es captación de interés, no una matrícula online.

## Mapa inicial

| Ruta | Propósito | Indexación propuesta |
|---|---|---|
| `/` | Portada de marca y entradas por objetivos | Sí |
| `/aleman` | Alemán desde cero, niveles y modalidades; atención a angloparlantes | Sí |
| `/examenes` | Preparación general y consulta por examen | Sí, con contenido sustancial |
| `/espanol` | Español para germanoparlantes | Sí |
| `/contacto` | Formulario completo y canales reales | Sí |
| `/gracias` | Confirmación después del envío | No; fuera del sitemap |
| `/privacidad` | Tratamiento real de datos | Según estrategia legal/SEO |
| `/terminos` | Términos de uso del sitio | Según estrategia legal/SEO |
| `/cookies` | Información y acceso a preferencias cuando corresponda | Según implementación |
| 404 | Recuperación de enlaces inexistentes; código HTTP 404 real | No |

Sobre la academia y preguntas frecuentes pueden vivir en la portada. No crear una página por nivel solo para aumentar la cantidad. Si falta contenido para una ruta, integrarlo en una sección útil hasta tenerlo.

## Portada, sección por sección

1. **Cabecera:** logo original sobre soporte legible; navegación Clases, Exámenes, La academia, Contacto. Selector de tema accesible. CTA principal. En móvil, un menú sencillo con cierre, Escape y gestión de foco.
2. **Hero:** prioridad al alemán, modalidad online visible, dos acciones como máximo y una composición propia derivada de las curvas del logo. El título debe ser texto real seleccionable.
3. **Objetivos:** lista editorial de cuatro opciones. Cada opción informa y conduce a una página o preselecciona el formulario. No presentarlo como un algoritmo que diagnostica el nivel.
4. **Clases:** alemán como oferta principal, español con enlace propio; niveles A1–C2 en un recorrido compacto. «No sé mi nivel» debe tener un lugar visible. Sin examen de nivel inventado.
5. **Modalidades:** comparación breve entre clases individuales y grupales. No atribuir flexibilidad, cupos o frecuencia que no estén confirmados.
6. **Cómo empezar:** contar el objetivo → conversar con StartEs → acordar inscripción y comienzo por mensaje. Evitar prometer clase de prueba gratis.
7. **La academia:** valor de aprender con acompañamiento y mención institucional breve a Mariana.
8. **Testimonios:** diseñar el componente con contenido local de prueba inequívocamente marcado; mantenerlo fuera de la versión pública hasta disponer de opiniones reales autorizadas.
9. **FAQ:** modalidad online, principiantes, niveles, individual/grupal, exámenes y proceso de consulta. Para horarios y duración, explicar que se conversan después del contacto sin abrir un catálogo de pendientes.
10. **Cierre:** invitación a consultar y pie con contactos, páginas legales y preferencias de cookies.

Distribuir el CTA en cabecera/hero, después de explicar la oferta y en el cierre. Evitar que botón flotante, cookies y volver arriba se superpongan en móvil.

## Formulario propuesto

Formulario de una sola página, con campos condicionales pequeños; no un asistente largo.

| Campo | Regla |
|---|---|
| Nombre | Obligatorio; aceptar nombres reales con acentos y espacios |
| Correo | Obligatorio; validación razonable, sin reglas arbitrarias contra direcciones válidas |
| Qué te interesa | Alemán / Preparación de examen / Español / Necesito orientación |
| Nivel aproximado | Opcional; Desde cero, A1–C2, No sé mi nivel |
| Modalidad | Opcional; Individual / Grupal / Quiero orientación |
| Examen | Solo si elige preparación; texto libre, permite «Todavía no sé» |
| Objetivo o consulta | Opcional; longitud limitada de forma razonable |
| Contacto por WhatsApp | Campo opcional si la persona quiere recibir respuesta por ese canal |

Aviso de privacidad junto al envío, con enlace a la página. No convertir el formulario en una aceptación forzada de publicidad ni añadir suscripción comercial preseleccionada. Resolver la base legal real al completar los textos de privacidad.

Si la consulta es para un menor, permitir que la gestione una persona adulta responsable sin pedir nombre completo del menor, documentos, fecha exacta de nacimiento o información sensible en este primer contacto.

## Comportamiento y fiabilidad

- Desde una página específica, preseleccionar interés mediante un parámetro validado. La persona puede modificarlo. Nunca pasar datos personales por URL.
- Etiquetas visibles, ayuda junto al campo, errores específicos y resumen accesible cuando corresponde.
- Validar en cliente y servidor; sanitizar salida; limitar frecuencia y duplicados; no confiar en campos ocultos como única protección.
- Estado de envío anunciado; evitar doble clic. Un timeout no debe borrar los datos ni provocar consultas duplicadas al reintentar.
- Propuesta de fiabilidad: guardar la solicitud en un registro privado y crear un trabajo de notificación. Confirmar al visitante solo tras aceptación duradera por el servidor. El correo puede reintentarse sin reenviar el formulario.
- Si se adopta otra arquitectura, documentar cómo evita pérdidas y cómo conoce la academia las consultas pendientes.
- Enviar notificación a masgoret555@gmail.com y acuse al correo de la persona. Usar un remitente autorizado del proveedor; el correo del visitante va en Reply-To, no como remitente falsificado.
- La página de gracias no debe afirmar un envío nuevo cuando alguien la abre directamente; mostrar en ese caso un mensaje general y enlace al formulario. No incluir datos personales en URL ni analíticas.
- Un fallo del correo posterior al guardado no debe crear otra consulta. Registrar el estado y permitir reintento operacional.
- Nunca mostrar éxito ficticio usando solo un temporizador. El modo de demostración, si existe, se identifica y no envía datos reales.

## Idioma

Español al lanzamiento, HTML con idioma correcto y contenido compatible con traducción del navegador. Centralizar textos para poder añadir inglés/alemán más adelante. No mostrar un selector que cambie solo dos títulos ni banderas como equivalentes exactos de idioma.
