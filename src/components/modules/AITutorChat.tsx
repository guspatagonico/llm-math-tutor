import React, { useEffect, useRef } from "react";
import { MessageSquare, Send, Sparkles, RefreshCw } from "lucide-react";
import { useTutorChatStore } from "../../stores/tutorChatStore";
import ChatMessage from "../ui/ChatMessage";
import LoadingDots from "../ui/LoadingDots";
import WarningBanner from "../ui/WarningBanner";
import Spinner from "../ui/Spinner";
import IconBox from "../ui/IconBox";

export default function AITutorChat() {
  const messages = useTutorChatStore((s) => s.messages);
  const inputText = useTutorChatStore((s) => s.inputText);
  const setInputText = useTutorChatStore((s) => s.setInputText);
  const isSending = useTutorChatStore((s) => s.isSending);
  const warningMsg = useTutorChatStore((s) => s.warningMsg);
  const hasUserSentMessage = useTutorChatStore((s) => s.hasUserSentMessage);
  const sendMessage = useTutorChatStore((s) => s.sendMessage);
  const clearChat = useTutorChatStore((s) => s.clearChat);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasUserSentMessage) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, hasUserSentMessage]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(inputText);
  };

  return (
    <div id="ai-tutor-chat" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden flex flex-col h-[520px] transition-colors duration-300">
      <h1 className="sr-only">Tutor IA para matematicas de modelos de lenguaje</h1>

      <div className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <IconBox icon={Sparkles} color="indigo" variant="solid" size="md" rounded="lg" className="dark:bg-indigo-700 shadow" />
          <div>
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">IA Tutor de Probabilidades</h2>
            <span className="text-xs text-slate-700 dark:text-slate-400 font-medium">Resolución de dudas en tiempo real</span>
          </div>
        </div>
        <button onClick={clearChat} aria-label="Limpiar chat" className="p-2 min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm active:scale-95 transition-all cursor-pointer">
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {warningMsg && <WarningBanner message={warningMsg} variant="amber" />}

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/10">
        {messages.map((m) => {
          const sender = m.sender as "user" | "tutor";
          return <ChatMessage key={m.id} sender={sender} text={m.text} timestamp={m.timestamp} />;
        })}

        {isSending && (
          <div className="flex gap-3 max-w-[85%] animate-pulse">
            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold bg-teal-100 dark:bg-teal-950/50 text-teal-800 dark:text-teal-400">π</div>
            <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-tl-none shadow-sm">
              <LoadingDots />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2 shrink-0">
        <input type="text" aria-label="Pregunta al tutor de IA" value={inputText} onChange={(e) => setInputText(e.target.value)} disabled={isSending} className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white bg-slate-50/50 dark:bg-slate-950" placeholder="Ej: ¿Por qué la derivada de Softmax tiene signo negativo para índices distintos?" />
        <button type="submit" aria-label="Enviar mensaje" disabled={isSending || !inputText.trim()} className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-xl transition-all shadow active:scale-95 cursor-pointer">
          {isSending ? <Spinner /> : <Send className="w-3.5 h-3.5" />}
        </button>
      </form>
    </div>
  );
}
