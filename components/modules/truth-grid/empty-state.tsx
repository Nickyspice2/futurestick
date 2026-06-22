"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp, ShieldAlert, BarChart3 } from "lucide-react";

const TICKER_EXAMPLES = [
  { ticker: "TSLA", label: "High Fluff", badge: "crimson" },
  { ticker: "NVDA", label: "AI Darling", badge: "amber" },
  { ticker: "AAPL", label: "Cash Machine", badge: "emerald" },
  { ticker: "PLTR", label: "Max Hype", badge: "crimson" },
];

const FEATURES = [
  { icon: ShieldAlert, text: "Myth detection from analyst & media claims" },
  { icon: BarChart3, text: "Raw metrics with zero narrative spin" },
  { icon: TrendingUp, text: "Math-driven verdict on every ticker" },
];

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center text-center py-16 px-6 max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
        className="w-14 h-14 rounded-2xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center mb-6"
      >
        <Search className="w-6 h-6 text-emerald" />
      </motion.div>

      <h2 className="text-2xl font-black text-text-primary tracking-tight mb-2">
        Enter a ticker to get started
      </h2>
      <p className="text-sm text-text-tertiary max-w-sm leading-relaxed mb-8">
        Search any public company ticker to see the gap between what analysts
        claim and what the numbers actually say.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {TICKER_EXAMPLES.map(({ ticker, label, badge }, idx) => (
          <motion.div
            key={ticker}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.05 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="px-4 py-2 bg-surface-2 border border-border rounded-xl">
              <span className="text-sm font-bold mono text-text-secondary">{ticker}</span>
            </div>
            <span
              className={`text-[10px] mono ${
                badge === "crimson" ? "text-crimson" : badge === "amber" ? "text-amber" : "text-emerald"
              }`}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-sm space-y-3">
        {FEATURES.map(({ icon: Icon, text }, idx) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.07 }}
            className="flex items-center gap-3 text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-surface-3 border border-border flex items-center justify-center shrink-0">
              <Icon className="w-3.5 h-3.5 text-text-tertiary" />
            </div>
            <span className="text-xs text-text-tertiary">{text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
