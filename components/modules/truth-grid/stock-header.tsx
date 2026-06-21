"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import type { StockMetrics } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPercent } from "@/lib/api-client";

interface StockHeaderProps {
  metrics: StockMetrics | null;
  loading: boolean;
  lastUpdated?: string;
}

export function StockHeader({ metrics, loading, lastUpdated }: StockHeaderProps) {
  if (loading) {
    return (
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="space-y-2 text-right">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
      </div>
    );
  }

  if (!metrics) return null;

  const isUp = metrics.change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-start justify-between gap-4"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-black mono tracking-tight text-text-primary">
            {metrics.ticker}
          </h2>
          <span className="px-2.5 py-1 rounded-lg bg-surface-3 border border-border text-xs text-text-tertiary">
            {metrics.sector}
          </span>
        </div>
        <p className="text-sm text-text-tertiary">{metrics.companyName}</p>
      </div>

      <div className="text-right">
        <div className="text-3xl font-black mono text-text-primary">
          {formatCurrency(metrics.price)}
        </div>
        <div
          className={`flex items-center justify-end gap-1.5 mt-1 ${
            isUp ? "text-emerald" : "text-crimson"
          }`}
        >
          {isUp ? (
            <TrendingUp className="w-4 h-4" strokeWidth={2} />
          ) : (
            <TrendingDown className="w-4 h-4" strokeWidth={2} />
          )}
          <span className="text-sm font-bold mono">
            {isUp ? "+" : ""}{formatCurrency(metrics.change)} (
            {formatPercent(metrics.changePercent)})
          </span>
        </div>

        {lastUpdated && (
          <div className="flex items-center justify-end gap-1 mt-1.5">
            <Clock className="w-3 h-3 text-text-ghost" />
            <span className="text-[10px] text-text-ghost mono">
              {new Date(lastUpdated).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
