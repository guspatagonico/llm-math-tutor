import { House, Activity, Network, Flame, MessageSquare, LucideIcon } from "lucide-react";

export interface TabConfig {
  id: string;
  path: string;
  label: string;
  icon: LucideIcon;
}

export const TABS: TabConfig[] = [
  { id: "home", path: "/", label: "Inicio", icon: House },
  { id: "sigmoid", path: "/sigmoide-logit", label: "Sigmoide y Logit", icon: Activity },
  { id: "softmax", path: "/softmax-physics", label: "Softmax & Física", icon: Network },
  { id: "temperature", path: "/temperature", label: "Temperatura", icon: Flame },
  { id: "chat", path: "/ia-tutor", label: "Tutor IA", icon: MessageSquare },
];

export const DEFAULT_TAB = TABS[0];

export const BASE_PATH = import.meta.env.DEV ? "/" : (import.meta.env.VITE_BASE_PATH || "/");

export function fullPath(relativePath: string): string {
  const base = BASE_PATH.endsWith("/") ? BASE_PATH.slice(0, -1) : BASE_PATH;
  return `${base}${relativePath}`;
}

export function stripBase(pathname: string): string {
  const raw = BASE_PATH.endsWith("/") ? BASE_PATH.slice(0, -1) : BASE_PATH;
  if (raw && raw !== "/" && pathname.startsWith(raw)) {
    const stripped = pathname.slice(raw.length);
    return stripped.startsWith("/") ? stripped : `/${stripped}`;
  }
  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}
