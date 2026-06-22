"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type CardAccent = "emerald" | "crimson" | "amber" | "slate";

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  delta?: string;
  deltaPositive?: boolean;
  sparkline?: number[];
  accent?: CardAccent;
  loading?: boolean;
}

const ACCENT_STYLES: Record<CardAccent, { value: string; delta: string; dot: string }> = {
  emerald: { value: "text-emerald", delta: "text-emerald", dot: "bg-emerald" },
  crimson: { value: "text-crimson", delta: "text-crimson", dot: "bg-crimson" },
  amber:   { value: "text-amber",   delta: "text-amber",   dot: "bg-amber"   },
  slate:   { value: "text-text-primary", delta: "text-text-secondary", dot: "bg-text-tertiary" },
};

export function MetricCard({
  label,
  value,
  sublabel,
  delta,
  deltaPositive,
  sparkline,
  accent = "slate",
  loading = false,
}: MetricCardProps) {
  const styles = ACCENT_STYLES[accent];

  if (loading) {
    return (
      <div className="glass-panel rounded-xl p-4 space-y-3">
        <div className="skeleton-shimmer h-2.5 w-20 rounded" />
        <div className="skeleton-shimmer h-7 w-28 rounded" />
        <div className="skeleton-shimmer h-2 w-14 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="glass-panel rounded-xl p-4 flex flex-col gap-2.5"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] mono tracking-widest uppercase text-text-tertiary">
          {label}
        </span>
        {sparkline && sparkline.length > 1 && (
          <Sparkline data={sparkline} positive={deltaPositive ?? true} />
        )}
      </div>

      <span className={cn("text-2xl font-black mono tracking-tight leading-none", styles.value)}>
        {value}
      </span>

      <div className="flex items-center gap-2">
        {delta !== undefined && (
          <div className={cn("flex items-center gap-0.5 text-xs mono font-semibold", styles.delta)}>
            {deltaPositive === true && <TrendingUp className="w-3 h-3" strokeWidth={2.5} />}
            {deltaPositive === false && <TrendingDown className="w-3 h-3" strokeWidth={2.5} />}
            {deltaPositive === undefined && <Minus className="w-3 h-3" strokeWidth={2} />}
            <span>{delta}</span>
          </div>
        )}
        {sublabel && (
          <span className="text-[10px] text-text-tertiary">{sublabel}</span>
        )}
      </div>
    </motion.div>
  );
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const W = 56;
  const H = 22;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * H * 0.85 - H * 0.075,
  }));

  const d = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    const prev = pts[i - 1];
    const cp1x = (prev.x + p.x) / 2;
    return `${acc} C ${cp1x.toFixed(1)},${prev.y.toFixed(1)} ${cp1x.toFixed(1)},${p.y.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }, "");

  const stroke = positive ? "#10b981" : "#ef4444";

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
  );
}
