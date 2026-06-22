import type {
  StockMetrics,
  TruthAnalysis,
  SearchResult,
  PricePoint,
  TerminalLog,
  TerminalLogLevel,
  TickerQuick,
} from "@/types";

export const MOCK_SEARCH_RESULTS: SearchResult[] = [
  { ticker: "TSLA", name: "Tesla, Inc.", sector: "Consumer Cyclical", exchange: "NASDAQ" },
  { ticker: "NVDA", name: "NVIDIA Corporation", sector: "Technology", exchange: "NASDAQ" },
  { ticker: "AAPL", name: "Apple Inc.", sector: "Technology", exchange: "NASDAQ" },
  { ticker: "AMZN", name: "Amazon.com, Inc.", sector: "Consumer Cyclical", exchange: "NASDAQ" },
  { ticker: "MSFT", name: "Microsoft Corporation", sector: "Technology", exchange: "NASDAQ" },
  { ticker: "GOOGL", name: "Alphabet Inc.", sector: "Communication Services", exchange: "NASDAQ" },
  { ticker: "META", name: "Meta Platforms, Inc.", sector: "Communication Services", exchange: "NASDAQ" },
  { ticker: "AMD", name: "Advanced Micro Devices", sector: "Technology", exchange: "NASDAQ" },
  { ticker: "PLTR", name: "Palantir Technologies", sector: "Technology", exchange: "NYSE" },
  { ticker: "COIN", name: "Coinbase Global, Inc.", sector: "Financial Services", exchange: "NASDAQ" },
];

