# SEO/GEO Deploy Checklist

## 1) Variables y build
- [ ] Crear `.env` a partir de `.env.example`.
- [ ] Definir `VITE_GA_MEASUREMENT_ID` con el ID real de Google Analytics.
- [ ] Ejecutar `npm run build` y validar que termine sin errores.

## 2) Artefactos generados
- [ ] Confirmar existencia de `dist/sitemap.xml`.
- [ ] Confirmar existencia de `dist/robots.txt`.
- [ ] Confirmar existencia de `dist/llms.txt`.
- [ ] Confirmar existencia de rutas estáticas:
  - [ ] `dist/sigmoide-logit/index.html`
  - [ ] `dist/softmax-physics/index.html`
  - [ ] `dist/temperature/index.html`
  - [ ] `dist/ia-tutor/index.html`
- [ ] Confirmar OG dinámicas:
  - [ ] `dist/og/sigmoide-logit.svg`
  - [ ] `dist/og/softmax-physics.svg`
  - [ ] `dist/og/temperature.svg`
  - [ ] `dist/og/ia-tutor.svg`

## 3) Verificación runtime
- [ ] Verificar redirect `/` -> `/sigmoide-logit`.
- [ ] Verificar metadata por ruta (title, description, canonical, og:url, og:image).
- [ ] Verificar JSON-LD por ruta (WebSite, BreadcrumbList, LearningResource, FAQPage).

## 4) QA SEO/GEO
- [ ] Lighthouse desktop en cada ruta: SEO 100.
- [ ] Rich Results Test sin errores críticos.
- [ ] Validar `llms.txt` accesible en `/<llms.txt>`.
- [ ] Validar `sitemap.xml` accesible en `/sitemap.xml`.

## 5) Post-deploy
- [ ] Registrar propiedad en Search Console del dominio final.
- [ ] Enviar `sitemap.xml` en Search Console.
- [ ] Verificar indexación de las 4 rutas durante la primera semana.
