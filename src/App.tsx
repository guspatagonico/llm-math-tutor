import React, { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PathwayBanner from "./components/shared/PathwayBanner";
import SeoBlocks from "./components/shared/SeoBlocks";
import { TABS, DEFAULT_TAB, fullPath, stripBase } from "./constants/routes";
import { useRouteSeo, getRouteKey } from "./hooks/useRouteSeo";
import type { RouteSeoKey } from "./constants/seo";
import Spinner from "./components/ui/Spinner";

const HomeLearningPath = lazy(() => import("./components/modules/HomeLearningPath"));
const SigmoidLogitModule = lazy(() => import("./components/modules/SigmoidLogitModule"));
const SoftmaxGradientModule = lazy(() => import("./components/modules/SoftmaxGradientModule"));
const TemperatureSimulator = lazy(() => import("./components/modules/TemperatureSimulator"));
const AITutorChat = lazy(() => import("./components/modules/AITutorChat"));

const pathToTabId = new Map(TABS.map((t) => [t.path, t.id]));
const tabIdToPath = new Map(TABS.map((t) => [t.id, t.path]));

function getTabFromPath(pathname: string): string {
  const cleaned = stripBase(pathname);
  return pathToTabId.get(cleaned) || DEFAULT_TAB.id;
}

const TAB_COMPONENTS: Record<string, React.LazyExoticComponent<React.FC>> = {
  home: HomeLearningPath,
  sigmoid: SigmoidLogitModule,
  softmax: SoftmaxGradientModule,
  temperature: TemperatureSimulator,
  chat: AITutorChat,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(() => getTabFromPath(window.location.pathname));

  useRouteSeo(window.location.pathname);

  const routeKeyByTab: Record<string, RouteSeoKey> = {
    home: "home",
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
    const cleaned = stripBase(currentPath);
    if (!pathToTabId.has(cleaned)) {
      window.history.replaceState(null, "", fullPath(DEFAULT_TAB.path));
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (tabId: string) => {
    const targetPath = fullPath(tabIdToPath.get(tabId) || DEFAULT_TAB.path);
    if (targetPath !== window.location.pathname) {
      window.history.pushState(null, "", targetPath);
      setActiveTab(tabId);
    }
  };

  const ActiveComponent = TAB_COMPONENTS[activeTab] || SigmoidLogitModule;
  const activeRouteKey = routeKeyByTab[activeTab] || getRouteKey(window.location.pathname);
  const isHome = activeTab === "home";

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-950 text-slate-300 selection:bg-indigo-100 font-sans pb-16 dark">
      <Header activeTab={activeTab} onNavigate={navigateTo} />
      <main className="max-w-6xl mx-auto px-4 mt-8">
        {!isHome ? <PathwayBanner /> : null}
        <div className="transition-opacity duration-300">
          <Suspense fallback={<div className="flex justify-center py-20"><Spinner size="md" /></div>}>
            <ActiveComponent />
          </Suspense>
        </div>
        <SeoBlocks routeKey={activeRouteKey} />
        <Footer />
      </main>
    </div>
  );
}
