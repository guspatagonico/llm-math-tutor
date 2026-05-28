# Análisis de Arquitectura: LLM Math Tutor

Proyecto educativo interactivo (React + TS + Express + Gemini) para visualizar logits, sigmoide, softmax, gradientes y temperatura en LLMs. ~2500 líneas de código en 9 archivos.

---

## 1. DRY (Don't Repeat Yourself) — 3 violaciones críticas

### 1.1 Duplicación de patrón Gemini en `server.ts`

Dos endpoints (`/api/predict-tokens` y `/api/tutor-chat`) replican el mismo boilerplate:

| Patrón duplicado | `/api/predict-tokens` | `/api/tutor-chat` |
|---|---|---|
| Guard `if (!ai)` con fallback | L45-51 | L119-123 |
| `try { ai.models.generateContent(...) }` | L54-84 | L126-148 |
| `catch (error)` logging + respuesta | L96-103 | L147-152 |
| `res.json(...)` con warning string | L49, L98 | L121, L143 |

Ambos también hardcodean el modelo `"gemini-3.5-flash"` y manejan errores con lógica casi idéntica. **Propuesta**: extraer una función `callGemini(options)` que encapsule la inicialización, guard, try/catch y formateo de respuesta.

### 1.2 Duplicación de fórmulas matemáticas

- **Sigmoide**: `1 / (1 + Math.exp(-x))` — definida inline en `SigmoidLogitModule.tsx:1`. Potencialmente necesaria en otros módulos.
- **Softmax**: `Math.exp(z) / sumExp` — definida inline en `SoftmaxGradientModule.tsx:37-45`. También usada conceptualmente en `TemperatureSimulator.tsx` (normalización de probabilidades).
- **Normalización**: lógica de escalado por temperatura en `TemperatureSimulator.tsx:96-123` (función `normalizationSteps`).

**Propuesta**: crear `src/utils/math.ts` con funciones puras exportables.

### 1.3 Llamadas fetch ad-hoc sin abstracción

`AITutorChat.tsx` y `TemperatureSimulator.tsx` llaman a `fetch()` directamente con URLs hardcodeadas (`/api/predict-tokens`, `/api/tutor-chat`). No hay cliente HTTP compartido, tipado de respuestas, ni manejo de errores consistente.

**Propuesta**: crear `src/services/api.ts` con funciones tipadas (`predictTokens()`, `tutorChat()`).

---

## 2. SOLID — 6 violaciones

### 2.1 SRP (Single Responsibility) — Componentes con múltiples responsabilidades

| Archivo | Líneas | Responsabilidades mezcladas |
|---|---|---|
| `server.ts` | 176 | 1. Config Express 2. Init Gemini 3. 2 route handlers 4. Vite middleware 5. Static serving |
| `MathMarkdownRenderer.tsx` | 614 | 1. Parser markdown custom (char-by-char) 2. Render LaTeX inline 3. Render tablas 4. Render bloques de código 5. Render texto formateado |
| `App.tsx` | 221 | 1. Router basado en hash 2. Theme manager (dark mode) 3. Layout y navegación 4. Footer |

- `MathMarkdownRenderer.tsx` es particularmente problemático: implementa un parser markdown desde cero con 16 funciones internas, incluyendo `char()` (43 líneas de switch/case). Esto podría reemplazarse con `react-markdown` + `rehype-katex` (~50 líneas vs 614).

### 2.2 OCP (Open/Closed) — No extensible sin modificar

Agregar un nuevo tab/módulo requiere modificar 4 lugares en `App.tsx`:
1. `TabType` union type (L23)
2. `routeToTab` map (L25-30)
3. `tabToRoute` map (L32-37)
4. JSX template con botones y condicionales (L121-198)

**Propuesta**: estructura declarativa con array de configuración de tabs.

### 2.3 DIP (Dependency Inversion) — Acoplamiento directo

Los componentes React dependen directamente de `fetch()` global en lugar de una abstracción inyectable. Esto impide:
- Testing con mocks limpios
- Cambiar el mecanismo de transporte (WebSocket, SSE)
- Reutilizar la lógica en otros contextos

### 2.4 ISP (Interface Segregation) — Props implícitos

`types.ts` tiene interfaces planas (`Candidate`, `Message`, `NormalizationStep`) pero no hay segregación entre lo que cada componente necesita. Por ejemplo, `TemperatureSimulator` usa `Candidate` y `NormalizationStep` pero no hay una interfaz específica para los props de simulación.

### 2.5 LSP (Liskov Substitution) — Sin jerarquía de componentes

Todos los módulos son componentes standalone sin contrato común. Si se quisiera agregar un nuevo "módulo educativo", no hay interfaz/base que garantice consistencia (título, descripción, controles interactivos).

---

## 3. KISS (Keep It Simple, Stupid) — 2 sobre-ingenierías

