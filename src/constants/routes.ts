import { Activity, Network, Flame, MessageSquare, LucideIcon } from "lucide-react";

export interface TabConfig {
  id: string;
  path: string;
  label: string;
  icon: LucideIcon;
}

export const TABS: TabConfig[] = [
  { id: "sigmoid", path: "/sigmoide-logit", label: "Sigmoide y Logit", icon: Activity },
  { id: "softmax", path: "/softmax-physics", label: "Softmax & Física", icon: Network },
  { id: "temperature", path: "/temperature", label: "Temperatura", icon: Flame },
  { id: "chat", path: "/ia-tutor", label: "Tutor IA", icon: MessageSquare },
];

export const DEFAULT_TAB = TABS[0];
