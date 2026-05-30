<?php
/**
 * LLM Math Tutor — PHP API Proxy
 *
 * Intermediates all frontend API calls to Google Gemini.
 * Reads GEMINI_API_KEY from server-side .env — never exposed to the browser.
 *
 * Usage:
 *   POST /php-intelligence/api-proxy.php?action=predict-tokens   { "prompt": "..." }
 *   POST /php-intelligence/api-proxy.php?action=tutor-chat       { "messages": [...] }
 */

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// Debug mode: GET ?debug=1 shows env status without hitting Gemini
if ($_SERVER["REQUEST_METHOD"] === "GET" && ($_GET["debug"] ?? "") === "1") {
    header("Content-Type: application/json; charset=utf-8");
    $envPath = __DIR__ . "/.env";
    $exists  = file_exists($envPath);
    $readable = $exists && is_readable($envPath);
    $size    = $exists ? filesize($envPath) : 0;
    $env     = $exists ? loadEnv($envPath) : [];
    $hasKey  = !empty($env["GEMINI_API_KEY"]);
    echo json_encode([
        "env_path"    => $envPath,
        "exists"      => $exists,
        "readable"    => $readable,
        "size_bytes"  => $size,
        "keys_found"  => array_keys($env),
        "has_api_key" => $hasKey,
        "php_version" => phpversion(),
        "cwd"         => getcwd(),
        "__DIR__"     => __DIR__,
        "doc_root"    => $_SERVER["DOCUMENT_ROOT"] ?? "N/A",
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    exit;
}

// -- Config ---------------------------------------------------------------
$envPath = __DIR__ . "/.env";
$env = loadEnv($envPath);
$apiKey = $env["GEMINI_API_KEY"] ?? getenv("GEMINI_API_KEY") ?: null;
$model  = $env["GEMINI_MODEL"] ?? "gemini-2.5-flash";
$apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent";

function loadEnv(string $path): array
{
    if (!file_exists($path)) {
        return [];
    }

    // Try parse_ini_file first
    $ini = @parse_ini_file($path);
    if (is_array($ini)) {
        return $ini;
    }

    // Fallback: parse KEY=VALUE line by line
    $env = [];
    $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!is_array($lines)) {
        return [];
    }
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === "" || $line[0] === "#" || $line[0] === ";") {
            continue;
        }
        $eq = strpos($line, "=");
        if ($eq === false) {
            continue;
        }
        $key   = trim(substr($line, 0, $eq));
        $value = trim(substr($line, $eq + 1));
        // Strip surrounding quotes
        if ((($value[0] ?? "") === '"' && substr($value, -1) === '"')
            || (($value[0] ?? "") === "'" && substr($value, -1) === "'")) {
            $value = substr($value, 1, -1);
        }
        $env[$key] = $value;
    }
    return $env;
}

// -- Helpers --------------------------------------------------------------
function jsonInput(): array
{
    $raw  = file_get_contents("php://input");
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function curlPost(string $url, array $body): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode($body),
        CURLOPT_HTTPHEADER     => ["Content-Type: application/json"],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 30,
    ]);
    $response = curl_exec($ch);
    $err      = curl_error($ch);
    curl_close($ch);

    if ($err) {
        throw new \RuntimeException("cURL error: {$err}");
    }

    $decoded = json_decode($response, true);
    if ($decoded === null) {
        throw new \RuntimeException("Invalid JSON from Gemini: " . substr($response, 0, 200));
    }

    return $decoded;
}

function extractText(array $geminiResponse): ?string
{
    return $geminiResponse["candidates"][0]["content"]["parts"][0]["text"] ?? null;
}

// -- Fallback data --------------------------------------------------------
const FALLBACK_CANDIDATES = [
    ["token" => " gato",  "logit" => 8.5, "explanation" => "Sujeto común y altamente probable en este contexto lingüístico."],
    ["token" => " perro", "logit" => 7.2, "explanation" => "Otro animal doméstico muy común con alta probabilidad."],
    ["token" => " ratón", "logit" => 6.1, "explanation" => "Menos común, pero lógicamente posible según el verbo de acción."],
    ["token" => " tejado","logit" => 5.4, "explanation" => "Un lugar físico al que se puede saltar o subir."],
    ["token" => " sofá",  "logit" => 4.8, "explanation" => "Un objeto casero típico que sirve de destino para un salto."],
];

const FALLBACK_TUTOR_REPLY =
    "Hola! Soy tu tutor matemático. No tengo configurada la clave `GEMINI_API_KEY` en este momento, " .
    "por lo que responderé de forma simplificada: recuerda que la probabilidad \$P_i\$ en Softmax " .
    "se calcula como \$P_i = \\frac{e^{z_i/T}}{\\sum e^{z_j/T}}\$. " .
    "¡Configura tu clave de API para habilitar respuestas personalizadas completas de IA!";

// -- Routing --------------------------------------------------------------
$action = $_GET["action"] ?? "";

