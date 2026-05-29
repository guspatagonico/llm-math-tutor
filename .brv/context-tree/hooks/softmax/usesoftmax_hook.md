---
title: useSoftmax Hook
summary: Calculates softmax probabilities for a given set of logits.
tags: []
related: []
keywords: []
createdAt: '2026-05-29T12:31:19.798Z'
updatedAt: '2026-05-29T12:31:32.868Z'
---
## Reason
Curate from RLM context for src/hooks

## Raw Concept
**Task:**
Calculate and manage softmax probabilities

**Files:**
- src/hooks/useSoftmax.ts

**Flow:**
Input logits -> apply temperature -> calculate softmax -> return probabilities

**Timestamp:** 2026-05-29T12:31:05.180Z

## Narrative
### Structure
A React hook that takes logits and temperature as input, and returns the computed softmax probabilities. It uses a `useMemo` to recompute only when inputs change.

### Dependencies
src/utils/math.ts

### Highlights
Includes temperature scaling for softmax calculation.
