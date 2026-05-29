---
children_hash: 18b5feca62a167f8629e5421b8daf43e9cd30302a4caf64609fa3ca23394d5ae
compression_ratio: 0.3516791044776119
condensation_order: 2
covers: [context.md, overview/_index.md, seo/_index.md, softmax/_index.md, tutor_chat/_index.md, use_temperature/_index.md]
covers_token_total: 1072
summary_level: d2
token_count: 377
type: summary
---
# Domain: hooks

This domain contains custom React hooks that encapsulate and manage stateful logic for the application, including component state, data fetching, and business logic.

### Hook Topics

-   **SEO (`seo`)**: Covers the `useRouteSeo` hook, which dynamically manages page titles and meta descriptions based on the current route. As detailed in `userouteseo_hook.md`, it is implemented in `src/hooks/useRouteSeo.ts` and uses metadata from `src/constants/seo.ts`.

-   **Softmax (`softmax`)**: Details the `useSoftmax` hook from `src/hooks/useSoftmax.ts`. This hook calculates and manages softmax probabilities from a set of logits and a temperature value, using `useMemo` for performance optimization. The core logic is described in `usesoftmax_hook.md`.

-   **Tutor Chat (`tutor_chat`)**: Focuses on the `useTutorChat` hook, which manages the AI tutor chat interface's state, including message history and loading status. Documented in `usetutorchat_hook.md`, this hook, located at `src/hooks/useTutorChat.ts`, interacts with the API service (`src/services/api.ts`) to send and receive messages, with support for streaming.

-   **Temperature Simulation (`use_temperature`)**: Describes the `useTemperature` hook from `src/hooks/useTemperature.ts`, which handles the state and logic for the temperature-based token sampling simulation. As noted in `usetemperature_hook.md`, it uses `useMemo` to efficiently recalculate probability distributions and fetches token predictions via the API service.