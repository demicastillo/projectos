# StartEs · sitio web

Web de StartEs, academia online de idiomas (alemán desde cero hasta C2, exámenes y español para germanoparlantes).
Next.js (App Router) + TypeScript, estilos con variables CSS propias, sin librerías visuales ni motor de animación.

## Requisitos

Node.js 20 o superior.

## Uso

```sh
npm install
npm run dev      # desarrollo en http://localhost:3000
npm run build    # compilación de producción
npm start        # sirve la compilación
npm run lint     # comprobación de tipos
npm run assets   # regenera imágenes de /public a partir de /assets (logo, foto, favicon, Open Graph)
```

Copiá `.env.example` a `.env.local` y completá lo que corresponda. Sin configuración, el sitio funciona y el formulario
responde honestamente que el envío no está activo (ofrece WhatsApp y correo); nunca simula un éxito.
Para probar el recorrido en local sin enviar nada: `CONTACT_MODE=demo npm run dev`.

## Dónde cambiar cosas

| Qué | Dónde |
|---|---|
| Contactos, textos del formulario, objetivos, niveles, preguntas frecuentes | `src/content/site.ts` |
| Colores, tipografías, espaciados (tema claro y oscuro) | `:root` en `src/app/globals.css` |
| Páginas | `src/app/<ruta>/page.tsx` |
| Validación del formulario (cliente y servidor) | `src/lib/contact/validation.ts` |
| Envío de consultas (proveedor) | `src/lib/contact/service.ts` y `src/app/api/consulta/route.ts` |
| Eventos de analítica (sin proveedor aún) | `src/lib/analytics.ts` |

## Estructura

- `assets/` originales sin modificar (logo, foto).
- `public/img/` imágenes optimizadas generadas por `npm run assets`.
- `design/exploracion/` las tres direcciones de portada comparadas (archivo interno, no se publica).
- `CLAUDE.md`, `DESIGN.md`, `docs/`, `PROJECT_STATE.md` brief del proyecto y estado actual.

## Licencias

Tipografías Bricolage Grotesque y Manrope (SIL Open Font License 1.1) servidas localmente con los paquetes `@fontsource-variable`.
