"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { TickerQuick } from "@/types";
import { TICKER_QUICK_LIST } from "@/lib/mock-data";
import { fluffScoreColor, fluffScoreLabel } from "@/lib/utils";

interface TickerSelectorProps {
  activeTicker: string | null;
  onSelect: (ticker: string) => void;
}

export function TickerSelector({ activeTicker, onSelect }: TickerSelectorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border shrink-0">
        <span className="text-[10px] mono tracking-widest uppercase text-text-tertiary">
          Instruments
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {TICKER_QUICK_LIST.map((item, idx) => (
          <TickerRow
            key={item.ticker}
            item={item}
            active={activeTicker === item.ticker}
            idx={idx}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="px-4 py-3 border-t border-border shrink-0">
        <p className="text-[10px] text-text-ghost mono text-center">
          4 instruments tracked
        </p>
      </div>
    </div>
  );
}

interface TickerRowProps {
  item: TickerQuick;
  active: boolean;
  idx: number;
  onSelect: (ticker: string) => void;
}

function TickerRow({ item, active, idx, onSelect }: TickerRowProps) {
  const isUp = item.changePercent >= 0;
  const fluffColor = fluffScoreColor(item.fluffScore);
  const fluffLbl = fluffScoreLabel(item.fluffScore).split(" ")[0];

  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      onClick={() => onSelect(item.ticker)}
      className={[
        "relative w-full flex flex-col gap-1.5 px-4 py-3 text-left transition-colors group",
        active
          ? "bg-[rgba(16,185,129,0.06)]"
          : "hover:bg-surface-3",
      ].join(" ")}
    >
      {active && (
        <motion.div
          layoutId="ticker-active-bar"
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald rounded-r-sm"
        />
      )}

      <div className="flex items-center justify-between gap-2">
        <span className={[
          "text-sm font-black mono",
          active ? "text-emerald" : "text-text-primary group-hover:text-text-primary",
        ].join(" ")}>
          {item.ticker}
        </span>
        <div className={`flex items-center gap-0.5 text-xs mono font-semibold ${isUp ? "text-emerald" : "text-crimson"}`}>
          {isUp
            ? <TrendingUp className="w-3 h-3" strokeWidth={2.5} />
            : <TrendingDown className="w-3 h-3" strokeWidth={2.5} />
          }
          {isUp ? "+" : ""}{item.changePercent.toFixed(2)}%
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-text-tertiary mono">${item.price.toFixed(2)}</span>
        <span className={`text-[10px] mono font-bold ${fluffColor}`}>
          {fluffLbl}
        </span>
      </div>

      <div className="w-full h-0.5 bg-surface-3 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            item.fluffScore >= 75 ? "bg-crimson" : item.fluffScore >= 50 ? "bg-amber" : "bg-emerald"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${item.fluffScore}%` }}
          transition={{ delay: idx * 0.06 + 0.3, duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.button>
  );
}
