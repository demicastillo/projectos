# Claude Code: capacidades, herramientas y permisos

Guía basada en documentación consultada el 30/09/2026. El agente debe verificar qué está instalado y qué permite la sesión real. No se instaló ningún plugin o MCP al preparar este paquete.

## Configuración recomendada

| Capacidad | Opción | Cuándo usarla |
|---|---|---|
| Dirección de interfaz | Frontend Design de Anthropic | Diseño inicial y construcción de secciones |
| Ver el resultado y probarlo | Playwright MCP o navegador ya disponible | Capturas de móvil/escritorio, menús, formulario, errores |
| Consultar documentación actual | Context7 o docs oficiales directas | Al implementar una API o resolver compatibilidad |
| Buscar componentes con código | shadcn MCP con registro Cult; Magic UI MCP si hace falta | Solo al elegir/importar componentes concretos |
| Referencias adicionales | Páginas públicas curadas; Refero MCP si tiene acceso útil | Si las fuentes seleccionadas resultan insuficientes |

Una skill guía cómo trabaja el agente; un MCP expone herramientas o datos; el acceso al navegador permite observar y probar. Instalar uno no concede automáticamente las otras capacidades.

## Primer paso sencillo: Frontend Design

En una sesión local de Claude Code dentro de StartEs:

1. Escribir `/plugin`.
2. Buscar `frontend-design` en el marketplace oficial de Anthropic.
3. Revisar que el autor/origen sea Anthropic y elegir instalación local al proyecto si esa opción está disponible.
4. Seguir el mensaje de activación; comprobar que aparece instalado. Si se pide recargar, hacerlo según el mensaje actual de Claude Code.

También se puede abrir su ficha desde https://claude.com/marketplace/plugins/frontend-design y utilizar el comando oficial que ofrezca. Si la interfaz difiere por versión, consultar https://code.claude.com/docs/en/discover-plugins . No inventar comandos de versiones anteriores para forzar el proceso.

El plugin aporta instrucciones de diseño; no sustituye el brief ni garantiza un resultado excelente por sí solo.

## Navegador y pruebas

Usar la capacidad de navegador ya disponible. Si falta, consultar la instalación oficial de Playwright MCP: https://github.com/microsoft/playwright-mcp . Puede necesitar Node, dependencias y descargar un navegador. El agente debe comprobar disponibilidad y dar instrucciones acordes al sistema operativo, especialmente en Windows.

Empezar con la web local y referencias públicas. Acceso al navegador personal con sesiones iniciadas solo si aporta algo necesario y el usuario lo autoriza. Para Claude Code con Chrome, la documentación exige una configuración y autenticación compatibles: https://code.claude.com/docs/en/chrome . No asumir que una conexión por API o un proveedor intermediario habilita esa integración.

No declarar «lo revisé visualmente» si solo se leyó HTML. Obtener y observar capturas. No afirmar que una herramienta está conectada sin una llamada de prueba satisfactoria.

## Componentes y documentación

Cult describe integración mediante shadcn MCP y registro `@cult-ui`: https://www.cult-ui.com/docs/mcp-server . Su documentación muestra el comando siguiente, que se ejecuta en una terminal dentro del proyecto una vez elegida/preparada la base compatible:

```sh
pnpm dlx shadcn@latest mcp init --client claude
```

Usar el gestor de paquetes realmente disponible y seguir la alternativa oficial correspondiente. Configurar el registro en el `components.json` de la aplicación sin sobrescribir su resto:

```json
{
  "registries": {
    "@cult-ui": "https://cult-ui.com/r/{name}.json"
  }
}
```

El fragmento es parcial: no es un `components.json` completo listo para reemplazar otro archivo. Consultar `/mcp` para revisar conexiones. Si no conviene añadir MCP, leer el componente público directamente.

Magic UI: https://magicui.design/docs/mcp . Context7: https://github.com/upstash/context7 . Refero: https://refero.design/mcp . Costes, cuentas y alcance de acceso deben comprobarse antes de solicitar una instalación. No suscribirse a planes para explorar algo que ya está disponible públicamente.

## Protocolo proactivo que debe seguir Claude

En cada fase, evaluar si falta una capacidad que cambie materialmente el resultado. No es necesario interrumpir para sugerencias menores.

Cuando sí exista un beneficio concreto, explicar:

1. **Necesidad:** qué no puede verificar o hacer ahora.
2. **Mejora:** qué resultado concreto habilita la herramienta o permiso.
3. **Acceso mínimo:** qué carpeta, sitio, cuenta o servicio necesita y durante cuánto tiempo.
4. **Coste:** coste conocido o no verificado y posible impacto en contexto/rendimiento.
5. **Acción:** pasos exactos respaldados por documentación actual o acción que ejecutará, según autorización disponible.
6. **Alternativa:** cómo seguir sin esa capacidad y qué limitación queda.
7. **Verificación:** cómo confirmará que el acceso funciona y cómo se puede retirar.

Ejemplo: «Para revisar cómo se ve el menú en móvil necesito abrir la vista local en un navegador. Playwright permitiría capturarla y probar el teclado. Necesita descargar un navegador y acceso al servidor local; no necesita tus cuentas personales. Si no lo habilitamos puedo revisar el código, pero la validación visual quedará pendiente».

No convertir este ejemplo en un mensaje obligatorio ni pedir siempre Playwright si ya existe otro navegador suficiente.

## Autonomía y límites

- Avanzar con lecturas, código, arreglos y pruebas locales autorizadas; no pedir confirmación de cada color, paquete común o comando rutinario.
- Cuando se necesite elevar permisos, usar el mecanismo normal del entorno y explicar alcance. Nunca desactivar controles ni recomendar acceso global a todo el equipo.
- Pedir autorización específica para gastos, conexión de nuevas cuentas, compartir datos con servicios externos, publicación, cambios destructivos y correos reales si esa autorización no está dada.
- Credenciales introducidas por el usuario en configuración segura; no pedir que pegue contraseñas en el chat ni guardarlas en documentación.
- Si un control rechaza una acción, informar y usar una alternativa permitida; no alterar instrucciones para eludirlo.
- Si falta correo o alojamiento, terminar las partes independientes y dejar una integración claramente pendiente. No simular que ya existe.

## Contexto y eficiencia

`CLAUDE.md` mantiene instrucciones breves; los documentos especializados se leen según la tarea. `PROJECT_STATE.md` registra hechos verificados, decisiones adoptadas y pendientes. No es una garantía de memoria infalible: el agente debe consultar esos archivos en una sesión nueva.

Mantener una selección pequeña de fuentes, evitar instalar herramientas redundantes y no reabrir decisiones sin un problema concreto. Los permisos adicionales permiten acceder a recursos; no aumentan por sí solos la capacidad de razonamiento del modelo.

Fuentes de funcionamiento de Claude: https://code.claude.com/docs/en/memory ; https://code.claude.com/docs/en/mcp ; https://code.claude.com/docs/en/discover-plugins .
