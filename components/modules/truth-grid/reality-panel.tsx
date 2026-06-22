"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Database } from "lucide-react";
import type { RealityEntry, FluffMode } from "@/types";
import { Badge } from "@/components/ui/badge";

interface RealityPanelProps {
  entries: RealityEntry[];
  mode: FluffMode;
}

const SIGNAL_CONFIG = {
  bullish: { color: "text-emerald", border: "border-[rgba(16,185,129,0.2)]", bg: "bg-[rgba(16,185,129,0.05)]" },
  bearish: { color: "text-crimson", border: "border-[rgba(239,68,68,0.2)]", bg: "bg-[rgba(239,68,68,0.05)]" },
  neutral: { color: "text-amber", border: "border-[rgba(245,158,11,0.2)]", bg: "bg-[rgba(245,158,11,0.05)]" },
};

const TREND_ICON = {
  up: TrendingUp,
  down: TrendingDown,
  flat: Minus,
};

export function RealityPanel({ entries, mode }: RealityPanelProps) {
  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[rgba(16,185,129,0.1)] flex items-center justify-center">
            <Database className="w-3.5 h-3.5 text-emerald" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-emerald mono tracking-widest uppercase">
              Brutal Reality
            </h3>
            <p className="text-[10px] text-text-tertiary mt-0.5">
              Raw metrics, zero spin
            </p>
          </div>
        </div>
        <Badge variant="emerald">DATA</Badge>
      </div>

      <div className="flex flex-col divide-y divide-border flex-1">
        {entries.map((entry, idx) => {
          const sig = SIGNAL_CONFIG[entry.signal];
          const TrendIcon = TREND_ICON[entry.trend];

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.07 + 0.1, duration: 0.3, ease: "easeOut" }}
              className={`p-4 group transition-colors hover:${sig.bg}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] text-text-tertiary mono tracking-wider uppercase">
                  {entry.metric}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <TrendIcon
                    className={`w-3.5 h-3.5 ${sig.color}`}
                    strokeWidth={2}
                  />
                  <span className={`text-sm font-bold mono ${sig.color}`}>
                    {entry.value}
                  </span>
                </div>
              </div>

              <motion.p
                key={`${entry.id}-${mode}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-text-tertiary leading-relaxed group-hover:text-text-secondary transition-colors"
              >
                {entry.context}
              </motion.p>

              <div className="mt-2">
                <span
                  className={`inline-flex px-1.5 py-0.5 rounded text-[10px] mono font-semibold uppercase tracking-widest ${sig.color} border ${sig.border} bg-transparent`}
                >
                  {entry.signal}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
