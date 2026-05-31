---
title: PHP API Proxy
summary: A self-contained PHP script (api-proxy.php) that securely proxies frontend requests to the Google Gemini API, handling API key management, request routing, and fallback data.
tags: []
related: []
keywords: []
createdAt: '2026-05-31T00:13:34.650Z'
updatedAt: '2026-05-31T00:13:34.650Z'
---
## Reason
Documenting the PHP-based backend proxy for the LLM Math Tutor application from RLM context.

## Raw Concept
**Task:**
Document the architecture and functionality of the PHP API proxy.

**Files:**
- backend/api-proxy.php

**Flow:**
Frontend -> api-proxy.php -> Google Gemini API -> api-proxy.php -> Frontend

**Timestamp:** 2026-05-31T00:12:19.318Z

**Author:** ByteRover Agent

## Narrative
### Structure
The backend consists of a single file, `api-proxy.php`, which includes routing, request handlers, cURL helpers, and .env loading logic. It supports two main actions: `predict-tokens` and `tutor-chat`.

### Dependencies
Depends on PHP with the cURL extension. No external libraries are used.

### Highlights
Securely manages the `GEMINI_API_KEY` on the server-side, preventing exposure to the client. Implements a robust fallback mechanism to provide default data if the API key is missing or if API calls fail, ensuring a graceful user experience.

### Rules
All communication with the Gemini API is intermediated by this proxy.\nThe API key is read from a server-side .env file.\nHandles CORS preflight OPTIONS requests.\nProvides a debug endpoint GET /api-proxy.php?debug=1.

## Facts
- **api-proxy.php**: A self-contained PHP script that serves as the sole backend component, acting as a secure proxy between the frontend and the Google Gemini API.
- **loadenv**: A PHP function within the proxy that reads configuration from a .env file, first attempting to use `parse_ini_file` and then falling back to a manual line-by-line parser.
- **curlpost**: A helper function that uses the PHP cURL library to send JSON POST requests to the Google Gemini API, with a 30-second timeout.
- **extracttext**: A utility function designed to parse the JSON response from the Gemini API and extract the generated text from the path `candidates[0].content.parts[0].text`.
- **handlepredicttokens**: A request handler function that processes requests for the 'predict-tokens' action, constructing a specific prompt for the LLM to generate the 5 most likely next tokens.
- **handletutorchat**: A request handler function that processes requests for the 'tutor-chat' action, forwarding chat messages to the LLM for a conversational response.
- **fallback_data**: The script includes predefined PHP constants (`FALLBACK_CANDIDATES`, `FALLBACK_TUTOR_REPLY`) to serve as mock data when the `GEMINI_API_KEY` is not configured.
- **php**: The primary backend programming language used for the API proxy script.
- **php**: The primary server-side scripting language used to build the application's backend.
- **curl**: The PHP library used to make server-to-server HTTP requests to the Google Gemini API.
- **curl**: The library used within the PHP backend to execute HTTP requests to the external Gemini API.
- **google_gemini_api**: The external LLM service used by the backend to generate token predictions and chat responses.
- **json**: The data format used for communication between the frontend and backend, and between the backend and the Gemini API.
- **json**: The data interchange format used for all communication between the frontend, the PHP backend, and the Gemini API.
- **post_predict-tokens**: The endpoint `POST /api-proxy.php?action=predict-tokens` accepts a JSON body with a `prompt` and returns a list of 5 likely next tokens with explanations.
- **post_tutor-chat**: The endpoint `POST /api-proxy.php?action=tutor-chat` accepts a JSON body with a `messages` array and returns a conversational response from the LLM.
- **get_debug**: The endpoint `GET /api-proxy.php?debug=1` provides server environment status, including `.env` file details and PHP version, without calling the Gemini API.
- **options_cors**: The script handles HTTP OPTIONS requests to respond to CORS preflight checks, allowing cross-origin requests from the frontend.
- **frontend_to_backend_flow**: The frontend initiates communication by sending a JSON payload via a POST request to the `api-proxy.php` script.
- **backend_data_flow**: The PHP proxy receives the frontend request, reads the secret `GEMINI_API_KEY` from a server-side `.env` file, constructs a new request payload, and forwards it to the Google Gemini API.
- **backend_to_frontend_flow**: After receiving a response from the Gemini API, the PHP proxy script parses the data and sends a final JSON response back to the frontend client.
- **fallback_data_flow**: If the `GEMINI_API_KEY` is missing, the backend script bypasses the call to the Gemini API and immediately returns a predefined, hardcoded JSON response to the frontend.
- **api_php**: A single-file PHP backend that acts as a router, directing requests to specific handler functions based on an 'action' query parameter.
- **handleNextTokenPrediction**: A backend handler function that receives an incomplete sentence, queries the Gemini API for the next possible tokens with their logits and explanations, and returns them to the client.
- **handleTutorChat**: A backend handler function that manages a conversational chat with an AI tutor. It receives the message history, sends it to the Gemini API with a system instruction, and returns the generated reply.
- **curlPost**: A utility function within the backend responsible for making POST requests with JSON payloads to the Gemini API using the cURL library.
- **jsonInput**: A backend helper function that reads the raw POST body and decodes it from a JSON string into a PHP associative array.
- **extractText**: A backend helper function designed to parse the JSON response from the Gemini API and extract the main text content from the first candidate part.
- **fallback_logic**: The backend implements fallback logic using constants like `FALLBACK_CANDIDATES` and `FALLBACK_TUTOR_REPLY` to provide default responses when the Gemini API key is not configured or an API call fails.
- **gemini_api**: The external Large Language Model API used as the core intelligence for both next-token prediction and the AI tutor chat functionality.
- **api_next_token_prediction**: The endpoint `/api.php?action=next-token-prediction` accepts a POST request with a JSON body containing a 'prompt' and returns a list of candidate next tokens.
- **api_tutor_chat**: The endpoint `/api.php?action=tutor-chat` accepts a POST request with a JSON body containing a 'messages' array (conversation history) and returns a text reply from the AI tutor.
- **next_token_prediction_data_flow**: A user's text prompt is sent to the backend, which constructs a detailed payload with a specific JSON response schema for the Gemini API. The API's structured JSON response is then parsed and forwarded back to the frontend.
- **tutor_chat_data_flow**: The frontend sends the entire conversation history to the backend. The backend formats this history, adds a system instruction for the AI's persona, sends it to the Gemini API, and returns the generated text reply to the frontend.
