export type FluffMode = "diplomatic" | "brutal";

export type RiskLevel = "low" | "medium" | "high" | "extreme";

export type VerdictLabel =
  | "UNDERVALUED"
  | "FAIRLY VALUED"
  | "OVERVALUED"
  | "SPECULATIVE TRAP"
  | "HYPE BUBBLE";

export interface StockMetrics {
  ticker: string;
  companyName: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  peRatio: number | null;
  forwardPE: number | null;
  priceToSales: number;
  priceToBook: number;
  evToEbitda: number | null;
  revenueGrowthYoY: number;
  revenueGrowthQoQ: number;
  grossMargin: number;
  operatingMargin: number;
  netMargin: number;
  freeCashFlowYield: number | null;
  debtToEquity: number;
  currentRatio: number;
  insiderOwnership: number;
  institutionalOwnership: number;
  insiderRecentTransactions: InsiderTransaction[];
  shortInterest: number;
  analystConsensus: AnalystConsensus;
  earningsSurprises: EarningsSurprise[];
}

export interface InsiderTransaction {
  name: string;
  title: string;
  type: "buy" | "sell";
  shares: number;
  value: number;
  date: string;
}

export interface AnalystConsensus {
  buy: number;
  hold: number;
  sell: number;
  targetPriceLow: number;
  targetPriceHigh: number;
  targetPriceMean: number;
}

export interface EarningsSurprise {
  quarter: string;
  estimated: number;
  actual: number;
  surprisePercent: number;
}

export interface TruthAnalysis {
  ticker: string;
  myth: MythEntry[];
  reality: RealityEntry[];
  verdict: Verdict;
  fluffScore: number;
  lastUpdated: string;
}

export interface MythEntry {
  id: string;
  claim: string;
  source: "analyst" | "media" | "company" | "social";
  severity: "low" | "medium" | "high";
}

export interface RealityEntry {
  id: string;
  metric: string;
  value: string;
  context: string;
  trend: "up" | "down" | "flat";
  signal: "bullish" | "bearish" | "neutral";
}

export interface Verdict {
  label: VerdictLabel;
  riskLevel: RiskLevel;
  score: number;
  summary: string;
  brutalSummary: string;
  keyRisks: string[];
  keyStrengths: string[];
}

export interface SearchResult {
  ticker: string;
  name: string;
  sector: string;
  exchange: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface PricePoint {
  date: string;
  price: number;
  volume: number;
}

export type TerminalLogLevel =
  | "INFO"
  | "WARN"
  | "SIGNAL"
  | "AUDIT"
  | "ERROR"
  | "SUCCESS";

export interface TerminalLog {
  id: string;
  timestamp: string;
  level: TerminalLogLevel;
  message: string;
}

export interface TickerQuick {
  ticker: string;
  name: string;
  price: number;
  changePercent: number;
  fluffScore: number;
}
