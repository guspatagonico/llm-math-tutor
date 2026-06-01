---
children_hash: 040846d7b1c457b5ae59d647adf85657f168928f3017629d4231a136073ba40a
compression_ratio: 0.19976324356318437
condensation_order: 3
covers: [api_routes/_index.md, architecture/_index.md, frontend/_index.md, hooks/_index.md, project/_index.md, services/_index.md, types/_index.md, ui_components/_index.md, utils/_index.md]
covers_token_total: 3379
summary_level: d3
token_count: 675
type: summary
---
# LLM Math Tutor Project Summary

This document provides a structural overview of the LLM Math Tutor project, a Single Page Application built with React, TypeScript, and Vite, featuring an Express backend. The project's architecture, detailed in the **architecture** domain, was refactored from a monolith to a modular system to improve maintainability, establishing clear domains for services, hooks, components, and types as outlined in `architectural_analysis_and_refactoring_plan.md`.

### Core Architecture & Backend

The application utilizes a **dual backend architecture** to support different environments: a Node.js/Express server for development and a dependency-free PHP proxy for production. Key architectural patterns include a centralized singleton client for the Gemini AI service (`gemini_ai_client.md`) with graceful degradation (returning hardcoded data if the API key is missing) and a strictly type-safe API layer documented in `type-safe-client-server-api-layer.md`.

The **api_routes** domain covers the two primary endpoints:
*   `/api/tutor-chat`: Manages the conversational AI logic, detailed in `ai_tutor_chat_endpoint.md`.
*   `/api/predict-tokens`: Simulates an LLM's prediction head, as described in `token_prediction_endpoint.md`.

### Frontend Structure

The **frontend** is organized into distinct domains for logic and configuration:

*   **UI Components (`ui_components`)**: Contains 12 modular React components for the core interface (`component_collection.md`), including interactive visualizations like `SigmoidLogitModule.tsx` and `TemperatureSimulator.tsx`.
*   **Hooks (`hooks`)**: Encapsulates stateful logic. Key hooks include:
    *   `useTutorChat`: Manages the AI chat state (`usetutorchat_hook.md`).
    *   `useTemperature`: Handles the token sampling simulation (`usetemperature_hook.md`).
    *   `useSoftmax`: Calculates softmax probabilities (`usesoftmax_hook.md`).
    *   `useRouteSeo`: Manages dynamic SEO metadata (`userouteseo_hook.md`).
*   **Services (`services`)**: Provides client-side wrappers for external interactions. This includes a type-safe client for the application backend (`api_client_service.md`) and the singleton for the Gemini API.
*   **Types (`types`)**: Centralizes core data structures for API communication in `src/types/api.ts`, as detailed in `api_data_structures.md`.
*   **Constants (`frontend/constants`)**: Manages application configurations for routes, SEO, and AI model settings, organized by feature in `src/constants`.
*   **Utils (`utils`)**: Contains standalone mathematical utility functions like `softmax`, `sigmoid`, and `logit` from `src/utils/math.ts`, documented in `mathematical_utility_functions.md`.