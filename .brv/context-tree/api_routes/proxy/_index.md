---
children_hash: 25b83c320182f80b09e7c67d0e1491bb687a414b46836ce9b35d9879dcb0464e
compression_ratio: 0.19977553310886645
condensation_order: 1
covers: [php_proxy_endpoints.md]
covers_token_total: 891
summary_level: d1
token_count: 178
type: summary
---
The PHP proxy, detailed in `php_proxy_endpoints.md`, uses a single entry point (`backend/api-proxy.php`) with a `?action=` query parameter for routing. This architectural choice simplifies routing by avoiding complex server-side rules.

Key endpoints include:
-   **`POST ?action=predict-tokens`**: For predicting the next five likely tokens from a given prompt.
-   **`POST ?action=tutor-chat`**: For handling conversational AI interactions.
-   **`GET ?action=debug=1`**: A dedicated endpoint for diagnostics, returning server environment details.

The proxy explicitly handles CORS `OPTIONS` preflight requests and returns a `400 Bad Request` for invalid actions, ensuring clear error signaling for clients.