"use client";

import { useState, useCallback } from "react";
import type { StockMetrics, TruthAnalysis, PricePoint, LoadingState } from "@/types";
import { fetchStockMetrics, fetchTruthAnalysis, fetchPriceHistory } from "@/lib/api-client";

interface StockDataState {
  metrics: StockMetrics | null;
  analysis: TruthAnalysis | null;
  priceHistory: PricePoint[] | null;
  metricsState: LoadingState;
  analysisState: LoadingState;
  priceHistoryState: LoadingState;
  error: string | null;
  activeTicker: string | null;
}

const INITIAL: StockDataState = {
  metrics: null,
  analysis: null,
  priceHistory: null,
  metricsState: "idle",
  analysisState: "idle",
  priceHistoryState: "idle",
  error: null,
  activeTicker: null,
};

export function useStockData() {
  const [state, setState] = useState<StockDataState>(INITIAL);

  const loadStock = useCallback(async (ticker: string) => {
    setState({
      metrics: null,
      analysis: null,
      priceHistory: null,
      metricsState: "loading",
      analysisState: "loading",
      priceHistoryState: "loading",
      error: null,
      activeTicker: ticker.toUpperCase(),
    });

    const results = await Promise.allSettled([
      fetchStockMetrics(ticker),
      fetchTruthAnalysis(ticker),
      fetchPriceHistory(ticker),
    ]);

    const [metricsResult, analysisResult, historyResult] = results;

    setState((prev) => ({
      ...prev,
      metrics: metricsResult.status === "fulfilled" ? metricsResult.value : null,
      analysis: analysisResult.status === "fulfilled" ? analysisResult.value : null,
      priceHistory: historyResult.status === "fulfilled" ? historyResult.value : null,
      metricsState: metricsResult.status === "fulfilled" ? "success" : "error",
      analysisState: analysisResult.status === "fulfilled" ? "success" : "error",
      priceHistoryState: historyResult.status === "fulfilled" ? "success" : "error",
      error:
        metricsResult.status === "rejected"
          ? (metricsResult.reason as Error).message
          : null,
    }));
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return { ...state, loadStock, reset };
}
