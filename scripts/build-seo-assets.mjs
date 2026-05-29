import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("dist/index.html no existe. Ejecuta vite build antes.");
  process.exit(1);
}

const today = new Date().toISOString().split("T")[0];

const routes = [
  {
    path: "/",
    title: "LLM Math Tutor - Ruta de aprendizaje en IA, ML y LLMs",
    description:
      "Página de inicio con una ruta visual para ubicar Sigmoide, Softmax, Gradientes y Temperatura dentro del panorama IA/ML/LLMs.",
    keywords: "llm math tutor, ruta de aprendizaje, ia, ml, probabilidad, transformers",
    ogImage: "/og/home.svg",
    h1: "Ruta de aprendizaje para matemáticas de LLMs",
  },
  {
    path: "/sigmoide-logit",
    title: "Sigmoide y Logit en LLMs - Simulador Interactivo",
    description:
      "Aprende Sigmoide y Logit con un simulador visual. Entiende cómo los LLMs transforman logits continuos en probabilidades binarias.",
    keywords: "sigmoide, logit, logits, clasificación binaria, llm",
    ogImage: "/og/sigmoide-logit.svg",
    h1: "Función Sigmoide y Logit para modelos de lenguaje",
  },
  {
    path: "/softmax-physics",
    title: "Softmax y Jacobiano - Derivación y simulador para LLMs",
    description:
      "Explora Softmax desde su origen termodinámico hasta su matriz Jacobiana. Simula gradientes para entender backpropagation.",
    keywords: "softmax, jacobiano, gradiente, entropía cruzada, llm",
    ogImage: "/og/softmax-physics.svg",
    h1: "Softmax, Jacobiano y gradientes en modelos de lenguaje",
  },
  {
    path: "/temperature",
    title: "Temperatura en LLMs - Simulador de inferencia y sampling",
    description:
      "Ajusta temperatura, escala logits y observa el impacto en diversidad, entropía y muestreo probabilístico token a token.",
    keywords: "temperatura llm, sampling, inferencia, entropía",
    ogImage: "/og/temperature.svg",
    h1: "Temperatura de inferencia y sampling en LLMs",
  },
  {
    path: "/ia-tutor",
    title: "Tutor IA de matemáticas para LLMs - Respuestas en tiempo real",
    description:
      "Haz preguntas sobre Sigmoide, Softmax, gradientes y temperatura. Tutor IA con respuestas en español y notación matemática.",
    keywords: "tutor ia, matemáticas llm, softmax, sigmoide",
    ogImage: "/og/ia-tutor.svg",
    h1: "Tutor IA para matemáticas de modelos de lenguaje",
  },
];

const baseHtml = fs.readFileSync(indexPath, "utf8");

function replaceOrInsert(html, regex, replacement, fallback) {
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace("</head>", `${fallback}\n</head>`);
}

function toLdJson(route) {
  const learning = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: route.title,
    description: route.description,
    inLanguage: "es",
    educationalUse: "Self Study",
    learningResourceType: "Interactive Simulation",
    datePublished: today,
    dateModified: today,
    isAccessibleForFree: true,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "/sigmoide-logit" },
      { "@type": "ListItem", position: 2, name: route.h1, item: route.path },
    ],
  };
  return [learning, breadcrumb]
    .map((item) => `<script type="application/ld+json">${JSON.stringify(item)}</script>`)
    .join("\n");
}

function buildRouteHtml(route) {
  let html = baseHtml;
  html = html.replace(/<title>.*?<\/title>/is, `<title>${route.title}</title>`);
  html = replaceOrInsert(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="description" content="${route.description}" />`,
    `<meta name="description" content="${route.description}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/>/i,
    `<meta name="keywords" content="${route.keywords}" />`,
    `<meta name="keywords" content="${route.keywords}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:title" content="${route.title}" />`,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:description" content="${route.description}" />`,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:url" content="${route.path}" />`,
    `<meta property="og:url" content="${route.path}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:image" content="${route.ogImage}" />`,
    `<meta property="og:image" content="${route.ogImage}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:title" content="${route.title}" />`,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:description" content="${route.description}" />`,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  html = replaceOrInsert(
    html,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/i,
    `<meta name="twitter:image" content="${route.ogImage}" />`,
    `<meta name="twitter:image" content="${route.ogImage}" />`
  );
  html = replaceOrInsert(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?/i,
    `<link rel="canonical" href="${route.path}"`,
    `<link rel="canonical" href="${route.path}" />`
  );

  const noscript = `<noscript><section><h1>${route.h1}</h1><p>${route.description}</p><p>Actualizado: ${today}</p></section></noscript>`;
  html = html.replace("<div id=\"root\"></div>", `<div id="root"></div>\n${noscript}`);

  html = html.replace("</head>", `${toLdJson(route)}\n</head>`);
  return html;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const ogDir = path.join(distDir, "og");
ensureDir(ogDir);

for (const route of routes) {
  const routeDir = path.join(distDir, route.path.replace(/^\//, ""));
  ensureDir(routeDir);
  fs.writeFileSync(path.join(routeDir, "index.html"), buildRouteHtml(route));

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#312e81" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)" />
  <text x="72" y="220" fill="#e2e8f0" font-size="56" font-family="Arial, sans-serif" font-weight="700">LLM Math Tutor</text>
  <text x="72" y="300" fill="#cbd5e1" font-size="42" font-family="Arial, sans-serif">${route.title.replace(/&/g, "y")}</text>
  <text x="72" y="370" fill="#94a3b8" font-size="30" font-family="Arial, sans-serif">${route.path}</text>
</svg>`;
  fs.writeFileSync(path.join(ogDir, route.ogImage.split("/").pop()), svg, "utf8");
}

  const rootHtml = buildRouteHtml(routes[0]);
fs.writeFileSync(path.join(distDir, "index.html"), rootHtml);

const sitemapBody = ["/", "/sigmoide-logit", "/softmax-physics", "/temperature", "/ia-tutor"]
  .map(
    (routePath) => `<url><loc>${routePath}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  )
  .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapBody}</urlset>`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap, "utf8");

const robots = "User-agent: *\nAllow: /\n";
fs.writeFileSync(path.join(distDir, "robots.txt"), robots, "utf8");

const llmsTxt = `# LLM Math Tutor\n\n## Summary\n\nProyecto educativo interactivo para explicar matemáticas de modelos de lenguaje (LLMs): Sigmoide, Logit, Softmax, Jacobiano, Gradientes y Temperatura de inferencia.\n\n## Routes\n\n- [Inicio / Learning Path](/)\n- [Sigmoide y Logit](/sigmoide-logit)\n- [Softmax y Física](/softmax-physics)\n- [Temperatura](/temperature)\n- [Tutor IA](/ia-tutor)\n\n## Metadata\n\n- Idioma: español\n- Autor: Gustavo Adrián Salvini\n- Última actualización: ${today}\n`;
fs.writeFileSync(path.join(distDir, "llms.txt"), llmsTxt, "utf8");

console.log("SEO/SSG assets generados para rutas estáticas.");
