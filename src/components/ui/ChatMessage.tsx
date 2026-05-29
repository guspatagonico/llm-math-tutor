import React from "react";
import { User } from "lucide-react";
import MathMarkdownRenderer from "../shared/MathMarkdownRenderer";

interface ChatMessageProps {
  sender: "user" | "tutor";
  text: string;
  timestamp: string;
  key?: React.Key;
}

export default function ChatMessage({ sender, text, timestamp }: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""}`}>
      <div
        className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
          isUser ? "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400"
                 : "bg-teal-100 dark:bg-teal-950/50 text-teal-800 dark:text-teal-400"
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : "π"}
      </div>
      <div
        className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-600 text-white rounded-tr-none whitespace-pre-wrap"
            : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none shadow-sm"
        }`}
      >
        {isUser ? text : <MathMarkdownRenderer content={text} />}
        <span className={`block text-xs mt-1.5 text-right ${isUser ? "text-indigo-200" : "text-slate-500 dark:text-slate-400 font-sans"}`}>
          {timestamp}
        </span>
      </div>
    </div>
  );
}
