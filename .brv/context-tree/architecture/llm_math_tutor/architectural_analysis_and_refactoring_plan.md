---
title: Architectural Analysis and Refactoring Plan
summary: Architectural analysis of the LLM Math Tutor project, identifying violations of DRY, SOLID, and KISS, and proposing a major refactoring from a monolithic to a modular structure.
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-05-29T12:23:17.236Z'
updatedAt: '2026-05-29T12:23:17.236Z'
consolidated_at: '2026-05-29T12:48:10.501Z'
consolidated_from: [{date: '2026-05-29T12:48:10.501Z', path: architecture/llm_math_tutor/architectural_analysis_and_refactoring_plan.abstract.md, reason: 'The ''architectural_analysis_and_refactoring_plan.md'' file contains the full, detailed content. The ''overview.md'' file is a summary derived entirely from the main file, making its content redundant. The ''abstract.md'' file is a placeholder with no content. Merging all three into the main file consolidates the information and removes redundant and empty files.'}, {date: '2026-05-29T12:48:10.501Z', path: architecture/llm_math_tutor/architectural_analysis_and_refactoring_plan.overview.md, reason: 'The ''architectural_analysis_and_refactoring_plan.md'' file contains the full, detailed content. The ''overview.md'' file is a summary derived entirely from the main file, making its content redundant. The ''abstract.md'' file is a placeholder with no content. Merging all three into the main file consolidates the information and removes redundant and empty files.'}]
---
## Reason
Curating the architectural analysis of the LLM Math Tutor project, focusing on DRY, SOLID, and KISS principle violations and the proposed refactoring.

## Raw Concept
**Task:**
Analyze and refactor the LLM Math Tutor application architecture.

**Files:**
- ARCHITECTURE_ANALYSIS.md
- server.ts
- src/App.tsx
- src/components/MathMarkdownRenderer.tsx
- src/components/SigmoidLogitModule.tsx
- src/components/SoftmaxGradientModule.tsx
- src/components/TemperatureSimulator.tsx
- src/components/AITutorChat.tsx

**Flow:**
Analysis of monolithic structure -> Identification of principle violations -> Proposal of modular structure -> Prioritization of refactoring tasks.

**Timestamp:** 2026-05-29T12:22:50.490Z

## Narrative
### Structure
The project was initially structured with 9 monolithic files and was refactored into approximately 30 organized files based on software design principles. The proposed structure introduces clear separation of concerns with directories for services, hooks, components (layout, modules, chat, shared), constants, types, and utils.

### Dependencies
The frontend relies on React, TypeScript, and Vite. The backend uses Express. The AI functionality is powered by the Gemini API.

### Highlights
Identified 3 critical DRY violations, including duplicated Gemini API logic and inline mathematical formulas.
- Found 6 SOLID principle violations, most notably the Single Responsibility Principle in `server.ts` and `MathMarkdownRenderer.tsx`.
- Uncovered 2 instances of over-engineering (KISS violations), especially a 614-line custom markdown parser.
- Proposed a new modular directory structure to improve maintainability and scalability.
- Prioritized refactoring tasks, with replacing the custom markdown parser as the highest priority (P0).

### Rules
DRY Fix: Centralize Gemini client into a singleton in `services/gemini.ts`.
- DRY Fix: Create a shared `MathMarkdownRenderer` component.
- DRY Fix: Implement a typed fetch wrapper in `src/services/api.ts`.
- SOLID Fix: Use single-responsibility hooks like `useSoftmax`, `useTemperature`, and `useTutorChat`.
- SOLID Fix: Employ dependency inversion with a typed API client.
- KISS Fix: Replace the custom markdown parser with `react-markdown` and `rehype-katex`.
- KISS Fix: Extract magic numbers from `TemperatureSimulator.tsx` into `constants/temperature.ts`.