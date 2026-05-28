# LLM Math Tutor: Sigmoide, Logit y Softmax

Un entorno interactivo y educativo de código abierto diseñado para visualizar y comprender en profundidad la matemática detrás de los Modelos de Lenguaje (LLMs) y la selección de tokens.

---

## 🚀 Sobre el Proyecto

Esta iniciativa nace con un propósito puramente **educativo y de divulgación científica**. El objetivo principal es desmitificar cómo las redes neurales y los transformadores procesan la información continua para transformarla en palabras legibles, explorando matemáticamente componentes críticos como:

*   **Espacio de Probabilidades vs Logits:** Visualizaciones interactivas de la función logística ($\sigma(x)$) y su inversa multiplicativa, el Logit.
*   **Matriz Jacobiana y Softmax:** Simulación dinámica de las derivadas parciales de Softmax con respecto a los logits de entrada ($\frac{\partial p_i}{\partial z_j}$), viendo cómo interactúa el vector de probabilidades en la backpropagación.
*   **Ajuste y Muestreo de Temperatura ($T$):** Simulación de muestreo con control de temperatura, donde se visualiza el "escalado de entropía" sobre la distribución original.
*   **Tutor IA Integrado:** Un chat inteligente capaz de interpretar LaTeX y tablas complejas para resolver dudas teóricas o prácticas en tiempo real.

---

## 👤 Autor & Contacto

Este proyecto es desarrollado y mantenido con entusiasmo por:

**Gustavo Adrián Salvini**  

Para sugerencias, ideas de mejora, colaboraciones o simplemente intercambiar conocimientos, puedes conectar conmigo en:

*   🌐 **Sitio Web Personal:** [gustavosalvini.com.ar](https://gustavosalvini.com.ar)
*   🐙 **GitHub:** [@guspatagonico](https://github.com/guspatagonico)
*   🐦 **X (Twitter):** [@guspatagonico](https://x.com/guspatagonico)

---

## 🤝 Contribuciones, Forks e Ideas

Este es un espacio comunitario. Se invita activamente a estudiantes, desarrolladores, docentes y entusiastas a colaborar con el crecimiento de este simulador. 

Eres totalmente libre de:
1.  **Hacer un Fork** del repositorio y experimentar con modificaciones locales.
2.  **Abrir Issues** para proponer nuevas herramientas visuales (por ejemplo, simulación de núcleos de atención o pérdidas de Cross-Entropy).
3.  **Enviar Pull Requests (PRs)** con mejoras en el renderizado de ecuaciones matematicas, adaptabilidad visual o soporte multiidioma.
4.  **Aportar ideas** e hilos de debate sobre mejores formas de enseñar conceptos matemáticos de IA a las nuevas generaciones de científicos de datos.

---

## 📝 Licencia MIT

Este proyecto se distribuye bajo la **Licencia MIT**. Es de uso público, libre y de código abierto.

```text
Permiso otorgado, de forma gratuita, a cualquier persona que obtenga una copia
de este software para usarlo, copiarlo, modificarlo, fusionarlo, publicarlo,
distribuirlo, sublicenciarlo y/o vender copias del Software, sujeto únicamente
a que se conserve este aviso de derechos de autor en todas las copias o partes
sustanciales del mismo.

El software se proporciona "tal cual", sin garantía de ningún tipo, explícita o
implícita, incluyendo pero no limitado a garantías de comercialización o idoneidad
para un propósito particular.
```

---

*Desarrollado con React, TypeScript, Tailwind CSS y mucho café.*