const STOCK_DATA: Record<string, StockMetrics> = {
  TSLA: {
    ticker: "TSLA",
    companyName: "Tesla, Inc.",
    sector: "Consumer Cyclical",
    price: 247.82,
    change: -8.43,
    changePercent: -3.29,
    marketCap: 790_000_000_000,
    peRatio: 68.4,
    forwardPE: 55.1,
    priceToSales: 8.2,
    priceToBook: 11.7,
    evToEbitda: 42.3,
    revenueGrowthYoY: 2.1,
    revenueGrowthQoQ: -6.8,
    grossMargin: 17.4,
    operatingMargin: 4.2,
    netMargin: 5.1,
    freeCashFlowYield: 1.2,
    debtToEquity: 0.18,
    currentRatio: 1.84,
    insiderOwnership: 13.0,
    institutionalOwnership: 44.2,
    insiderRecentTransactions: [
      { name: "Elon Musk", title: "CEO", type: "sell", shares: 3_500_000, value: 875_000_000, date: "2024-12-15" },
      { name: "Robyn Denholm", title: "Board Chair", type: "sell", shares: 120_000, value: 29_500_000, date: "2025-01-08" },
    ],
    shortInterest: 3.1,
    analystConsensus: { buy: 18, hold: 14, sell: 9, targetPriceLow: 138, targetPriceHigh: 410, targetPriceMean: 263 },
    earningsSurprises: [
      { quarter: "Q3 2024", estimated: 0.58, actual: 0.72, surprisePercent: 24.1 },
      { quarter: "Q2 2024", estimated: 0.44, actual: 0.52, surprisePercent: 18.2 },
      { quarter: "Q1 2024", estimated: 0.49, actual: 0.45, surprisePercent: -8.2 },
      { quarter: "Q4 2023", estimated: 0.74, actual: 0.71, surprisePercent: -4.1 },
    ],
  },
  NVDA: {
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    sector: "Technology",
    price: 136.94,
    change: 3.21,
    changePercent: 2.40,
    marketCap: 3_360_000_000_000,
    peRatio: 53.8,
    forwardPE: 34.2,
    priceToSales: 31.4,
    priceToBook: 44.6,
    evToEbitda: 41.2,
    revenueGrowthYoY: 122.0,
    revenueGrowthQoQ: 17.2,
    grossMargin: 75.1,
    operatingMargin: 61.7,
    netMargin: 55.9,
    freeCashFlowYield: 2.1,
    debtToEquity: 0.43,
    currentRatio: 4.17,
    insiderOwnership: 3.9,
    institutionalOwnership: 68.4,
    insiderRecentTransactions: [
      { name: "Jensen Huang", title: "CEO", type: "sell", shares: 600_000, value: 82_100_000, date: "2025-01-22" },
      { name: "Colette Kress", title: "CFO", type: "sell", shares: 40_000, value: 5_470_000, date: "2025-01-28" },
    ],
    shortInterest: 1.2,
    analystConsensus: { buy: 40, hold: 5, sell: 2, targetPriceLow: 100, targetPriceHigh: 220, targetPriceMean: 175 },
    earningsSurprises: [
      { quarter: "Q3 2025", estimated: 0.71, actual: 0.81, surprisePercent: 14.1 },
      { quarter: "Q2 2025", estimated: 0.61, actual: 0.68, surprisePercent: 11.5 },
      { quarter: "Q1 2025", estimated: 5.57, actual: 6.12, surprisePercent: 9.9 },
      { quarter: "Q4 2024", estimated: 4.59, actual: 5.16, surprisePercent: 12.4 },
    ],
  },
  AAPL: {
    ticker: "AAPL",
    companyName: "Apple Inc.",
    sector: "Technology",
    price: 213.49,
    change: 1.14,
    changePercent: 0.54,
    marketCap: 3_210_000_000_000,
    peRatio: 34.6,
    forwardPE: 30.8,
    priceToSales: 8.9,
    priceToBook: 48.2,
    evToEbitda: 27.1,
    revenueGrowthYoY: 4.9,
    revenueGrowthQoQ: 2.1,
    grossMargin: 46.2,
    operatingMargin: 31.5,
    netMargin: 26.4,
    freeCashFlowYield: 3.4,
    debtToEquity: 1.47,
    currentRatio: 0.87,
    insiderOwnership: 0.07,
    institutionalOwnership: 61.3,
    insiderRecentTransactions: [
      { name: "Tim Cook", title: "CEO", type: "sell", shares: 110_000, value: 23_700_000, date: "2025-01-31" },
    ],
    shortInterest: 0.7,
    analystConsensus: { buy: 28, hold: 12, sell: 5, targetPriceLow: 165, targetPriceHigh: 300, targetPriceMean: 241 },
    earningsSurprises: [
      { quarter: "Q1 2025", estimated: 2.35, actual: 2.40, surprisePercent: 2.1 },
      { quarter: "Q4 2024", estimated: 1.59, actual: 1.64, surprisePercent: 3.1 },
      { quarter: "Q3 2024", estimated: 1.35, actual: 1.40, surprisePercent: 3.7 },
      { quarter: "Q2 2024", estimated: 1.50, actual: 1.53, surprisePercent: 2.0 },
    ],
  },
  PLTR: {
    ticker: "PLTR",
    companyName: "Palantir Technologies",
    sector: "Technology",
    price: 87.14,
    change: 2.87,
    changePercent: 3.41,
    marketCap: 199_000_000_000,
    peRatio: 347.2,
    forwardPE: 156.8,
    priceToSales: 62.1,
    priceToBook: 29.4,
    evToEbitda: 289.4,
    revenueGrowthYoY: 29.7,
    revenueGrowthQoQ: 7.2,
    grossMargin: 80.1,
    operatingMargin: 13.8,
    netMargin: 21.4,
    freeCashFlowYield: 0.7,
    debtToEquity: 0.05,
    currentRatio: 5.82,
    insiderOwnership: 7.1,
    institutionalOwnership: 34.8,
    insiderRecentTransactions: [
      { name: "Alexander Karp", title: "CEO", type: "sell", shares: 8_000_000, value: 697_000_000, date: "2024-11-20" },
      { name: "Peter Thiel", title: "Director", type: "sell", shares: 28_500_000, value: 1_240_000_000, date: "2024-10-14" },
    ],
    shortInterest: 2.4,
    analystConsensus: { buy: 6, hold: 8, sell: 10, targetPriceLow: 28, targetPriceHigh: 105, targetPriceMean: 58 },
    earningsSurprises: [
      { quarter: "Q3 2024", estimated: 0.09, actual: 0.10, surprisePercent: 11.1 },
      { quarter: "Q2 2024", estimated: 0.08, actual: 0.09, surprisePercent: 12.5 },
      { quarter: "Q1 2024", estimated: 0.08, actual: 0.08, surprisePercent: 0.0 },
      { quarter: "Q4 2023", estimated: 0.08, actual: 0.08, surprisePercent: 0.0 },
    ],
  },
};

