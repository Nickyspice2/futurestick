"use client";

import { useState, useCallback } from "react";
import type { StockMetrics, TruthAnalysis, LoadingState } from "@/types";
import { fetchStockMetrics, fetchTruthAnalysis } from "@/lib/api-client";

interface StockDataState {
  metrics: StockMetrics | null;
  analysis: TruthAnalysis | null;
  metricsState: LoadingState;
  analysisState: LoadingState;
  error: string | null;
  activeTicker: string | null;
}

const INITIAL: StockDataState = {
  metrics: null,
  analysis: null,
  metricsState: "idle",
  analysisState: "idle",
  error: null,
  activeTicker: null,
};

export function useStockData() {
  const [state, setState] = useState<StockDataState>(INITIAL);

  const loadStock = useCallback(async (ticker: string) => {
    setState({
      metrics: null,
      analysis: null,
      metricsState: "loading",
      analysisState: "loading",
      error: null,
      activeTicker: ticker.toUpperCase(),
    });

    const results = await Promise.allSettled([
      fetchStockMetrics(ticker),
      fetchTruthAnalysis(ticker),
    ]);

    const [metricsResult, analysisResult] = results;

    setState((prev) => ({
      ...prev,
      metrics:
        metricsResult.status === "fulfilled" ? metricsResult.value : null,
      analysis:
        analysisResult.status === "fulfilled" ? analysisResult.value : null,
      metricsState:
        metricsResult.status === "fulfilled" ? "success" : "error",
      analysisState:
        analysisResult.status === "fulfilled" ? "success" : "error",
      error:
        metricsResult.status === "rejected"
          ? (metricsResult.reason as Error).message
          : null,
    }));
  }, []);

  const reset = useCallback(() => setState(INITIAL), []);

  return { ...state, loadStock, reset };
}
