---
children_hash: 676729185700264b91175ea287339ceadad0d8d50b78a4b0183c398e45371cca
compression_ratio: 0.22385479688850476
condensation_order: 1
covers: [component_collection.md]
covers_token_total: 1157
summary_level: d1
token_count: 259
type: summary
---
The `ui_components` domain covers the React components that form the user interface for the LLM Math Tutor application.

### LLM Math Tutor Components (`component_collection.md`)

The `src/components` directory contains 12 modular React components responsible for UI rendering, mathematical equation display, user interaction, and SEO. The components rely on React and use KaTeX for math rendering.

Key components include:
*   **Core Interface:** `AITutorChat.tsx` provides the central AI tutor chat interface.
*   **Math Rendering:** `MathEquation.tsx` and `MathMarkdownRenderer.tsx` handle the display of mathematical formulas and content.
*   **Interactive Modules:** `SigmoidLogitModule.tsx`, `SoftmaxGradientModule.tsx`, and `TemperatureSimulator.tsx` offer interactive visualizations for specific mathematical concepts.
*   **Learning Path:** `HomeLearningPath.tsx` and `PathwayBanner.tsx` are dedicated to displaying the user's learning progression.
*   **SEO:** `SeoBlocks.tsx` is responsible for rendering SEO-related metadata.