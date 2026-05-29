import React from "react";
import { TABS } from "../constants/routes";

interface TabNavProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
}

export default function TabNav({ activeTab, onNavigate }: TabNavProps) {
  return (
    <nav className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800/80">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <a
            key={tab.id}
            href={tab.path}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(tab.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              isActive ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
