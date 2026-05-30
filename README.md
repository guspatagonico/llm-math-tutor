# LLM Math Tutor: Sigmoide, Logit y Softmax

Un entorno interactivo y educativo de código abierto diseñado para visualizar y comprender en profundidad la matemática detrás de los Modelos de Lenguaje (LLMs) y la selección de tokens.

---

## Sobre el Proyecto

Esta iniciativa nace con un propósito puramente **educativo y de divulgación científica**. El objetivo principal es desmitificar cómo las redes neurales y los transformadores procesan la información continua para transformarla en palabras legibles, explorando matemáticamente componentes críticos como:

*   **Espacio de Probabilidades vs Logits:** Visualizaciones interactivas de la función logística (σ(x)) y su inversa multiplicativa, el Logit.
*   **Matriz Jacobiana y Softmax:** Simulación dinámica de las derivadas parciales de Softmax con respecto a los logits de entrada (∂pᵢ/∂zⱼ), viendo cómo interactúa el vector de probabilidades en la backpropagación.
*   **Ajuste y Muestreo de Temperatura (T):** Simulación de muestreo con control de temperatura, donde se visualiza el "escalado de entropía" sobre la distribución original.
*   **Tutor IA Integrado:** Un chat inteligente capaz de interpretar LaTeX y tablas complejas para resolver dudas teóricas o prácticas en tiempo real.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Estilos | Tailwind CSS |
| Renderizado LaTeX | KaTeX |
| API en dev | Express (Node.js) en `backend/server.ts` |
| API en prod | PHP proxy autosuficiente (`backend/api-proxy.php`) |
| LLM | Google Gemini (gemini-2.5-flash) |

---

## Desarrollo local

```bash
pnpm install          # Instalar dependencias
cp .env.example .env  # Crear .env con GEMINI_API_KEY=tu-key
pnpm dev              # Dev server en http://localhost:5173
pnpm build            # Build de producción
```

Variables de entorno (`.env` raíz):

| Variable | Descripción |
|----------|-------------|
| `GEMINI_API_KEY` | API key de Google Gemini (solo lado servidor) |
| `VITE_BASE_PATH` | Subcarpeta de deploy (prod), ej. `/webapps/llm-math-tutor/` |
| `GEMINI_MODEL` | Modelo Gemini (default: `gemini-2.5-flash`) |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── layout/        # Header, Footer, TabNav
│   ├── modules/       # Home, SigmoideLogit, Softmax, Temperature, Tutor
│   ├── shared/        # MathMarkdownRenderer, SeoHead, Pagination
│   └── ui/            # Button, Card, Input, Tooltip, Badge, etc.
├── constants/         # Rutas, charts, learning-path
├── hooks/             # useExplainer, useRouteSeo, useStreamingTutor
├── services/          # api.ts — capa fetch unificada (dev → Express, prod → PHP)
├── types/             # Tipos globales
├── utils/             # Funciones utilitarias
├── App.tsx            # Router SPA con lazy-loading
└── index.tsx          # Entry point
backend/
├── server.ts          # Express dev server
├── routes/            # predict.ts, tutor.ts
├── services/          # gemini.ts
├── api-proxy.php      # Proxy PHP autosuficiente para prod
└── .env.example       # Template para GEMINI_API_KEY
scripts/
└── build-seo-assets.mjs  # Generación de assets SSG/SEO
docs/
└── php-deploy-checklist.md  # Guía de despliegue PHP
```

---

## Despliegue en producción

El frontend se construye con `pnpm build` y genera `dist/` para la webapp y `dist-backend/` para el proxy PHP.

En el servidor:
- `dist/` → `/webapps/llm-math-tutor/` (frontend SPA en subcarpeta)
- `dist-backend/` → `/backend/` (proxy PHP al mismo nivel que `/webapps/`)

La webapp llama a `/backend/api-proxy.php?action=...` desde el root del servidor. La API key nunca viaja al cliente.

Ver [`docs/php-deploy-checklist.md`](docs/php-deploy-checklist.md) para instrucciones detalladas de Apache/Nginx.

---

## Autor & Contacto

Este proyecto es desarrollado y mantenido con entusiasmo por:

**Gustavo Adrián Salvini**

Para sugerencias, ideas de mejora, colaboraciones o simplemente intercambiar conocimientos, puedes conectar conmigo en:

*   Sitio Web Personal: [gustavosalvini.com.ar](https://gustavosalvini.com.ar)
*   GitHub: [@guspatagonico](https://github.com/guspatagonico)
*   X (Twitter): [@guspatagonico](https://x.com/guspatagonico)

---

## Contribuciones, Forks e Ideas

Este es un espacio comunitario. Se invita activamente a estudiantes, desarrolladores, docentes y entusiastas a colaborar con el crecimiento de este simulador.

Eres totalmente libre de:
1.  **Hacer un Fork** del repositorio y experimentar con modificaciones locales.
2.  **Abrir Issues** para proponer nuevas herramientas visuales (por ejemplo, simulación de núcleos de atención o pérdidas de Cross-Entropy).
3.  **Enviar Pull Requests (PRs)** con mejoras en el renderizado de ecuaciones matemáticas, adaptabilidad visual o soporte multiidioma.
4.  **Aportar ideas** e hilos de debate sobre mejores formas de enseñar conceptos matemáticos de IA a las nuevas generaciones de científicos de datos.

---

## Licencia MIT

Este proyecto se distribuye bajo la **Licencia MIT**. Es de uso público, libre y de código abierto.

```text
Permiso otorgado, de forma gratuita, a cualquier persona que obtenga una copia
de este software para usarlo, copiarlo, modificarlo, fusionarlo, publicarlo,
distribuirlo, sublicenciarlo y/o vender copias del Software, sujeto únicamente
a que se conserve este aviso de derechos de autor en todas las copias o partes
sustanciales del mismo.

El software se proporciona "tal cual", sin garantía de ningún tipo, explícita o
implícita, incluyendo pero no limitado a garantías de comercialización o idoneidad
para un propósito particular.
```

---

*Desarrollado con React, TypeScript, Tailwind CSS y mucho café.*
