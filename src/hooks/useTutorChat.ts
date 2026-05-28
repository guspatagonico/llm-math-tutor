import { useState, useRef, useCallback, useEffect } from "react";
import { Message } from "../types";
import { tutorChat } from "../services/api";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  sender: "tutor",
  text: "¡Hola! Soy tu tutor especializado en Matemáticas de Redes Neuronales y Procesamiento de Lenguaje Natural.\n\n¿Tienes alguna duda sobre los logits, por qué se usa el mapeo sigmoide o de dónde viene la temperatura termodinámica? Pregúntame lo que quieras y lo revisaremos paso a paso.",
  timestamp: "",
};

export function useTutorChat() {
  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage()]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim() || isSending) return;

      const userMsg = createMessage("user", inputText.trim());
      setMessages((prev) => [...prev, userMsg]);
      setInputText("");
      setIsSending(true);
      setWarningMsg("");

      try {
        const data = await tutorChat([...messages, userMsg]);
        setMessages((prev) => [...prev, createMessage("tutor", data.reply)]);
        if (data.warning) setWarningMsg(data.warning);
      } catch (err: any) {
        console.error(err);
        setMessages((prev) => [
          ...prev,
          createMessage(
            "tutor",
            `Mil disculpas, ocurrió un error temporal al conectar con mi cerebro de IA (${err.message}). Puedes seguir modificando los logits y la temperatura en los simuladores para ver las fórmulas en vivo.`
          ),
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [inputText, isSending, messages]
  );

  const clearChat = useCallback(() => {
    setMessages([getWelcomeMessage()]);
  }, []);

  return {
    messages,
    inputText,
    setInputText,
    isSending,
    warningMsg,
    messagesEndRef,
    handleSendMessage,
    clearChat,
  };
}

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