if ($action === "predict-tokens") {
    handlePredictTokens();
} elseif ($action === "tutor-chat") {
    handleTutorChat();
} else {
    http_response_code(400);
    echo json_encode(["error" => "Acción no válida. Usa ?action=predict-tokens o ?action=tutor-chat"]);
    exit;
}

// -- Handlers -------------------------------------------------------------

function handlePredictTokens(): void
{
    global $apiKey, $apiUrl;

    $body   = jsonInput();
    $prompt = $body["prompt"] ?? "";

    if ($prompt === "") {
        http_response_code(400);
        echo json_encode(["error" => "El prompt es requerido."]);
        return;
    }

    if (!$apiKey) {
        echo json_encode([
            "prompt"     => $prompt,
            "candidates" => FALLBACK_CANDIDATES,
            "warning"    => "Clave GEMINI_API_KEY no configurada. Usando candidatos didácticos predefinidos.",
        ]);
        return;
    }

    try {
        $payload = [
            "contents" => [[
                "parts" => [["text" => <<<PROMPT
El usuario quiere entender el funcionamiento de probabilidades en un LLM.
Te dará una frase o palabra incompleta. Tu tarea es actuar como la cabeza de predicción de un LLM (la capa final de pre-proyección antes de softmax).
Genera exactamente los 5 siguientes tokens MÁS probables en ESPAÑOL y asígnales valores de 'logits' realistas (pueden ser positivos o negativos, típicamente en un rango de -5 a +15, donde la diferencia entre el mejor logit y el resto represente visualmente la confianza).
Asigna también una breve explicación didáctica de una oración para cada uno de por qué obtuvo ese puntaje bruto.

Frase incompleta: "{$prompt}"
PROMPT
                ]],
            ]],
            "generationConfig" => [
                "responseMimeType" => "application/json",
                "responseSchema"   => [
                    "type"       => "object",
                    "properties" => [
                        "candidates" => [
                            "type"  => "array",
                            "items" => [
                                "type"       => "object",
                                "properties" => [
                                    "token"       => ["type" => "string", "description" => "El token propuesto (debe incluir el espacio inicial si corresponde, p. ej. ' gato')"],
                                    "logit"       => ["type" => "number", "description" => "Logit (puntuación flotante cruda en escala log-odds, de -5.0 a 15.0)"],
                                    "explanation" => ["type" => "string", "description" => "Explicación breve didáctica en español sobre su pertinencia semántica"],
                                ],
                                "required" => ["token", "logit", "explanation"],
                            ],
                        ],
                    ],
                    "required" => ["candidates"],
                ],
            ],
        ];

        $response = curlPost("{$apiUrl}?key={$apiKey}", $payload);
        $text     = extractText($response);

        if ($text === null) {
            throw new \RuntimeException("No se obtuvo respuesta válida del modelo");
        }

        $result = json_decode($text, true);
        echo json_encode([
            "prompt"     => $prompt,
            "candidates" => $result["candidates"] ?? FALLBACK_CANDIDATES,
            "warning"    => "",
        ]);
    } catch (\Throwable $e) {
        echo json_encode([
            "prompt"     => $prompt,
            "candidates" => FALLBACK_CANDIDATES,
            "warning"    => "Error al conectar con la API de Gemini ({$e->getMessage()}). Usando candidatos de respaldo.",
        ]);
    }
}

function handleTutorChat(): void
{
    global $apiKey, $apiUrl;

    $body     = jsonInput();
    $messages = $body["messages"] ?? null;

    if (!is_array($messages)) {
        http_response_code(400);
        echo json_encode(["error" => "Historial de mensajes inválido."]);
        return;
    }

    if (!$apiKey) {
        echo json_encode([
            "reply"   => FALLBACK_TUTOR_REPLY,
            "warning" => "Clave GEMINI_API_KEY no configurada. Respuestas pregrabadas.",
        ]);
        return;
    }

    try {
        $contents = array_map(function (array $m): array {
            $role = $m["sender"] === "user" ? "user" : "model";
            return [
                "role"  => $role,
                "parts" => [["text" => $m["text"]]],
            ];
        }, $messages);

        $payload = [
            "systemInstruction" => [
                "parts" => [["text" => <<<SYS
Eres un tutor experto en Inteligencia Artificial y Matemáticas Especializadas.
Explicas conceptos complejos como sigmoid, logit, softmax, gradientes de softmax, entropía, y temperatura
de manera sumamente didáctica, clara, y amigable, utilizando analogías accesibles y expresiones matemáticas limpias en formato LaTeX si es necesario.
Mantén tus respuestas bien estructuradas, lúdicas y en español.
SYS
                ]],
            ],
            "contents" => $contents,
        ];

        $response = curlPost("{$apiUrl}?key={$apiKey}", $payload);
        $text     = extractText($response);

        echo json_encode([
            "reply"   => $text ?? "No logré generar una respuesta. Por favor reintenta.",
            "warning" => "",
        ]);
    } catch (\Throwable $e) {
        http_response_code(500);
        echo json_encode([
            "error" => "Error al procesar tu pregunta con la IA Tutor: {$e->getMessage()}",
        ]);
    }
}
