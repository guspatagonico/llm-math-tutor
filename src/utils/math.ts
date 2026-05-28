export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

export function softmax(logits: number[], temperature: number = 1): number[] {
  const scaled = logits.map((z) => z / temperature);
  const maxLogit = Math.max(...scaled);
  const exps = scaled.map((z) => Math.exp(z - maxLogit));
  const sumExp = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sumExp);
}

export function softmaxJacobian(logits: number[], temperature: number = 1): number[][] {
  const probs = softmax(logits, temperature);
  const n = probs.length;
  const jacobian: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        jacobian[i][j] = probs[i] * (1 - probs[i]);
      } else {
        jacobian[i][j] = -probs[i] * probs[j];
      }
    }
  }

  return jacobian;
}

export function normalizeSteps(
  candidates: { token: string; logit: number; explanation: string }[],
  temperature: number
): {
  token: string;
  logit: number;
  scaledLogit: number;
  exponential: number;
  probability: number;
}[] {
  return candidates.map((c) => {
    const scaledLogit = c.logit / temperature;
    const exponential = Math.exp(scaledLogit);
    const sumExp = candidates.reduce((sum, d) => sum + Math.exp(d.logit / temperature), 0);
    return {
      token: c.token,
      logit: c.logit,
      scaledLogit,
      exponential,
      probability: exponential / sumExp,
    };
  });
}

export function logit(p: number): number {
  return Math.log(p / (1 - p));
}
