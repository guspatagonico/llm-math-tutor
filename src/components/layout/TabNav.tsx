import React from "react";
import { TABS, fullPath } from "../../constants/routes";

interface TabNavProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
}

export default function TabNav({ activeTab, onNavigate }: TabNavProps) {
  return (
    <nav className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800/80 overflow-x-auto tab-nav-scroll">
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
            className={`flex items-center gap-1.5 px-2 sm:px-3 py-2 min-h-[36px] rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              isActive ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{tab.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
