---
children_hash: ecfd39839fd1afcceef9358422b4fbe6559c47b15b6d8012b1effc73e36f4541
compression_ratio: 0.51931330472103
condensation_order: 1
covers: [api_data_structures.md]
covers_token_total: 233
summary_level: d1
token_count: 121
type: summary
---
## API Data Structures

The `types/api` domain defines the core data structures for API communication, sourced from `src/types/api.ts`.

- **`api_data_structures.md`**: Documents the primary interfaces for API request and response payloads. Key types include `Candidate` for token predictions, `Message` for chat, and the main response types `PredictTokensResponse` and `TutorChatResponse`. This establishes a clear separation of API types into a distinct module for maintainability.