const ANALYSIS_DATA: Record<string, TruthAnalysis> = {
  TSLA: {
    ticker: "TSLA",
    fluffScore: 78,
    lastUpdated: "2025-06-20T14:30:00Z",
    myth: [
      {
        id: "m1",
        claim: "Tesla is a technology company, not an automaker, justifying premium multiples.",
        source: "analyst",
        severity: "high",
      },
      {
        id: "m2",
        claim: "Full Self-Driving will unlock a trillion-dollar robotaxi revenue stream imminently.",
        source: "company",
        severity: "high",
      },
      {
        id: "m3",
        claim: "Tesla's energy division is an emerging hypergrowth business that will dwarf auto revenue.",
        source: "media",
        severity: "medium",
      },
      {
        id: "m4",
        claim: "Strong brand loyalty creates an unassailable competitive moat in EVs.",
        source: "analyst",
        severity: "medium",
      },
    ],
    reality: [
      {
        id: "r1",
        metric: "Revenue Growth YoY",
        value: "+2.1%",
        context: "Auto segment delivered near-flat growth as price cuts failed to stimulate volume proportionally. Legacy OEMs catching up fast.",
        trend: "down",
        signal: "bearish",
      },
      {
        id: "r2",
        metric: "Gross Margin",
        value: "17.4%",
        context: "Compressed from 29.1% in 2022 to 17.4% — a 1170bps collapse driven by aggressive price wars they started but cannot win alone.",
        trend: "down",
        signal: "bearish",
      },
      {
        id: "r3",
        metric: "P/E Ratio",
        value: "68.4×",
        context: "Priced for 30%+ growth, delivering 2%. The gap is not a narrative — it's a financial category error.",
        trend: "flat",
        signal: "bearish",
      },
      {
        id: "r4",
        metric: "Insider Transactions",
        value: "$875M sold",
        context: "CEO sold $875M in December alone. Directors follow. The 'true believers' thesis has a conspicuous exit door.",
        trend: "down",
        signal: "bearish",
      },
      {
        id: "r5",
        metric: "Free Cash Flow Yield",
        value: "1.2%",
        context: "At a $790B market cap, you're paying 83× free cash flow for a company with decelerating auto growth and unproven FSD economics.",
        trend: "flat",
        signal: "bearish",
      },
    ],
    verdict: {
      label: "SPECULATIVE TRAP",
      riskLevel: "high",
      score: 28,
      summary:
        "Tesla trades at growth-company multiples while delivering value-company metrics. Margin compression, decelerating revenue, and heavy insider selling compound the risk.",
      brutalSummary:
        "You're paying $790B for a car company with 17% gross margins and 2% revenue growth because someone keeps promising robots and full self-driving will arrive 'next year' — as they have for seven consecutive years. The CEO sold $875M of stock in December. Pattern recognition is free.",
      keyRisks: [
        "Margin compression accelerating as BYD/Hyundai/VW close the EV gap",
        "FSD regulatory approval uncertain in key markets (EU, China)",
        "CEO distraction risk (Twitter/X, SpaceX, xAI, political activities)",
        "China market share erosion — BYD outselling Tesla in home market",
      ],
      keyStrengths: [
        "Supercharger network is a genuine moat, now licensing to competitors",
        "Balance sheet is clean (D/E: 0.18)",
        "Energy storage business (Megapack) is legitimate and growing",
      ],
    },
  },
  NVDA: {
    ticker: "NVDA",
    fluffScore: 41,
    lastUpdated: "2025-06-20T14:30:00Z",
    myth: [
      {
        id: "m1",
        claim: "NVIDIA has built an unbreakable monopoly on AI infrastructure for the next decade.",
        source: "analyst",
        severity: "medium",
      },
      {
        id: "m2",
        claim: "Custom silicon from hyperscalers (Google TPUs, Amazon Trainium) poses zero threat.",
        source: "social",
        severity: "high",
      },
      {
        id: "m3",
        claim: "CUDA lock-in makes switching costs infinite — customers are trapped forever.",
        source: "media",
        severity: "medium",
      },
    ],
    reality: [
      {
        id: "r1",
        metric: "Revenue Growth YoY",
        value: "+122%",
        context: "Genuinely extraordinary. Data center revenue exceeding $47B annualized. Growth is real, not optical.",
        trend: "up",
        signal: "bullish",
      },
      {
        id: "r2",
        metric: "Gross Margin",
        value: "75.1%",
        context: "Software-like margins in a hardware business. Blackwell supply constraints supporting pricing power for now.",
        trend: "up",
        signal: "bullish",
      },
      {
        id: "r3",
        metric: "P/S Ratio",
        value: "31.4×",
        context: "Hyper-premium. Priced for continued dominance through 2030. Any sign of AMD/custom silicon traction will reprice violently.",
        trend: "flat",
        signal: "neutral",
      },
      {
        id: "r4",
        metric: "Customer Concentration",
        value: "~40% top-5",
        context: "Microsoft, Google, Meta, Amazon, Oracle collectively dominate revenue. These are also the companies building competing silicon.",
        trend: "flat",
        signal: "bearish",
      },
    ],
    verdict: {
      label: "OVERVALUED",
      riskLevel: "medium",
      score: 61,
      summary:
        "The business is genuinely exceptional — but valuation assumes sustained monopolistic pricing that custom silicon development directly threatens. Great company, extreme multiple.",
      brutalSummary:
        "NVIDIA is printing money and the fundamentals are real — 122% revenue growth is not a narrative. But at 31× sales, you're pricing in perfection for six consecutive years in a hardware market where your five biggest customers are building replacements in their own data centers. The moat is real. Whether it's worth $3.3 trillion is a separate question with a less comfortable answer.",
      keyRisks: [
        "Google TPU v5, Amazon Trainium 2 maturing rapidly",
        "AMD MI300X gaining traction in inference workloads",
        "US export controls limiting China revenue (~$6B at risk)",
        "Cyclical AI CapEx slowdown if ROI doesn't materialize for hyperscalers",
      ],
      keyStrengths: [
        "CUDA ecosystem: 4M+ developers, $50B in software tools",
        "Blackwell architecture is genuinely 2-3 generations ahead",
        "75%+ gross margin creates durable earnings power",
        "Jensen Huang is one of the best capital allocators in tech",
      ],
    },
  },
  AAPL: {
    ticker: "AAPL",
    fluffScore: 35,
    lastUpdated: "2025-06-20T14:30:00Z",
    myth: [
      {
        id: "m1",
        claim: "Apple Intelligence will reignite the iPhone upgrade supercycle, driving massive revenue acceleration.",
        source: "analyst",
        severity: "medium",
      },
      {
        id: "m2",
        claim: "Services segment's 'infinite scalability' justifies a premium multiple on all revenue.",
        source: "media",
        severity: "medium",
      },
    ],
    reality: [
      {
        id: "r1",
        metric: "Revenue Growth YoY",
        value: "+4.9%",
        context: "Steady, predictable. Not a growth story — a cash generation story. The distinction matters enormously at $3.2T market cap.",
        trend: "up",
        signal: "neutral",
      },
      {
        id: "r2",
        metric: "Free Cash Flow Yield",
        value: "3.4%",
        context: "Returns ~$100B/year in buybacks. At this yield, it's competing with 10-year treasuries, not growth equities.",
        trend: "flat",
        signal: "neutral",
      },
      {
        id: "r3",
        metric: "China Revenue Risk",
        value: "~18% of revenue",
        context: "Huawei Mate 60 Pro returning to shelves. Premium Android alternatives stronger than at any point in the last decade.",
        trend: "down",
        signal: "bearish",
      },
    ],
    verdict: {
      label: "FAIRLY VALUED",
      riskLevel: "low",
      score: 58,
      summary:
        "Apple is a phenomenal cash machine with predictable shareholder returns. At $3.2T, you're paying a quality premium that leaves limited upside unless Apple Intelligence drives a genuine upgrade cycle.",
      brutalSummary:
        "Apple is the world's best cash register. The problem is that you're paying $3.2 trillion for a business growing at 5% annually. That's not a mistake — it's a deliberate trade of upside for safety. The Services story is real but already priced in. Apple Intelligence might not move the needle. You're buying reliability at a steep premium — at least be clear-eyed about what that trade-off is.",
      keyRisks: [
        "China market share pressure from Huawei and domestic brands",
        "DOJ antitrust case threatening App Store economics",
        "Limited AI differentiation — Siri still trails Google/OpenAI substantially",
        "Hardware saturation in developed markets",
      ],
      keyStrengths: [
        "$95B+ annual free cash flow returned to shareholders",
        "Services margin (73%+) expanding the overall earnings quality",
        "iPhone installed base of 1.2B is structurally stickiest in consumer tech",
        "Balance sheet effectively debt-neutral at operating cash flow levels",
      ],
    },
  },
  PLTR: {
    ticker: "PLTR",
    fluffScore: 94,
    lastUpdated: "2025-06-20T14:30:00Z",
    myth: [
      {
        id: "m1",
        claim: "Palantir's AI Platform (AIP) is a paradigm-shifting technology creating defensible moats.",
        source: "company",
        severity: "high",
      },
      {
        id: "m2",
        claim: "Government contracts provide recession-proof revenue certainty and expansion visibility.",
        source: "analyst",
        severity: "medium",
      },
      {
        id: "m3",
        claim: "PLTR is a once-in-a-decade investment opportunity mispriced by traditional valuation frameworks.",
        source: "social",
        severity: "high",
      },
      {
        id: "m4",
        claim: "The US Army and intelligence community dependency creates an unbreakable competitive moat.",
        source: "analyst",
        severity: "medium",
      },
    ],
    reality: [
      {
        id: "r1",
        metric: "P/E Ratio",
        value: "347×",
        context: "Three hundred and forty-seven times earnings. To justify this, PLTR needs to grow earnings 30× in 10 years. Revenue growth is 30% per year — far below what's needed.",
        trend: "up",
        signal: "bearish",
      },
      {
        id: "r2",
        metric: "P/S Ratio",
        value: "62.1×",
        context: "62× sales puts PLTR ahead of NVDA, ahead of Google, ahead of every profitable, large-scale software business on Earth. The math doesn't survive scrutiny.",
        trend: "up",
        signal: "bearish",
      },
      {
        id: "r3",
        metric: "CEO Insider Selling",
        value: "$697M in 60 days",
        context: "Alex Karp sold $697M of shares over 60 days on a 10b5-1 plan. Peter Thiel sold $1.24B. This is the definition of a divergence signal.",
        trend: "down",
        signal: "bearish",
      },
      {
        id: "r4",
        metric: "Revenue Growth",
        value: "+29.7% YoY",
        context: "Real growth, genuinely impressive. But at 62× sales, 30% growth barely keeps pace with the valuation's implied expectations.",
        trend: "up",
        signal: "neutral",
      },
      {
        id: "r5",
        metric: "Operating Margin",
        value: "13.8%",
        context: "After 20 years of operation and government contracts, operating margin is 13.8%. This is not a high-leverage software business — it's a services-heavy consulting shop with a software veneer.",
        trend: "up",
        signal: "bearish",
      },
    ],
    verdict: {
      label: "HYPE BUBBLE",
      riskLevel: "extreme",
      score: 8,
      summary:
        "Trading at 347× earnings and 62× sales, Palantir requires a chain of perfect outcomes over a decade to justify current price. Insiders are exiting at maximum velocity.",
      brutalSummary:
        "PLTR at 347× earnings is not a valuation — it's a prayer. The company's own CEO and largest backer sold nearly $2 billion of stock in under 90 days while retail investors cite 'paradigm shifts' on social media. The government contracts are real. The AI narrative is partially real. The 62× price-to-sales ratio is real too, and it means you need Palantir to become the fifth-largest software company in the world — just to break even on today's entry price over 10 years. The gap between story and math has rarely been this wide for a profitable company.",
      keyRisks: [
        "Valuation requires near-impossible multi-decade compounding to justify",
        "Government contracts vulnerable to DOGE-style budget cuts",
        "AIP platform not demonstrably superior to OpenAI enterprise, Salesforce AI, or SAP",
        "Management selling $2B of stock is a forensic-grade red flag",
        "Commercial segment growth needs to accelerate 3–4× to matter at this market cap",
      ],
      keyStrengths: [
        "Real government relationships (CIA, Army, DIA) with genuine switching costs",
        "No debt, $4B+ cash on balance sheet",
        "AIP boot camps generating genuine enterprise pipeline",
      ],
    },
  },
};

