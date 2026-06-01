/**
 * @file main.tsx
 * @author Gustavo Adrián Salvini
 * @license MIT
 * 
 * Permiso otorgado, de forma gratuita, a cualquier persona que obtenga una copia
 * de este software para utilizarlo, modificarlo, distribuirlo y sublicenciarlo
 * sin restricciones, sujeto a la inclusión de este aviso de derechos de autor.
 * 
 * Contacto:
 * - GitHub: https://github.com/guspatagonico
 * - X (Twitter): https://x.com/guspatagonico
 * - Web: https://gustavosalvini.com.ar
 */

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { useTutorChatStore } from "./stores/tutorChatStore";
import { useTemperatureStore } from "./stores/temperatureStore";
import { useSoftmaxStore } from "./stores/softmaxStore";
import { useSigmoidLogitStore } from "./stores/sigmoidLogitStore";

declare global {
  interface Window {
    __stores?: {
      tutorChat: typeof useTutorChatStore;
      temperature: typeof useTemperatureStore;
      softmax: typeof useSoftmaxStore;
      sigmoidLogit: typeof useSigmoidLogitStore;
    };
  }
}

const analyticsMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

if (analyticsMeasurementId) {
  const gtagScript = document.createElement("script");
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsMeasurementId}`;
  document.head.appendChild(gtagScript);

  const inlineScript = document.createElement("script");
  inlineScript.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${analyticsMeasurementId}');
  `;
  document.head.appendChild(inlineScript);
}

if (import.meta.env.DEV) {
  window.__stores = {
    tutorChat: useTutorChatStore,
    temperature: useTemperatureStore,
    softmax: useSoftmaxStore,
    sigmoidLogit: useSigmoidLogitStore,
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
