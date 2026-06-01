import React, { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { TABS, fullPath } from "../../constants/routes";

interface MobileMenuProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
}

export default function MobileMenu({ activeTab, onNavigate }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeLabel = useMemo(() => {
    return TABS.find((tab) => tab.id === activeTab)?.label ?? "Secciones";
  }, [activeTab]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onResize = () => {
      if (window.innerWidth >= 573) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  return (
    <div className="relative min-[573px]:hidden" ref={containerRef}>
      <button
        type="button"
        className="w-full flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="mobile-tab-menu"
        aria-label="Abrir menu de navegacion"
      >
        <span className="text-xs font-semibold tracking-wide">{activeLabel}</span>
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      <div
        id="mobile-tab-menu"
        className={`absolute left-0 right-0 top-[calc(100%+0.35rem)] z-40 origin-top rounded-lg border border-slate-800 bg-slate-950/98 p-1 shadow-xl backdrop-blur-sm transition-all duration-150 ${
          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        role="menu"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <a
              key={tab.id}
              href={fullPath(tab.path)}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(tab.id);
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-900 hover:text-slate-100"
              }`}
              aria-current={isActive ? "page" : undefined}
              role="menuitem"
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{tab.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
