- **Key Points**
    - Implements a React hook named `useSoftmax`.
    - Calculates softmax probabilities from a given array of logits.
    - Incorporates a `temperature` parameter to scale the logits before calculation, allowing for control over the output distribution's sharpness.
    - Uses the `useMemo` hook to optimize performance by re-computing probabilities only when logits or temperature inputs change.
    - Depends on a separate math utility file located at `src/utils/math.ts`.

- **Structure / Sections Summary**
    - **Reason:** States the purpose is to curate documentation for `src/hooks`.
    - **Raw Concept:** Briefly outlines the task (calculate softmax), the relevant file (`src/hooks/useSoftmax.ts`), and the data flow (logits -> temperature -> softmax -> probabilities).
    - **Narrative:** Describes the hook's structure, its inputs (logits, temperature), its use of `useMemo`, and its dependencies.

- **Notable Entities, Patterns, or Decisions**
    - **Entity:** `useSoftmax` React hook.
    - **Pattern:** Memoization of expensive computations in a React component using `useMemo`.
    - **Decision:** The inclusion of temperature scaling is a specific design choice to add flexibility to the softmax calculation.