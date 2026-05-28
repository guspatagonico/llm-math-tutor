export interface NormalizationStep {
  token: string;
  logit: number;
  scaledLogit: number;
  exponential: number;
  probability: number;
}

export interface GradientCell {
  row: number;
  col: number;
  value: number;
}
