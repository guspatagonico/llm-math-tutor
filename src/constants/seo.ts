import { TABS } from "./routes";

export type RouteSeoKey = "sigmoid" | "softmax" | "temperature" | "chat";

type RouteSeoMeta = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  faq: Array<{ question: string; answer: string }>;
  tldr: string;
  references: Array<{ label: string; href: string }>;
};

export const TODAY_ISO = new Date().toISOString().split("T")[0];

export const ROUTE_META: Record<RouteSeoKey, RouteSeoMeta> = {
  sigmoid: {
    title: "Sigmoide y Logit en LLMs - Simulador Interactivo",
    description:
      "Aprende la función Sigmoide y su inversa Logit con un simulador visual. Entiende cómo los LLMs transforman logits continuos en probabilidades binarias estables.",
    keywords:
      "sigmoide, logit, función logística, logits, probabilidad binaria, llm matemáticas",
    ogTitle: "Sigmoide y Logit: simulador para entender logits en LLMs",
    ogDescription:
      "Visualiza cómo se mapea R -> (0,1) con Sigmoide y cómo Logit invierte el proceso para entrenamiento de modelos.",
    ogImage: "/og/sigmoide-logit.svg",
    tldr:
      "La Sigmoide convierte un logit real en probabilidad binaria acotada. El Logit hace la operación inversa y permite entrenar en el espacio real de manera estable.",
    faq: [
      {
        question: "¿Qué es la función Sigmoide en machine learning?",
        answer:
          "Es una función de activación que toma cualquier número real y lo transforma en un valor entre 0 y 1. Por eso se usa para modelar probabilidades binarias.",
      },
      {
        question: "¿Cuál es la diferencia entre Sigmoide y Logit?",
        answer:
          "Sigmoide va de logits a probabilidades. Logit va de probabilidades a logits. Son funciones inversas entre sí dentro del intervalo (0,1).",
      },
    ],
    references: [
      { label: "Deep Learning - Goodfellow, Bengio, Courville", href: "https://www.deeplearningbook.org/" },
      { label: "Logistic function (Wikipedia)", href: "https://en.wikipedia.org/wiki/Logistic_function" },
    ],
  },
  softmax: {
    title: "Softmax y Jacobiano - Derivacion y simulador para LLMs",
    description:
      "Explora Softmax desde su origen termodinámico hasta su matriz Jacobiana. Simula gradientes diagonal y off-diagonal para entender backpropagation en LLMs.",
    keywords:
      "softmax, jacobiano softmax, gradiente, boltzmann, entropía cruzada, backpropagation",
    ogTitle: "Softmax y Jacobiano: de la física estadística al entrenamiento",
    ogDescription:
      "Entiende por qué la derivada de Softmax tiene estructura competitiva y cómo aparece el gradiente Pi - Yi.",
    ogImage: "/og/softmax-physics.svg",
    tldr:
      "Softmax normaliza logits en una distribución de probabilidad multiclase. Su Jacobiano explica la competencia entre tokens y por qué el gradiente final con entropía cruzada es Pi - Yi.",
    faq: [
      {
        question: "¿Por qué Softmax usa exponenciales?",
        answer:
          "Porque amplifica diferencias entre logits y garantiza probabilidades positivas que luego se normalizan para sumar 1.",
      },
      {
        question: "¿Qué significa el término -pi*pj fuera de la diagonal?",
        answer:
          "Mide competencia entre clases: aumentar el logit de una clase reduce probabilidad en las otras para conservar suma total 1.",
      },
    ],
    references: [
      { label: "Pattern Recognition and Machine Learning - Bishop", href: "https://link.springer.com/book/10.1007/978-0-387-45528-0" },
      { label: "Softmax function (Wikipedia)", href: "https://en.wikipedia.org/wiki/Softmax_function" },
    ],
  },
  temperature: {
    title: "Temperatura en LLMs - Simulador de inferencia y sampling",
    description:
      "Aprende cómo la temperatura escala logits antes de Softmax. Ajusta T y observa el impacto en creatividad, entropía y muestreo probabilístico token a token.",
    keywords:
      "temperatura llm, temperature sampling, inferencia, entropía, creatividad, monte carlo",
    ogTitle: "Temperatura de inferencia: controla creatividad vs precisión",
    ogDescription:
      "Simula cómo T cambia la distribución de salida y cómo se selecciona el siguiente token en un proceso estocástico.",
    ogImage: "/og/temperature.svg",
    tldr:
      "Temperatura baja vuelve la salida más determinista. Temperatura alta aplana la distribución y aumenta diversidad, con riesgo de incoherencia.",
    faq: [
      {
        question: "¿Qué pasa si uso temperatura muy baja?",
        answer:
          "El modelo tiende a repetir el token de mayor probabilidad. Mejora consistencia, pero reduce variedad y creatividad.",
      },
      {
        question: "¿Qué pasa si uso temperatura muy alta?",
        answer:
          "Las probabilidades se vuelven más uniformes. La salida puede ser más creativa pero también menos precisa o más ruidosa.",
      },
    ],
    references: [
      { label: "The Curious Case of Neural Text Degeneration", href: "https://arxiv.org/abs/1904.09751" },
      { label: "LLM decoding overview", href: "https://huggingface.co/blog/how-to-generate" },
    ],
  },
  chat: {
    title: "Tutor IA de matemáticas para LLMs - Respuestas en tiempo real",
    description:
      "Haz preguntas sobre Sigmoide, Softmax, gradientes y temperatura. Tutor IA con respuestas en español y notación matemática para aprendizaje guiado.",
    keywords:
      "tutor ia, matemáticas llm, chat educativo, softmax, sigmoide, gradientes",
    ogTitle: "Tutor IA para dudas de matemáticas en modelos de lenguaje",
    ogDescription:
      "Consulta conceptos, fórmulas y derivaciones con un asistente especializado en fundamentos matemáticos de LLMs.",
    ogImage: "/og/ia-tutor.svg",
    tldr:
      "El Tutor IA permite resolver dudas concretas sobre matemáticas de LLMs con ejemplos, fórmulas y explicaciones paso a paso en español.",
    faq: [
      {
        question: "¿Qué tipo de preguntas puedo hacer al tutor?",
        answer:
          "Puedes preguntar sobre logits, Sigmoide, Softmax, gradientes, entropía cruzada y temperatura de inferencia con casos prácticos.",
      },
      {
        question: "¿El tutor reemplaza la práctica interactiva?",
        answer:
          "No. Lo ideal es combinar chat y simuladores: primero experimentas, luego consultas dudas específicas para consolidar conceptos.",
      },
    ],
    references: [
      { label: "Attention Is All You Need", href: "https://arxiv.org/abs/1706.03762" },
      { label: "Google Gemini API docs", href: "https://ai.google.dev/gemini-api/docs" },
    ],
  },
};

export const ROUTE_KEY_BY_PATH: Record<string, RouteSeoKey> = {
  "/": "sigmoid",
  "/sigmoide-logit": "sigmoid",
  "/softmax-physics": "softmax",
  "/temperature": "temperature",
  "/ia-tutor": "chat",
};

export const ROUTE_LABEL_BY_KEY: Record<RouteSeoKey, string> = {
  sigmoid: "Sigmoide y Logit",
  softmax: "Softmax y Física",
  temperature: "Temperatura",
  chat: "Tutor IA",
};

export const ALL_ROUTE_PATHS = ["/", ...TABS.map((tab) => tab.path)];
