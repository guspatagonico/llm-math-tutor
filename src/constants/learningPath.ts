import { Sigma, Network, Flame, MessageSquare } from "lucide-react";

export const PATH_STEPS = [
  {
    title: "Fundamentos Matemáticos",
    detail:
      "Repasa probabilidad, estadística, álgebra lineal y cálculo multivariable. Estas bases sostienen logits, distribuciones y gradientes.",
    focus: "Pre-requisitos",
  },
  {
    title: "Modelado Probabilístico en Redes",
    detail:
      "Conecta salidas continuas de redes con interpretación probabilística en tareas binarias y multiclase.",
    focus: "Puente conceptual",
  },
  {
    title: "Arquitectura Transformer",
    detail:
      "Relaciona atención escalada, normalización Softmax y entrenamiento por entropía cruzada según Attention Is All You Need.",
    focus: "Contexto LLM",
  },
  {
    title: "Inferencia y Decoding",
    detail:
      "Comprende cómo temperatura y muestreo cambian diversidad, coherencia y control del texto generado.",
    focus: "Aplicación práctica",
  },
];

export const MODULE_MAP = [
  {
    icon: Sigma,
    title: "Sigmoide y Logit",
    href: "/sigmoide-logit",
    summary: "Mapeo entre espacio real y probabilidad binaria para clasificación y calibración inicial.",
  },
  {
    icon: Network,
    title: "Softmax y Física",
    href: "/softmax-physics",
    summary: "Distribuciones multiclase, Jacobiano y vínculo termodinámico de Boltzmann-Gibbs.",
  },
  {
    icon: Flame,
    title: "Temperatura",
    href: "/temperature",
    summary: "Escalado de logits y control del equilibrio entre precisión y diversidad en decoding.",
  },
  {
    icon: MessageSquare,
    title: "Tutor IA",
    href: "/ia-tutor",
    summary: "Refuerzo guiado con preguntas puntuales, intuiciones y validación conceptual paso a paso.",
  },
];
