### Key Points
- The API is exposed through a single PHP file: `api-proxy.php`.
- Routing is managed by a `?action=` query parameter in the URL.
- It defines three specific endpoints:
    - `POST ?action=predict-tokens`: For getting token predictions.
    - `POST ?action=tutor-chat`: For conversational AI responses.
    - `GET ?debug=1`: For server diagnostics.
- The proxy correctly handles HTTP `OPTIONS` requests for CORS preflight checks.
- An invalid or missing `action` parameter results in a `400 Bad Request` error.

### Structure Summary
This is a concise document structured into `Reason`, `Raw Concept`, and `Narrative`. The `Narrative` section is the core, containing three subsections: `Structure` (explaining the single entry point and routing), `Highlights` (listing the available endpoints and their functions), and `Rules` (detailing CORS handling and error responses).

### Notable Entities, Patterns, and Decisions
- **Entities**: `api-proxy.php`, `predict-tokens` action, `tutor-chat` action.
- **Patterns**:
    - **Query Parameter Routing**: The decision to use a query parameter (`?action=...`) for routing is a simple pattern that avoids the need for complex server-side routing rules (like `.htaccess`) or a dedicated routing library, making it ideal for a single-file API.
- **Decisions**:
    - **Explicit CORS Handling**: The decision to explicitly handle `OPTIONS` requests is crucial for allowing cross-origin communication from a web-based frontend.
    - **Dedicated Debug Endpoint**: Providing a specific `debug=1` endpoint is a deliberate choice to facilitate easier diagnostics and environment checks without making a live API call to the external service.
    - **Clear Error Signaling**: The rule to return a `400 Bad Request` for invalid actions provides a clear and standard-compliant way for clients to understand when they have made an invalid request.