---
children_hash: 5127ee4a662d5c4464d7c78452acb42bbe2526e0195cbd9275f978d628f5708c
compression_ratio: 0.7256637168141593
condensation_order: 1
covers: [context.md, usesoftmax_hook.md]
covers_token_total: 226
summary_level: d1
token_count: 164
type: summary
---
# Softmax Hook

This topic covers the `useSoftmax` React hook, detailed in **usesoftmax_hook.md**.

## `useSoftmax` Hook

-   **Purpose**: A React hook designed to calculate and manage softmax probabilities from a given set of logits.
-   **Core Logic**: It takes logits and a temperature value as input, applies temperature scaling, and then computes the final softmax probabilities.
-   **Implementation**:
    -   Source file: `src/hooks/useSoftmax.ts`.
    -   Dependency: Relies on utility functions from `src/utils/math.ts`.
    -   Optimization: Uses `useMemo` to ensure probabilities are only recomputed when the input logits or temperature change.