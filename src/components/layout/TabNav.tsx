import React from "react";
import { TABS, fullPath } from "../../constants/routes";
import MobileMenu from "./MobileMenu";

interface TabNavProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
}

export default function TabNav({ activeTab, onNavigate }: TabNavProps) {
  return (
    <nav className="w-full rounded-xl border border-slate-800/80 bg-slate-950 p-1">
      <MobileMenu activeTab={activeTab} onNavigate={onNavigate} />

      <div className="hidden min-[573px]:flex items-center justify-center gap-1">
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
              }}
              title={tab.label}
              className={`shrink-0 flex items-center gap-1 px-3 py-2 min-h-[36px] rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isActive ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
