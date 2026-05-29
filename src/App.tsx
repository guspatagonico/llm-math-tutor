import React, { useState, useEffect } from "react";
import SigmoidLogitModule from "./components/SigmoidLogitModule";
import SoftmaxGradientModule from "./components/SoftmaxGradientModule";
import TemperatureSimulator from "./components/TemperatureSimulator";
import AITutorChat from "./components/AITutorChat";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PathwayBanner from "./components/PathwayBanner";
import SeoBlocks from "./components/SeoBlocks";
import { TABS, DEFAULT_TAB } from "./constants/routes";
import { useRouteSeo, getRouteKey } from "./hooks/useRouteSeo";
import type { RouteSeoKey } from "./constants/seo";

const pathToTabId = new Map(TABS.map((t) => [t.path, t.id]));
const tabIdToPath = new Map(TABS.map((t) => [t.id, t.path]));

function getTabFromPath(pathname: string): string {
  const cleaned = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return pathToTabId.get(cleaned) || DEFAULT_TAB.id;
}

const TAB_COMPONENTS: Record<string, React.FC> = {
  sigmoid: SigmoidLogitModule,
  softmax: SoftmaxGradientModule,
  temperature: TemperatureSimulator,
  chat: AITutorChat,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => getTabFromPath(window.location.pathname));

  useRouteSeo(window.location.pathname);

  const routeKeyByTab: Record<string, RouteSeoKey> = {
    sigmoid: "sigmoid",
    softmax: "softmax",
    temperature: "temperature",
    chat: "chat",
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");

    const handlePopState = () => setActiveTab(getTabFromPath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);

    const currentPath = window.location.pathname;
    if (!pathToTabId.has(currentPath !== "/" && currentPath.endsWith("/") ? currentPath.slice(0, -1) : currentPath)) {
      window.history.replaceState(null, "", DEFAULT_TAB.path);
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (tabId: string) => {
    const targetPath = tabIdToPath.get(tabId) || DEFAULT_TAB.path;
    if (targetPath !== window.location.pathname) {
      window.history.pushState(null, "", targetPath);
      setActiveTab(tabId);
    }
  };

  const ActiveComponent = TAB_COMPONENTS[activeTab] || SigmoidLogitModule;
  const activeRouteKey = routeKeyByTab[activeTab] || getRouteKey(window.location.pathname);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-950 text-slate-300 selection:bg-indigo-100 font-sans pb-16 dark">
      <Header activeTab={activeTab} onNavigate={navigateTo} />
      <main className="max-w-6xl mx-auto px-4 mt-8">
        <PathwayBanner />
        <div className="transition-opacity duration-300">
          <ActiveComponent />
        </div>
        <SeoBlocks routeKey={activeRouteKey} />
        <Footer />
      </main>
    </div>
  );
}
