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
