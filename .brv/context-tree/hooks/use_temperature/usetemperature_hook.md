---
title: useTemperature Hook
summary: A React hook that manages the state and logic for the temperature simulation, including fetching token candidates and recalculating probabilities.
tags: []
related: []
keywords: []
createdAt: '2026-05-29T12:28:53.023Z'
updatedAt: '2026-05-29T12:28:53.023Z'
---
## Reason
Curating from RLM context about the state management for the temperature simulator.

## Raw Concept
**Task:**
Manage state related to temperature-based token sampling simulation, including prompt, candidates, temperature, and prediction status.

**Files:**
- src/hooks/useTemperature.ts

**Flow:**
Initialize with default prompt and temperature -> Fetch initial candidates -> Recalculate probabilities when temperature or candidates change.

## Narrative
### Structure
The hook returns state variables (prompt, candidates, temperature, isPredicting, warningMsg, steps) and state setters or action functions (setPrompt, setTemperature, fetchCandidates).

### Dependencies
Uses `normalizeSteps` from `../utils/math` to calculate probabilities and `predictTokens` from `../services/api` to fetch candidates.

### Highlights
Decouples the state management from the UI component. Uses `useMemo` to efficiently recalculate the probability distribution (`steps`) only when candidates or temperature change.