### 3.1 MathMarkdownRenderer: parser custom innecesario

614 líneas para renderizar markdown cuando librerías como `react-markdown` (instalable en 1 minuto) lo resuelven. El parser incluye:
- Función `char()` con 43 líneas de switch/case para parseo carácter por carácter
- `renderTextBlock()` de 122 líneas
- `renderTableBlock()` de 94 líneas
- Manejo manual de bold, italic, inline code, LaTeX inline/block, tablas, código

Relación señal/ruido: ~80% del archivo es infraestructura de parsing, ~20% es lógica de negocio/educativa.

### 3.2 TemperatureSimulator: 55 magic numbers

478 líneas con 55 literales numéricos únicos no nombrados. Ejemplos típicos:
- Valores de temperatura default
- Rangos de sliders
- Umbrales de visualización
- Escalas de color
- Dimensiones de gráficos

**Propuesta**: `src/constants/temperature.ts` con constantes nombradas.

---

## 4. Modularización — Estructura plana insuficiente

Estructura actual:
```
src/
├── App.tsx              (router + layout + theme)
├── main.tsx             (entry point)
├── index.css            (estilos globales)
├── types.ts             (3 interfaces)
└── components/
    ├── AITutorChat.tsx           (223 líneas)
    ├── MathEquation.tsx          (77 líneas)
    ├── MathMarkdownRenderer.tsx  (614 líneas — parser custom)
    ├── SigmoidLogitModule.tsx    (313 líneas)
    ├── SoftmaxGradientModule.tsx (375 líneas)
    └── TemperatureSimulator.tsx  (478 líneas)
```

Estructura propuesta:
```
src/
├── main.tsx
├── App.tsx
├── index.css
├── types/
│   ├── api.ts           (Candidate, Message, API responses)
│   ├── math.ts          (NormalizationStep, GradientMatrix)
│   └── index.ts
├── constants/
│   ├── temperature.ts   (rangos, defaults, colores)
│   ├── routes.ts        (configuración de tabs)
│   └── index.ts
├── utils/
│   ├── math.ts          (sigmoid, softmax, normalize)
│   └── index.ts
├── services/
│   ├── gemini.ts        (cliente Gemini con guard/retry)
│   ├── api.ts           (fetch wrapper tipado)
│   └── index.ts
├── hooks/
│   ├── useSoftmax.ts
│   ├── useTemperature.ts
│   └── useTutorChat.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── TabNav.tsx
│   ├── modules/
│   │   ├── SigmoidLogitModule.tsx
│   │   ├── SoftmaxGradientModule.tsx
│   │   └── TemperatureSimulator.tsx
│   ├── chat/
│   │   └── AITutorChat.tsx
│   └── shared/
│       ├── MathMarkdownRenderer.tsx
│       └── MathEquation.tsx
└── server/
    ├── index.ts          (config Express + start)
    ├── routes/
    │   ├── predict.ts
    │   └── tutor.ts
    └── services/
        └── gemini.ts
```

---

## 5. Resumen de gravedad y prioridad

| Prioridad | Problema | Archivo(s) | Impacto | Esfuerzo |
|---|---|---|---|---|
| **P0** | Parser markdown custom | `MathMarkdownRenderer.tsx` | 614 líneas ~> ~50 | Medio |
| **P1** | DRY: Gemini duplicado | `server.ts` | 2 endpoints ~> 1 helper | Bajo |
| **P1** | DRY: fórmulas inline | `SigmoidLogitModule`, `SoftmaxGradientModule`, `TemperatureSimulator` | 3 lugares ~> 1 módulo | Bajo |
| **P1** | SRP: server.ts multi-rol | `server.ts` | 176 líneas ~> 3 archivos | Bajo |
| **P2** | KISS: magic numbers | `TemperatureSimulator.tsx` | 55 literales | Bajo |
| **P2** | DIP: fetch directo | `AITutorChat`, `TemperatureSimulator` | 2 componentes | Bajo |
| **P2** | OCP: tabs no extensibles | `App.tsx` | 4 lugares de modificación | Bajo |
| **P3** | SRP: App.tsx multi-rol | `App.tsx` | Layout + router + theme | Medio |
| **P3** | ISP: interfaces planas | `types.ts` | Segregación por dominio | Bajo |

---

## 6. Métricas clave

| Métrica | Valor |
|---|---|
| Archivos totales | 9 (src + server) |
| Líneas totales | ~2,509 |
| Componente más grande | MathMarkdownRenderer (614 líneas) |
| Hooks por componente (promedio) | 4.4 |
| Funciones internas en MathMarkdownRenderer | 16 |
| Endpoints API | 2 (en 1 archivo monolítico) |
| Comunidades GitNexus | 7 |
| Procesos/Flujos GitNexus | 5 (1 detectable) |
