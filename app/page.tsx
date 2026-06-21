"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Zap } from "lucide-react";
import { useStockData } from "@/hooks/use-stock-data";
import { useFluffMode } from "@/hooks/use-fluff-mode";
import { GridCanvas } from "@/components/modules/background/grid-canvas";
import { Sidebar } from "@/components/modules/nav/sidebar";
import { TickerSearch } from "@/components/modules/search/ticker-search";
import { FluffFilter } from "@/components/modules/filter/fluff-filter";
import { TruthGrid } from "@/components/modules/truth-grid/truth-grid";
import { MetricsBar } from "@/components/modules/truth-grid/metrics-bar";
import { StockHeader } from "@/components/modules/truth-grid/stock-header";
import { InsiderFeed } from "@/components/modules/truth-grid/insider-feed";
import { EmptyState } from "@/components/modules/truth-grid/empty-state";
import { ErrorBoundary } from "@/components/shared/error-boundary";

export default function DashboardPage() {
  const { mode, toggle, isBrutal } = useFluffMode();
  const {
    metrics,
    analysis,
    metricsState,
    analysisState,
    error,
    activeTicker,
    loadStock,
  } = useStockData();

  const isLoading = metricsState === "loading" || analysisState === "loading";
  const hasData = metrics !== null || analysis !== null;
  const hasError = metricsState === "error" && analysisState === "error";

  return (
    <div className="min-h-screen bg-obsidian text-text-primary">
      <GridCanvas />
      <Sidebar />

      <div className="relative z-10 ml-[72px] flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border bg-obsidian/85 backdrop-blur-xl">
          <div className="flex items-center gap-4 px-6 py-4">
            <div className="flex items-center gap-2 mr-2 shrink-0">
              <div className="w-6 h-6 rounded-lg bg-emerald flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-obsidian" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-black mono tracking-tight text-text-primary hidden sm:block">
                ANTI-FLUFF
              </span>
            </div>

            <div className="flex-1">
              <TickerSearch
                onSelect={loadStock}
                disabled={isLoading}
              />
            </div>

            <div className="shrink-0">
              <FluffFilter mode={mode} onToggle={toggle} />
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-6 space-y-6 max-w-[1400px] w-full">
          <AnimatePresence mode="wait">
            {hasError && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-3 px-4 py-3 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.25)] rounded-xl text-sm"
              >
                <AlertCircle className="w-4 h-4 text-crimson shrink-0" />
                <span className="text-text-secondary">{error}</span>
                <span className="text-text-tertiary text-xs ml-auto">
                  Available: TSLA, NVDA, AAPL, PLTR, AMZN, MSFT, GOOGL, META, AMD, COIN
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {!hasData && !isLoading && !hasError && (
            <EmptyState />
          )}

          {(hasData || isLoading) && (
            <ErrorBoundary>
              <div className="space-y-6">
                <StockHeader
                  metrics={metrics}
                  loading={metricsState === "loading"}
                  lastUpdated={analysis?.lastUpdated}
                />

                <MetricsBar
                  metrics={metrics}
                  loading={metricsState === "loading"}
                />

                <AnimatePresence>
                  {isBrutal && (activeTicker === "PLTR" || activeTicker === "TSLA") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.2)] rounded-xl">
                        <span className="text-xs text-crimson mono font-bold tracking-wider">
                          ⚠ BRUTAL MODE ACTIVE
                        </span>
                        <span className="text-xs text-text-tertiary">
                          — Diplomatic language filters disabled. Raw cynical context visible.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <TruthGrid
                  analysis={analysis}
                  loading={analysisState === "loading"}
                  mode={mode}
                />

                {metrics?.insiderRecentTransactions &&
                  metrics.insiderRecentTransactions.length > 0 && (
                    <InsiderFeed transactions={metrics.insiderRecentTransactions} />
                  )}
              </div>
            </ErrorBoundary>
          )}
        </main>

        <footer className="border-t border-border px-6 py-4 flex items-center justify-between">
          <span className="text-[11px] text-text-ghost mono">
            ANTI-FLUFF INVESTOR — Raw Financial Truth
          </span>
          <span className="text-[11px] text-text-ghost mono">
            Data is simulated for demonstration purposes.
          </span>
        </footer>
      </div>
    </div>
  );
}