function buildPriceHistory(closes: number[]): PricePoint[] {
  const now = new Date("2025-06-20");
  return closes.map((price, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (closes.length - 1 - i) * 3);
    return {
      date: d.toISOString().substring(0, 10),
      price,
      volume: Math.floor(30_000_000 + Math.random() * 60_000_000),
    };
  });
}

const PRICE_HISTORY_RAW: Record<string, number[]> = {
  TSLA: [
    175.2, 182.4, 178.8, 191.3, 187.4, 195.2, 188.9, 201.4, 208.7, 204.2,
    215.8, 221.3, 218.4, 227.9, 223.5, 234.1, 229.8, 238.4, 244.7, 241.2,
    252.3, 248.9, 255.4, 251.8, 247.3, 258.4, 253.1, 249.7, 244.2, 247.8,
  ],
  NVDA: [
    75.4, 78.2, 82.7, 79.8, 85.3, 88.9, 92.4, 87.6, 94.2, 97.8,
    103.5, 101.2, 108.4, 112.7, 109.3, 116.8, 121.4, 118.9, 125.3, 128.7,
    124.2, 130.8, 127.4, 133.9, 136.2, 132.7, 138.4, 135.1, 131.8, 136.9,
  ],
  AAPL: [
    185.2, 188.7, 191.3, 195.8, 193.4, 198.7, 201.2, 197.8, 204.5, 207.8,
    203.2, 209.4, 212.7, 208.9, 215.3, 218.4, 214.7, 220.1, 223.5, 219.8,
    225.4, 221.9, 217.3, 213.8, 216.4, 219.7, 215.2, 211.8, 208.4, 213.5,
  ],
  PLTR: [
    42.1, 44.8, 48.3, 45.7, 51.2, 54.8, 58.3, 55.9, 62.4, 67.8,
    63.2, 69.4, 72.8, 69.3, 75.4, 79.8, 76.2, 82.4, 85.7, 81.9,
    87.3, 84.8, 89.2, 86.4, 81.7, 85.3, 88.9, 84.2, 80.7, 87.1,
  ],
};

