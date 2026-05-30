# PHP Deployment Checklist — LLM Math Tutor

Despliegue en servidor PHP (Apache/nginx + PHP 8.x) bajo subcarpeta `/webapps/llm-math-tutor/`.

---

## 1. Pre-build local

- [ ] **1.1** Revisar `.env.example` en la raíz del proyecto
  - Verificar que `VITE_BASE_PATH="/webapps/llm-math-tutor/"` está seteado
  - Si se despliega en otra subcarpeta, ajustar el valor
- [ ] **1.2** Crear `.env` en la raíz con `VITE_BASE_PATH` igual al valor deseado
- [ ] **1.3** Ejecutar build: `npm run build`
  - Verificar que `dist/index.html` tiene los assets con la subcarpeta correcta:

    ```html
    <script src="/webapps/llm-math-tutor/assets/index-xxx.js"></script>
    ```

  - Verificar que `dist/sitemap.xml` tiene las URLs con el prefijo correcto

---

## 2. Archivos a subir

Subir **`dist/`** a la carpeta de la webapp y **`dist-backend/`** al nivel `/backend/` del servidor:

```
/
├── webapps/
│   └── llm-math-tutor/    ← contenido de dist/
│       ├── index.html
│       ├── assets/
│       ├── og/
│       ├── sitemap.xml
│       ├── robots.txt
│       ├── llms.txt
│       ├── sigmoide-logit/
│       │   └── index.html
│       ├── softmax-physics/
│       │   └── index.html
│       ├── temperature/
│       │   └── index.html
│       └── ia-tutor/
│           └── index.html
│
└── backend/               ← contenido de dist-backend/
    ├── api-proxy.php
    └── .env.example
```

> El backend vive al mismo nivel que `/webapps/`, como proyecto independiente. La webapp frontend llama a `/backend/api-proxy.php?action=...` desde el root del servidor.

---

## 3. Configurar API key en el servidor

- [ ] **3.1** En el servidor, dentro de `/backend/`, copiar `.env.example` → `.env`:
  ```bash
  cp /backend/.env.example /backend/.env
  ```
- [ ] **3.2** Editar `/backend/.env` y poner tu API key real:
  ```
  GEMINI_API_KEY=AIzaSy...
  ```
- [ ] **3.3** Verificar permisos: `.env` debe ser legible por PHP pero **no accesible vía web**.
  ```bash
  chmod 600 /backend/.env
  ```

---

## 4. Apache (.htaccess)

Si el servidor usa **Apache**, crear o verificar `/webapps/llm-math-tutor/.htaccess`:

```apache
RewriteEngine On

# Bloquear acceso al .env
<Files ".env">
    Require all denied
</Files>

# Si la URL no es un archivo ni directorio real, servir index.html (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

- [ ] **4.1** Verificar que `mod_rewrite` está habilitado en Apache
- [ ] **4.2** Verificar que el `.htaccess` se aplica (AllowOverride All en la config del host)

---

## 5. Nginx

Si el servidor usa **nginx**, agregar al bloque `server`:

```nginx
# SPA frontend en subcarpeta
location /webapps/llm-math-tutor/ {
    alias /ruta/absoluta/webapps/llm-math-tutor/;

    # Bloquear acceso al .env
    location ~ /\.env {
        deny all;
        return 403;
    }

    # SPA fallback
    try_files $uri $uri/ /webapps/llm-math-tutor/index.html;
}

# PHP proxy — ruta independiente, paralela a /webapps/
location ~ /backend/api-proxy\.php$ {
    alias /ruta/absoluta/backend/;
    include fastcgi_params;
    fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
    fastcgi_param SCRIPT_FILENAME /ruta/absoluta/backend/api-proxy.php;
}
```

- [ ] **5.1** Ajustar `fastcgi_pass` a la versión de PHP-FPM instalada
- [ ] **5.2** Ajustar `/ruta/absoluta` a la ruta real en el servidor
- [ ] **5.3** Recargar nginx: `sudo systemctl reload nginx`

---

## 6. PHP

- [ ] **6.1** PHP 8.0 o superior requerido
- [ ] **6.2** Extensiones requeridas:
  - `curl` — para llamadas a Gemini API
  - `json` — incluido por defecto
  - `mbstring` — incluido por defecto
- [ ] **6.3** Verificar que PHP puede hacer requests externos (sin bloqueos de firewall):
  ```bash
  php -r "echo curl_init() ? 'curl OK' : 'curl FAIL';"
  ```

---

## 7. Verificaciones post-deploy

- [ ] **7.1** Navegar a `https://tudominio.com/webapps/llm-math-tutor/`
  - La página de inicio carga sin errores 404 ni CORS
- [ ] **7.2** Navegar a `/webapps/llm-math-tutor/sigmoide-logit`
  - Carga sin refrescar la página (SPA routing funciona)
- [ ] **7.3** Probar el módulo de **Temperatura**
  - Escribir un prompt, click en "Predecir Logits"
  - Debe devolver candidatos reales (no el fallback "GEMINI_API_KEY no configurada")
- [ ] **7.4** Probar el **Tutor IA**
  - Enviar una pregunta simple: "¿Qué es Softmax?"
  - Debe responder con contenido generado
- [ ] **7.5** Verificar SEO:
  - `view-source:https://tudominio.com/webapps/llm-math-tutor/` — title, meta description, canonical, og:url con prefijo correcto
  - `https://tudominio.com/webapps/llm-math-tutor/sitemap.xml` — URLs con prefijo
- [ ] **7.6** Consola del navegador (F12 → Network):
  - Sin errores 404 en JS/CSS/API
  - Sin llamadas que expongan `GEMINI_API_KEY`
- [ ] **7.7** Verificar que `/backend/.env` no es accesible vía web:
  - `https://tudominio.com/backend/.env` → 403 o 404
- [ ] **7.8** Diagnóstico del proxy PHP:
  - Visitar `https://tudominio.com/backend/api-proxy.php?debug=1`
  - Confirma que `exists: true`, `readable: true`, `has_api_key: true`

---

## 8. Troubleshooting

| Problema                                     | Causa probable                        | Solución                                     |
| -------------------------------------------- | ------------------------------------- | -------------------------------------------- |
| API devuelve "GEMINI_API_KEY no configurada" | `/backend/.env` no existe o está vacío | Crear/editar con la key real                 |
| API devuelve "GEMINI_API_KEY no configurada" | `.env` no es leíble por parse_ini_file | Visitar `?debug=1` para diagnosticar ruta y permisos |
| Error de CORS en llamadas API                | Apache/nginx no configurado           | Verificar `.htaccess` o config de nginx      |
| Ruta `/sigmoide-logit` da 404                | SPA fallback no configurado           | Revisar `.htaccess` — debe servir index.html |
| JS/CSS dan 404 (rutas sin subcarpeta)        | `VITE_BASE_PATH` no estaba seteado    | Re-build con `VITE_BASE_PATH` correcto       |
| PHP proxy da error 500                       | `curl` no instalado                   | `sudo apt install php-curl`                  |

---

## 9. Rollback

Si algo falla, restaurar la versión anterior:

- Reemplazar `dist/` con la versión del build anterior
- `/backend/` y su `.env` no suelen necesitar rollback

---

Última actualización: 2026-05-30
