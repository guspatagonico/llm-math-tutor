---
children_hash: 86e254895a3cfb1556d2bacaa676fa606f2abdeb5484720a49362444ad5fa9ae
compression_ratio: 0.27697974217311233
condensation_order: 3
covers: [api_routes/_index.md, architecture/_index.md, hooks/_index.md, project/_index.md, services/_index.md, types/_index.md, ui_components/_index.md, utils/_index.md]
covers_token_total: 2715
summary_level: d3
token_count: 752
type: summary
---
## LLM Math Tutor Project Summary

This document provides a structural overview of the LLM Math Tutor project, a Single Page Application built with React, TypeScript, and Vite, featuring an Express backend and integration with the Gemini API. The project's architecture, detailed in **`architecture/_index.md`**, underwent a significant refactoring to enforce a modular design with a clear separation of concerns.

### Core Architecture

Key architectural decisions focus on creating a robust and maintainable system:

*   **Type-Safe API Layer**: As documented in **`architecture/type-safe-client-server-api-layer.md`**, a strict contract exists between the client and server. This is achieved through shared data structures in **`types/api`**, server-side endpoints in **`api_routes`**, and a strongly-typed client-side wrapper in **`services/api`**.
*   **Centralized Gemini Client**: All interactions with the Google Gemini API are managed by a singleton client defined in `services/gemini.ts`. The API routes, described in **`api_routes/_index.md`**, implement graceful degradation with hardcoded fallbacks to ensure application stability if the Gemini API key is missing.

### Backend API

The backend, documented in **`api_routes/_index.md`**, exposes two primary endpoints:

*   **Token Prediction (`/api/predict-tokens`)**: Simulates an LLM's prediction head using the Gemini API.
*   **Tutor Chat (`/api/tutor-chat`)**: Manages the core AI tutor chat functionality, using a detailed system prompt to define the tutor's persona.

### Frontend Structure

The frontend is organized into services, hooks, UI components, and utilities.

*   **Services (`services/_index.md`)**: Client-side services encapsulate external communication. The **API Client** (`services/api`) provides type-safe functions for backend calls, while the **Gemini AI Client** (`services/gemini`) manages interactions with the Google Gemini API.

*   **React Hooks (`hooks/_index.md`)**: Custom hooks manage stateful logic. Key hooks include:
    *   `useTutorChat`: Manages the AI tutor chat state and API interactions.
    *   `useTemperature`: Handles logic for the temperature-based token sampling simulation.
    *   `useSoftmax`: Calculates softmax probabilities from logits and temperature.
    *   `useRouteSeo`: Manages dynamic page titles and meta descriptions.

*   **UI Components (`ui_components/_index.md`)**: The application's UI is built from a collection of modular React components found in `src/components`. This includes core layout components, math renderers (`MathEquation.tsx`), and interactive educational modules like the **`SigmoidLogitModule`** and **`TemperatureSimulator`**, which provide visualizations of machine learning concepts.

*   **Utilities (`utils/_index.md`)**: Reusable helper functions are centralized in the `utils` domain. The **`utils/math`** module provides pure mathematical functions for machine learning operations like `sigmoid`, `logit`, and `softmax` with temperature scaling.