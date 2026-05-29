---
title: Mathematical Utility Functions
summary: Provides mathematical utility functions for machine learning concepts, including sigmoid, softmax, softmaxJacobian, logit, and normalization steps for candidates.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-05-29T12:24:43.158Z'
updatedAt: '2026-05-29T12:24:43.158Z'
---
## Reason
Documenting math utility functions from src/utils/math.ts

## Raw Concept
**Task:**
Implement mathematical utility functions

**Files:**
- src/utils/math.ts

**Flow:**
Functions take numerical inputs (logits, probabilities) and perform transformations like activation (sigmoid), probability distribution calculation (softmax), and scaling.

## Narrative
### Structure
A collection of pure functions for common mathematical operations in ML. `softmax` and `softmaxJacobian` are key for understanding model outputs. `normalizeSteps` provides a detailed breakdown of the softmax calculation.

### Highlights
Includes temperature scaling in softmax, which is crucial for controlling the randomness of predictions.
