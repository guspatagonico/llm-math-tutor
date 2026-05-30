import { useEffect } from "react";
import { ROUTE_KEY_BY_PATH, ROUTE_LABEL_BY_KEY, ROUTE_META, TODAY_ISO, type RouteSeoKey } from "../constants/seo";
import { fullPath, stripBase } from "../constants/routes";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => tag!.setAttribute(key, value));
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let tag = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!tag) {
    tag = document.createElement("link");
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => tag!.setAttribute(key, value));
}

export function getRouteKey(pathname: string): RouteSeoKey {
  const cleaned = stripBase(pathname);
  return ROUTE_KEY_BY_PATH[cleaned] || "sigmoid";
}

export function useRouteSeo(pathname: string) {
  useEffect(() => {
    const cleaned = stripBase(pathname);
    const routeKey = getRouteKey(pathname);
    const meta = ROUTE_META[routeKey];
    const canonicalUrl = `${window.location.origin}${fullPath(cleaned)}`;

    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: "description", content: meta.description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: meta.keywords });
    upsertMeta('meta[name="author"]', { name: "author", content: "Gustavo Adrián Salvini" });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" });

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "es_AR" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.ogTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: meta.ogDescription });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: `${window.location.origin}${fullPath(meta.ogImage)}` });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.ogTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.ogDescription });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `${window.location.origin}${fullPath(meta.ogImage)}` });

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    document.querySelectorAll("script[data-seo-jsonld='true']").forEach((el) => el.remove());

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "LLM Math Tutor",
      inLanguage: "es",
      url: fullPath("/"),
      author: {
        "@type": "Person",
        name: "Gustavo Adrián Salvini",
        url: "https://github.com/guspatagonico",
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: fullPath("/") },
        { "@type": "ListItem", position: 2, name: ROUTE_LABEL_BY_KEY[routeKey], item: fullPath(cleaned) },
      ],
    };

    const learningSchema = {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: meta.title,
      description: meta.description,
      learningResourceType: "Interactive Simulation",
      educationalUse: "Self Study",
      inLanguage: "es",
      dateModified: TODAY_ISO,
      datePublished: TODAY_ISO,
      isAccessibleForFree: true,
      author: { "@type": "Person", name: "Gustavo Adrián Salvini" },
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };

    [websiteSchema, breadcrumbSchema, learningSchema, faqSchema].forEach((schema) => {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [pathname]);
}
