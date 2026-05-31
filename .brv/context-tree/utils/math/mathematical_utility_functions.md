---
title: Mathematical Utility Functions
summary: A collection of mathematical utility functions for calculations like softmax, logit, and sigmoid, along with an experimental inverse softmax.
tags: []
related: []
keywords: []
createdAt: '2026-05-29T12:24:43.158Z'
updatedAt: '2026-05-31T00:11:36.486Z'
---
## Reason
Documenting the mathematical utility functions from src/utils/math.ts

## Raw Concept
**Task:**
Document the mathematical utility functions found in 'src/utils/math.ts'.

**Files:**
- src/utils/math.ts

**Flow:**
Standalone utility functions imported and used by various components for mathematical calculations.

**Timestamp:** 2026-05-31T00:11:05.885Z

## Narrative
### Structure
The file 'src/utils/math.ts' exports several mathematical functions.

### Dependencies
Relies only on the standard `Math` object. No external libraries.

### Highlights
softmax(values: number[]): number[] - Converts an array of numbers into a probability distribution.
logit(value: number): number - Computes the logit (log-odds) of a probability.
sigmoid(logit: number): number - The standard logistic function, inverse of logit.
inverseSoftmax(probabilities: number[]): number[] - An experimental function to reverse the softmax transformation. The code notes this is an ill-posed problem as the solution is not unique.

## Facts
- **softmax_function_purpose**: The softmax function converts a vector of numbers into a probability distribution. [project]
- **logit_sigmoid_relationship**: The logit function is the inverse of the sigmoid function. [project]
- **inverse_softmax_problem**: Reversing the softmax function is an ill-posed problem because the solution is not unique (any constant can be added to the logits). [project]
