---
children_hash: 1aba140fa11a0e3887ded516062f1352c331f50b32518f28ae8bed99b27f0552
compression_ratio: 0.24631268436578171
condensation_order: 1
covers: [context.md, mathematical_utility_functions.md]
covers_token_total: 678
summary_level: d1
token_count: 167
type: summary
---
The `utils/math` topic, detailed in `mathematical_utility_functions.md`, centralizes mathematical utility functions from `src/utils/math.ts`. These standalone functions have no external dependencies.

Key functions include:
*   `softmax(values: number[])`: Converts a vector of numbers into a probability distribution.
*   `logit(value: number)`: Computes the log-odds of a probability.
*   `sigmoid(logit: number)`: The standard logistic function, serving as the inverse of `logit`.
*   `inverseSoftmax(probabilities: number[])`: An experimental function to reverse the softmax transformation. It is noted as an ill-posed problem because the solution is not unique.