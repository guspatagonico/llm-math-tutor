---
children_hash: 12bd9b8ef15da712d6a8a8a037f765fa302a38e0e27548f5b7b7edeab5b6879d
compression_ratio: 0.6163793103448276
condensation_order: 1
covers: [context.md, usetutorchat_hook.md]
covers_token_total: 232
summary_level: d1
token_count: 143
type: summary
---
# Tutor Chat Hook (`tutor_chat`)

This topic covers the `useTutorChat` React hook, which encapsulates the logic for the AI tutor chat interface.

-   **`usetutorchat_hook.md`**: This entry details the `useTutorChat` hook, defined in `src/hooks/useTutorChat.ts`. It is responsible for managing the chat's state, including message history, loading status, and error handling. The hook exposes functions to send messages, which call the API service defined in `src/services/api.ts`, and then updates the chat history with the AI's response, including support for streaming.