import React from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCw } from "lucide-react";
import { useTutorChat } from "../hooks/useTutorChat";
import MathMarkdownRenderer from "./MathMarkdownRenderer";

export default function AITutorChat() {
  const {
    messages,
    inputText,
    setInputText,
    isSending,
    warningMsg,
    messagesEndRef,
    handleSendMessage,
    clearChat,
  } = useTutorChat();

  return (
    <div id="ai-tutor-chat" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden flex flex-col h-[520px] transition-colors duration-300 font-sans">
      <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-700 text-white flex items-center justify-center shadow">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">IA Tutor de Probabilidades</h3>
            <span className="text-[10px] text-slate-700 dark:text-slate-400 font-medium font-sans">Resolución de dudas en tiempo real</span>
          </div>
        </div>
        <button onClick={clearChat} className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm active:scale-95 transition-all cursor-pointer" title="Limpiar chat">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {warningMsg && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/40 p-2 text-center text-[10px] text-amber-700 dark:text-amber-400 font-medium">
          {warningMsg}
        </div>
      )}

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/10">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 max-w-[85%] ${m.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${m.sender === "user" ? "bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400" : "bg-teal-100 dark:bg-teal-950/50 text-teal-800 dark:text-teal-400"}`}>
              {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : "π"}
            </div>
            <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${m.sender === "user" ? "bg-indigo-600 text-white rounded-tr-none whitespace-pre-wrap" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-200 rounded-tl-none shadow-sm"}`}>
              {m.sender === "user" ? m.text : <MathMarkdownRenderer content={m.text} />}
              <span className={`block text-xs mt-1.5 text-right ${m.sender === "user" ? "text-indigo-200" : "text-slate-500 dark:text-slate-400 font-mono"}`}>
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex gap-3 max-w-[85%] animate-pulse">
            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold bg-teal-100 dark:bg-teal-950/50 text-teal-100 dark:text-teal-400">π</div>
            <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-none shadow-sm flex items-center gap-1.5 min-w-[64px] justify-center">
              <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-[bounce_1s_infinite_100ms]"></span>
              <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-[bounce_1s_infinite_200ms]"></span>
              <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-[bounce_1s_infinite_300ms]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2 shrink-0">
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} disabled={isSending} className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-50/50 dark:bg-slate-950" placeholder="Ej: ¿Por qué la derivada de Softmax tiene signo negativo para índices distintos?" />
        <button type="submit" disabled={isSending || !inputText.trim()} className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-xl transition-all shadow active:scale-95 cursor-pointer">
          {isSending ? (<div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>) : (<Send className="w-3.5 h-3.5" />)}
        </button>
      </form>
    </div>
  );
}
