import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Message } from "../types";
import { tutorChat } from "../services/api";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  sender: "tutor",
  text: "¡Hola! Soy tu tutor especializado en Matemáticas de Redes Neuronales y Procesamiento de Lenguaje Natural.\n\n¿Tienes alguna duda sobre los logits, por qué se usa el mapeo sigmoide o de dónde viene la temperatura termodinámica? Pregúntame lo que quieras y lo revisaremos paso a paso.",
  timestamp: "",
};

interface TutorChatState {
  messages: Message[];
  inputText: string;
  isSending: boolean;
  warningMsg: string;
  hasUserSentMessage: boolean;
  setInputText: (text: string) => void;
  setHasUserSentMessage: (value: boolean) => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

export const useTutorChatStore = create<TutorChatState>()(
  persist(
    (set, get) => ({
      messages: [getWelcomeMessage()],
      inputText: "",
      isSending: false,
      warningMsg: "",
      hasUserSentMessage: false,
      setInputText: (text) => set({ inputText: text }),
      setHasUserSentMessage: (value) => set({ hasUserSentMessage: value }),
      sendMessage: async (text: string) => {
        if (!text.trim() || get().isSending) {
          return;
        }

        const userMsg = createMessage("user", text.trim());
        const nextMessages = [...get().messages, userMsg];

        set({
          messages: nextMessages,
          hasUserSentMessage: true,
          inputText: "",
          isSending: true,
          warningMsg: "",
        });

        try {
          const data = await tutorChat(nextMessages);
          set((state) => ({
            messages: [...state.messages, createMessage("tutor", data.reply)],
            warningMsg: data.warning || "",
          }));
        } catch (err: any) {
          console.error(err);
          set((state) => ({
            messages: [
              ...state.messages,
              createMessage(
                "tutor",
                `Mil disculpas, ocurrió un error temporal al conectar con mi cerebro de IA (${err.message}). Puedes seguir modificando los logits y la temperatura en los simuladores para ver las fórmulas en vivo.`
              ),
            ],
          }));
        } finally {
          set({ isSending: false });
        }
      },
      clearChat: () => {
        set({
          messages: [getWelcomeMessage()],
          hasUserSentMessage: false,
          inputText: "",
          warningMsg: "",
        });
      },
    }),
    {
      name: "llm-math-tutor-tutor-chat-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        messages: state.messages,
        hasUserSentMessage: state.hasUserSentMessage,
        inputText: state.inputText,
      }),
      version: 1,
    }
  )
);

function createMessage(sender: "user" | "tutor", text: string): Message {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
    sender,
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

function getWelcomeMessage(): Message {
  return {
    ...WELCOME_MESSAGE,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}
