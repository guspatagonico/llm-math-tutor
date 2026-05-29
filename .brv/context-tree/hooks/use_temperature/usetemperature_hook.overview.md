### Key Points
- This document describes a custom React hook, `useTemperature`.
- The hook's primary function is to manage the state and logic for the temperature simulation feature.
- It handles state variables such as `prompt`, `candidates`, `temperature`, and `isPredicting`.
- It fetches token candidates by calling an API service (`predictTokens`).
- It recalculates token probabilities whenever the temperature or the list of candidates changes.
- The hook decouples the complex state management from the UI component, promoting cleaner code.
- It uses the `useMemo` hook for performance optimization, ensuring that probability distributions are only recalculated when necessary.

### Structure Summary
The document is organized into three main parts:
- **Reason:** Explains that the document's purpose is to curate information about the state management for the temperature simulator.
- **Raw Concept:** Defines the task (state management), specifies the file (`src/hooks/useTemperature.ts`), and describes the logical flow (initialize state, fetch data, recalculate on change).
- **Narrative:** Details the hook's public interface (returned state and functions), lists its dependencies (`normalizeSteps` utility, `predictTokens` API service), and highlights key implementation choices like decoupling and memoization.

### Notable Mentions
- **Entities:** `useTemperature.ts` (hook), `normalizeSteps` (math utility function), `predictTokens` (API service function).
- **Patterns:** Custom React Hook pattern for encapsulating and reusing stateful logic. Memoization (`useMemo`) to optimize expensive computations.
- **Decisions:** The architectural decision to abstract the temperature simulation logic into a dedicated hook, separating it from the presentation layer. The performance-conscious decision to use `useMemo` to avoid redundant probability calculations.