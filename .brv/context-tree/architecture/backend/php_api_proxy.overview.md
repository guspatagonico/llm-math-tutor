### Key Points
- The backend is a single, self-contained PHP script (`api-proxy.php`) that acts as a secure proxy to the Google Gemini API.
- It securely manages the `GEMINI_API_KEY` on the server-side by reading it from a `.env` file, preventing client-side exposure.
- The proxy handles two primary actions: `predict-tokens` for generating likely next words and `tutor-chat` for conversational responses.
- It implements a robust fallback mechanism, providing hardcoded mock data (`FALLBACK_CANDIDATES`, `FALLBACK_TUTOR_REPLY`) if the API key is missing or an API call fails.
- The script is dependency-free, relying only on standard PHP and the cURL extension.
- It includes helper functions for loading environment variables (`loadenv`), making API calls (`curlpost`), and parsing responses (`extracttext`).
- A debug endpoint (`GET /api-proxy.php?debug=1`) is available to check server environment status.

### Structure Summary
The document is divided into `Reason`, `Raw Concept`, `Narrative`, and `Facts`. The `Narrative` section provides a high-level summary of the script's structure, dependencies, key features (Highlights), and operational rules. The `Facts` section offers a granular breakdown of all components, including specific functions, API endpoints, data formats (JSON), technologies (PHP, cURL), and detailed data flow descriptions for different scenarios (e.g., `frontend_to_backend_flow`, `fallback_data_flow`).

### Notable Entities, Patterns, and Decisions
- **Entities**: `api-proxy.php`, `Google Gemini API`, `GEMINI_API_KEY`, `.env` file, `curlpost` function, `handlepredicttokens` and `handletutorchat` handlers.
- **Patterns**:
    - **API Proxy Pattern**: The core architectural choice is to use a server-side proxy to abstract away and secure the external Gemini API. This centralizes API key management and request logic.
    - **Single-File Backend**: The decision to contain all backend logic in one file simplifies deployment and understanding for this small-scale application.
    - **Action-based Routing**: The script uses a `?action=` query parameter to route requests to the appropriate handler function, a simple but effective method for a single-entry-point API.
    - **Graceful Degradation**: The inclusion of fallback data is a key decision to ensure the frontend remains usable and provides a good user experience even when the backend cannot connect to the Gemini API.
- **Decisions**:
    - To build the proxy with vanilla PHP and cURL, avoiding external frameworks or libraries to maintain a lightweight footprint.
    - To implement a custom `.env` file loader with a fallback mechanism, ensuring configuration can be read reliably.