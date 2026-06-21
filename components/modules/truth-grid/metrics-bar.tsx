"use client";

import { motion } from "framer-motion";
import type { StockMetrics } from "@/types";
import { MetricCardSkeleton } from "@/components/ui/skeleton";
import { formatMarketCap, formatPercent } from "@/lib/api-client";

interface MetricsBarProps {
  metrics: StockMetrics | null;
  loading: boolean;
}

interface MetricItem {
  label: string;
  value: string;
  sub?: string;
  signal?: "positive" | "negative" | "neutral";
}

function buildMetrics(m: StockMetrics): MetricItem[] {
  return [
    {
      label: "P/E Ratio",
      value: m.peRatio != null ? m.peRatio.toFixed(1) + "×" : "N/A",
      sub: m.forwardPE != null ? `Fwd: ${m.forwardPE.toFixed(1)}×` : undefined,
      signal: m.peRatio != null && m.peRatio > 50 ? "negative" : "neutral",
    },
    {
      label: "Rev Growth",
      value: formatPercent(m.revenueGrowthYoY),
      sub: `QoQ: ${formatPercent(m.revenueGrowthQoQ)}`,
      signal: m.revenueGrowthYoY > 15 ? "positive" : m.revenueGrowthYoY < 0 ? "negative" : "neutral",
    },
    {
      label: "Gross Margin",
      value: formatPercent(m.grossMargin, false),
      sub: `Net: ${formatPercent(m.netMargin, false)}`,
      signal: m.grossMargin > 50 ? "positive" : m.grossMargin < 20 ? "negative" : "neutral",
    },
    {
      label: "Market Cap",
      value: formatMarketCap(m.marketCap),
      sub: `P/S: ${m.priceToSales.toFixed(1)}×`,
      signal: "neutral",
    },
    {
      label: "Short Interest",
      value: formatPercent(m.shortInterest, false),
      sub: "of float",
      signal: m.shortInterest > 10 ? "negative" : "neutral",
    },
    {
      label: "FCF Yield",
      value: m.freeCashFlowYield != null ? formatPercent(m.freeCashFlowYield, false) : "N/A",
      signal: m.freeCashFlowYield != null && m.freeCashFlowYield > 3 ? "positive" : "neutral",
    },
  ];
}

const SIGNAL_COLORS = {
  positive: "text-emerald",
  negative: "text-crimson",
  neutral: "text-text-primary",
};

export function MetricsBar({ metrics, loading }: MetricsBarProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const items = buildMetrics(metrics);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="grid grid-cols-3 md:grid-cols-6 gap-3"
    >
      {items.map((item, idx) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.04, duration: 0.3 }}
          className="glass-panel rounded-xl p-4 flex flex-col gap-1.5"
        >
          <span className="text-[10px] text-text-tertiary mono tracking-widest uppercase">
            {item.label}
          </span>
          <span className={`text-lg font-bold mono ${SIGNAL_COLORS[item.signal ?? "neutral"]}`}>
            {item.value}
          </span>
          {item.sub && (
            <span className="text-[10px] text-text-tertiary mono">{item.sub}</span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
