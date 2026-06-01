---
children_hash: e75941696ba23ec5f24d588bb5a72f500bdcb177da8896c62437d5be9ff834b7
compression_ratio: 0.6458333333333334
condensation_order: 2
covers: [context.md, math/_index.md]
covers_token_total: 288
summary_level: d2
token_count: 186
type: summary
---
The `utils` domain centralizes utility functions, including helper functions and standalone scripts, while excluding UI components and API routes.

A key topic within this domain is `utils/math`, which contains mathematical utility functions from `src/utils/math.ts`. These functions are standalone with no external dependencies. The primary functions, detailed in `mathematical_utility_functions.md`, include:

*   **`softmax(values: number[])`**: Converts numbers into a probability distribution.
*   **`logit(value: number)`**: Computes log-odds.
*   **`sigmoid(logit: number)`**: The inverse of the `logit` function.
*   **`inverseSoftmax(probabilities: number[])`**: An experimental and ill-posed function to reverse the softmax operation.