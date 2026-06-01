import React from "react";
import Logo from "../ui/Logo";
import TabNav from "./TabNav";

interface HeaderProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
}

export default function Header({ activeTab, onNavigate }: HeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800/80 sticky top-0 z-30 shadow-subtle backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex flex-col min-[1133px]:flex-row justify-between items-start min-[573px]:items-center gap-3 sm:gap-4">
        <Logo />

        <div className="flex items-center gap-3 w-full min-[1133px]:w-auto justify-start min-[573px]:justify-center min-[1133px]:justify-end">
          <TabNav activeTab={activeTab} onNavigate={onNavigate} />
        </div>
      </div>
    </header>
  );
}
