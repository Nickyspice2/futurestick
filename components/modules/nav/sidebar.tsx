"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  ShieldAlert,
  Layers,
  Settings,
  Zap,
} from "lucide-react";

const NAV_ITEMS = [
  { icon: TrendingUp, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Screener", active: false },
  { icon: ShieldAlert, label: "Risk Radar", active: false },
  { icon: Layers, label: "Compare", active: false },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] z-40 flex flex-col items-center py-6 gap-2 border-r border-border bg-obsidian">
      <div className="mb-4 flex flex-col items-center">
        <motion.div
          className="w-9 h-9 rounded-xl bg-emerald flex items-center justify-center"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap className="w-5 h-5 text-obsidian" strokeWidth={2.5} />
        </motion.div>
      </div>

      <div className="flex flex-col gap-1 flex-1 w-full px-3">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <NavItem key={label} icon={Icon} label={label} active={active} />
        ))}
      </div>

      <div className="px-3 w-full">
        <NavItem icon={Settings} label="Settings" active={false} />
      </div>
    </aside>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
}

function NavItem({ icon: Icon, label, active }: NavItemProps) {
  return (
    <motion.button
      className={[
        "group relative w-full flex items-center justify-center p-2.5 rounded-lg transition-colors",
        active
          ? "bg-[rgba(16,185,129,0.12)] text-emerald"
          : "text-text-tertiary hover:text-text-secondary hover:bg-surface-3",
      ].join(" ")}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      title={label}
    >
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-emerald rounded-full"
        />
      )}
      <Icon className="w-[18px] h-[18px]" strokeWidth={active ? 2 : 1.5} />
      <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-surface-2 border border-border rounded-lg text-xs text-text-primary font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
        {label}
      </div>
    </motion.button>
  );
}