export const TICKER_QUICK_LIST: TickerQuick[] = [
  { ticker: "NVDA", name: "NVIDIA Corporation", price: 136.94, changePercent: 2.40, fluffScore: 41 },
  { ticker: "TSLA", name: "Tesla, Inc.", price: 247.82, changePercent: -3.29, fluffScore: 78 },
  { ticker: "AAPL", name: "Apple Inc.", price: 213.49, changePercent: 0.54, fluffScore: 35 },
  { ticker: "PLTR", name: "Palantir Technologies", price: 87.14, changePercent: 3.41, fluffScore: 94 },
];

const AUDIT_LOG_SEQUENCES: Record<string, Array<[TerminalLogLevel, string]>> = {
  TSLA: [
    ["INFO", "Initializing TSLA.NQ — Consumer Cyclical / NASDAQ"],
    ["AUDIT", "Loading fundamental data stream..."],
    ["INFO", "P/E ratio resolved: 68.4× (sector median: 24.2×)"],
    ["WARN", "Gross margin below 20% — price war damage detected"],
    ["SIGNAL", "Insider sell signal: CEO disposed $875M in 30 days"],
    ["AUDIT", "Running fluff detection against analyst coverage..."],
    ["WARN", "4 high-severity narrative anomalies flagged"],
    ["SIGNAL", "YoY revenue growth: +2.1% vs consensus of +18% — DELTA: -15.9pp"],
    ["AUDIT", "Cross-referencing FSD regulatory filings..."],
    ["WARN", "FSD approval: 0 of 7 major markets confirmed"],
    ["INFO", "Energy division (Megapack): genuine growth, insufficient scale"],
    ["SUCCESS", "Analysis complete. Fluff Score: 78/100 — SPECULATIVE TRAP"],
  ],
  NVDA: [
    ["INFO", "Initializing NVDA.NQ — Technology / NASDAQ"],
    ["AUDIT", "Loading fundamental data stream..."],
    ["INFO", "Revenue growth YoY: +122.0% — VERIFIED ORGANIC"],
    ["INFO", "Gross margin: 75.1% — software-tier in hardware business"],
    ["AUDIT", "Evaluating competitive moat durability..."],
    ["WARN", "Customer concentration: top-5 = ~40% of revenue"],
    ["SIGNAL", "Alert: top-5 customers actively developing competing silicon"],
    ["AUDIT", "Running CUDA ecosystem defensibility model..."],
    ["INFO", "CUDA developer base: 4M+ — switching cost is high but finite"],
    ["WARN", "P/S at 31.4× — assumes uninterrupted dominance through 2030"],
    ["SIGNAL", "Insider activity: CEO sold $82M on 10b5-1 plan (routine)"],
    ["SUCCESS", "Analysis complete. Fluff Score: 41/100 — OVERVALUED"],
  ],
  AAPL: [
    ["INFO", "Initializing AAPL.NQ — Technology / NASDAQ"],
    ["AUDIT", "Loading fundamental data stream..."],
    ["INFO", "Market cap: $3.21T — pricing implies perpetual quality premium"],
    ["INFO", "FCF yield: 3.4% — $95B returned to shareholders annually"],
    ["AUDIT", "Checking Services segment margin expansion..."],
    ["INFO", "Services gross margin: 73.4% — structural earnings quality uplift"],
    ["WARN", "China revenue: ~18% — Huawei competition escalating in premium tier"],
    ["AUDIT", "Running narrative vs reality reconciliation..."],
    ["INFO", "Apple Intelligence: no measurable upgrade cycle uplift yet detected"],
    ["SIGNAL", "Revenue growth YoY +4.9% — in-line with expectations, no upside surprise"],
    ["WARN", "DOJ antitrust case: App Store economics at potential risk"],
    ["SUCCESS", "Analysis complete. Fluff Score: 35/100 — FAIRLY VALUED"],
  ],
  PLTR: [
    ["INFO", "Initializing PLTR.NY — Technology / NYSE"],
    ["AUDIT", "Loading fundamental data stream..."],
    ["ERROR", "P/E ratio: 347.2× — exceeds all validated valuation models"],
    ["ERROR", "P/S ratio: 62.1× — no precedent at this scale in profitable software"],
    ["SIGNAL", "CRITICAL: CEO sold $697M in 60 days — 10b5-1 plan active"],
    ["SIGNAL", "CRITICAL: Peter Thiel sold $1.24B — largest single disposal event"],
    ["AUDIT", "Running government contract defensibility analysis..."],
    ["INFO", "DOGE-equivalent budget risk: government contracts under review"],
    ["WARN", "Operating margin: 13.8% after 20 years of operation"],
    ["WARN", "AIP platform: not demonstrably differentiated vs enterprise LLM alternatives"],
    ["ERROR", "Valuation requires 30× earnings growth to justify entry price in 10 years"],
    ["SUCCESS", "Analysis complete. Fluff Score: 94/100 — HYPE BUBBLE ⚠"],
  ],
};

