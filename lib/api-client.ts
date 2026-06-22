import type { StockMetrics, TruthAnalysis, SearchResult, PricePoint } from "@/types";
import {
  getMockStockMetrics,
  getMockAnalysis,
  getMockPriceHistory,
  searchMockTickers,
} from "@/lib/mock-data";

const SIMULATED_DELAY = 600;

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchStockMetrics(ticker: string): Promise<StockMetrics> {
  await delay(SIMULATED_DELAY);
  const data = getMockStockMetrics(ticker);
  if (!data) {
    throw new ApiError(
      `No data available for ticker "${ticker.toUpperCase()}"`,
      "TICKER_NOT_FOUND",
      404
    );
  }
  return data;
}

export async function fetchTruthAnalysis(ticker: string): Promise<TruthAnalysis> {
  await delay(SIMULATED_DELAY + 200);
  const data = getMockAnalysis(ticker);
  if (!data) {
    throw new ApiError(
      `No analysis available for ticker "${ticker.toUpperCase()}"`,
      "ANALYSIS_NOT_FOUND",
      404
    );
  }
  return data;
}

export async function fetchPriceHistory(ticker: string): Promise<PricePoint[]> {
  await delay(SIMULATED_DELAY - 100);
  const data = getMockPriceHistory(ticker);
  if (!data) {
    throw new ApiError(
      `No price history for "${ticker.toUpperCase()}"`,
      "HISTORY_NOT_FOUND",
      404
    );
  }
  return data;
}

export async function searchTickers(query: string): Promise<SearchResult[]> {
  await delay(200);
  return searchMockTickers(query);
}

export function formatMarketCap(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  return `$${(value / 1_000_000).toFixed(0)}M`;
}

export function formatPercent(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatLargeNumber(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M`;
  }
  return value.toLocaleString();
}
