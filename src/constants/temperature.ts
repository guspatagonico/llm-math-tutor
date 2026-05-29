export const DEFAULT_TEMPERATURE = 1.0;
export const TEMPERATURE_MIN = 0.1;
export const TEMPERATURE_MAX = 5.0;
export const TEMPERATURE_STEP = 0.1;

export const EXAMPLE_PROMPTS = [
  "El gato saltó sobre el",
  "La inteligencia artificial es",
  "El aprendizaje profundo utiliza",
  "Hoy es un día muy",
] as const;

export const FALLBACK_CANDIDATES = [
  { token: " gato", logit: 8.5, explanation: "Sujeto común y altamente probable en este contexto lingüístico." },
  { token: " perro", logit: 7.2, explanation: "Otro animal doméstico muy común con alta probabilidad." },
  { token: " ratón", logit: 6.1, explanation: "Menos común, pero lógicamente posible según el verbo de acción." },
  { token: " tejado", logit: 5.4, explanation: "Un lugar físico al que se puede saltar o subir." },
  { token: " sofá", logit: 4.8, explanation: "Un objeto casero típico que sirve de destino para un salto." },
];

export const DEFAULT_LOGITS = [7.0, 4.0, 3.0, 1.0] as const;

export const TEMPERATURE_INTERPRETATIONS: { min: number; max: number; badge: string; text: string; color: string }[] = [
  { min: 0, max: 0.3, badge: "Baja entropía (casi Argmax)", text: "La distribución se concentra en los tokens de mayor logit. Disminuye la varianza del muestreo y aumenta la repetibilidad de salida.", color: "text-teal-400 bg-teal-500/10 border-teal-500/20" },
  { min: 0.3, max: 0.8, badge: "Régimen balanceado", text: "Mantiene coherencia sintáctica y semántica con diversidad moderada. Suele ser una zona robusta para texto general.", color: "text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/20" },
  { min: 0.8, max: 1.4, badge: "Alta diversidad controlada", text: "Reduce diferencias relativas entre logits, incrementa entropía y permite explorar continuaciones menos dominantes.", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { min: 1.4, max: 99, badge: "Entropía extrema", text: "La distribución se aproxima a una casi uniforme. Aumenta cobertura léxica, pero también el riesgo de incoherencia local.", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
];