const GENERIC_LOGS: Array<[TerminalLogLevel, string]> = [
  ["INFO", "Initializing ticker analysis..."],
  ["AUDIT", "Loading fundamental data stream..."],
  ["INFO", "Data resolved — running pattern detection"],
  ["AUDIT", "Cross-referencing analyst consensus with reported figures"],
  ["WARN", "No detailed analysis available for this ticker in the mock dataset"],
  ["INFO", "Basic metrics loaded successfully"],
  ["SUCCESS", "Analysis complete"],
];

export function getAuditLogSequence(ticker: string): Array<[TerminalLogLevel, string]> {
  return AUDIT_LOG_SEQUENCES[ticker.toUpperCase()] ?? GENERIC_LOGS;
}

export function buildTerminalLog(level: TerminalLogLevel, message: string): TerminalLog {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0");
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: `${h}:${m}:${s}.${ms}`,
    level,
    message,
  };
}

export function getMockStockMetrics(ticker: string): StockMetrics | null {
  return STOCK_DATA[ticker.toUpperCase()] ?? null;
}

export function getMockAnalysis(ticker: string): TruthAnalysis | null {
  return ANALYSIS_DATA[ticker.toUpperCase()] ?? null;
}

export function getMockPriceHistory(ticker: string): PricePoint[] | null {
  const raw = PRICE_HISTORY_RAW[ticker.toUpperCase()];
  return raw ? buildPriceHistory(raw) : null;
}

export function searchMockTickers(query: string): SearchResult[] {
  const q = query.toUpperCase().trim();
  if (!q) return [];
  return MOCK_SEARCH_RESULTS.filter(
    (r) =>
      r.ticker.startsWith(q) ||
      r.name.toUpperCase().includes(q)
  ).slice(0, 6);
}
