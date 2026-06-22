"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Zap } from "lucide-react";
import type { FluffMode } from "@/types";
import { useStockData } from "@/hooks/use-stock-data";
import { useAuditTerminal } from "@/hooks/use-audit-terminal";
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
import { TickerSelector } from "@/components/dashboard/ticker-selector";
import { FluffSlider } from "@/components/dashboard/fluff-slider";
import { AuditTerminal } from "@/components/dashboard/audit-terminal";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PriceChart } from "@/components/dashboard/price-chart";
import { InsightCards } from "@/components/dashboard/insight-cards";
import { formatPercent } from "@/lib/api-client";

export default function DashboardPage() {
  const [fluffLevel, setFluffLevel] = useState(0);
  const mode: FluffMode = fluffLevel >= 50 ? "brutal" : "diplomatic";
  const isBrutal = mode === "brutal";

  const {
    metrics,
    analysis,
    priceHistory,
    metricsState,
    analysisState,
    priceHistoryState,
    error,
    activeTicker,
    loadStock,
  } = useStockData();

  const { logs, streamForTicker, appendSliderChange } = useAuditTerminal();

  const handleTickerLoad = useCallback(
    (ticker: string) => {
      loadStock(ticker);
      streamForTicker(ticker);
    },
    [loadStock, streamForTicker]
  );

  const handleSliderChange = useCallback(
    (value: number) => {
      setFluffLevel(value);
    },
    []
  );

  useEffect(() => {
    if (!activeTicker) return;
    const timer = setTimeout(() => appendSliderChange(fluffLevel), 400);
    return () => clearTimeout(timer);
  }, [fluffLevel, activeTicker, appendSliderChange]);

  const toggleMode = useCallback(() => {
    setFluffLevel((prev) => (prev >= 50 ? 20 : 80));
  }, []);

  const isLoading = metricsState === "loading" || analysisState === "loading";
  const hasData = metrics !== null || analysis !== null;
  const hasError = metricsState === "error" && analysisState === "error";

  return (
    <div className="min-h-screen bg-obsidian text-text-primary">
      <GridCanvas />
      <Sidebar />

      <div className="relative z-10 ml-[72px] flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-30 border-b border-border bg-obsidian/90 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-4 px-6 py-3.5">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-6 h-6 rounded-lg bg-emerald flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-obsidian" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-black mono tracking-tight text-text-primary hidden sm:block">
                ANTI-FLUFF
              </span>
            </div>

            <div className="flex-1 max-w-xl">
              <TickerSearch onSelect={handleTickerLoad} disabled={isLoading} />
            </div>

            <div className="shrink-0 ml-auto">
              <FluffFilter mode={mode} onToggle={toggleMode} />
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-border overflow-hidden">
            <TickerSelector activeTicker={activeTicker} onSelect={handleTickerLoad} />
          </aside>

          <main className="flex-1 overflow-y-auto">
            <div className="px-6 pt-5 pb-4">
              <FluffSlider value={fluffLevel} onChange={handleSliderChange} />
            </div>

            <div className="px-6 space-y-5 pb-6">
              <AnimatePresence mode="wait">
                {hasError && error && (
                  <motion.div
                    key="error-banner"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-3 px-4 py-3 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.25)] rounded-xl text-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-crimson shrink-0" />
                    <span className="text-text-secondary">{error}</span>
                    <span className="text-text-tertiary text-xs ml-auto hidden md:block">
                      Try: TSLA · NVDA · AAPL · PLTR
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {!hasData && !isLoading && !hasError && <EmptyState />}

              {(hasData || isLoading) && (
                <ErrorBoundary>
                  <div className="space-y-5">
                    <StockHeader
                      metrics={metrics}
                      loading={metricsState === "loading"}
                      lastUpdated={analysis?.lastUpdated}
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
                              — Diplomatic filters disabled. Unfiltered cynical context engaged.
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-3 gap-3">
                      <MetricCard
                        label="YoY Revenue"
                        value={metrics ? formatPercent(metrics.revenueGrowthYoY) : "—"}
                        delta={metrics ? `QoQ: ${formatPercent(metrics.revenueGrowthQoQ)}` : undefined}
                        deltaPositive={metrics ? metrics.revenueGrowthYoY > 0 : undefined}
                        sparkline={priceHistory?.map((p) => p.price)}
                        accent={
                          metrics
                            ? metrics.revenueGrowthYoY > 20
                              ? "emerald"
                              : metrics.revenueGrowthYoY < 0
                              ? "crimson"
                              : "amber"
                            : "slate"
                        }
                        loading={metricsState === "loading"}
                      />
                      <MetricCard
                        label="Insider Activity"
                        value={
                          metrics?.insiderRecentTransactions.length
                            ? metrics.insiderRecentTransactions[0].type === "sell"
                              ? "NET SELL"
                              : "NET BUY"
                            : "—"
                        }
                        delta={
                          metrics?.insiderRecentTransactions.length
                            ? `${metrics.insiderRecentTransactions.length} recent tx`
                            : undefined
                        }
                        deltaPositive={
                          metrics?.insiderRecentTransactions[0]?.type === "buy"
                        }
                        accent={
                          metrics?.insiderRecentTransactions[0]?.type === "sell"
                            ? "crimson"
                            : "emerald"
                        }
                        loading={metricsState === "loading"}
                      />
                      <MetricCard
                        label="Hype Index"
                        value={analysis ? `${analysis.fluffScore}/100` : "—"}
                        delta={
                          analysis
                            ? analysis.fluffScore >= 75
                              ? "Maximum Fluff"
                              : analysis.fluffScore >= 50
                              ? "High Fluff"
                              : "Low Fluff"
                            : undefined
                        }
                        deltaPositive={analysis ? analysis.fluffScore < 40 : undefined}
                        accent={
                          analysis
                            ? analysis.fluffScore >= 75
                              ? "crimson"
                              : analysis.fluffScore >= 50
                              ? "amber"
                              : "emerald"
                            : "slate"
                        }
                        loading={analysisState === "loading"}
                      />
                    </div>

                    <PriceChart
                      data={priceHistory ?? []}
                      ticker={activeTicker ?? ""}
                      loading={priceHistoryState === "loading"}
                    />

                    <MetricsBar
                      metrics={metrics}
                      loading={metricsState === "loading"}
                    />

                    <TruthGrid
                      analysis={analysis}
                      loading={analysisState === "loading"}
                      mode={mode}
                    />

                    {analysis && analysis.myth.length > 0 && (
                      <InsightCards
                        myths={analysis.myth}
                        realities={analysis.reality}
                        mode={mode}
                      />
                    )}

                    {metrics?.insiderRecentTransactions &&
                      metrics.insiderRecentTransactions.length > 0 && (
                        <InsiderFeed transactions={metrics.insiderRecentTransactions} />
                      )}
                  </div>
                </ErrorBoundary>
              )}
            </div>
          </main>

          <aside className="hidden xl:flex w-[300px] shrink-0 flex-col overflow-hidden">
            <AuditTerminal logs={logs} />
          </aside>
        </div>

        <footer className="border-t border-border px-6 py-2.5 flex items-center justify-between shrink-0 bg-obsidian/80">
          <span className="text-[10px] text-text-ghost mono">
            ANTI-FLUFF INVESTOR — Raw Financial Truth
          </span>
          <span className="text-[10px] text-text-ghost mono">
            Simulated data · Not financial advice
          </span>
        </footer>
      </div>
    </div>
  );
}
