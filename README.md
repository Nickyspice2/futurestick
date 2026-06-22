# Anti-Fluff Investor

Strip away analyst hype, AI-generated fluff, and marketing spin. See the brutal financial truth behind public company narratives.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (custom design system)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
/app                    Pages, layout, global CSS
/components
  /ui                   Primitives (Skeleton, Badge)
  /shared               ErrorBoundary
  /modules
    /background         GridCanvas (animated canvas background)
    /nav                Sidebar
    /search             TickerSearch (with neon glow)
    /filter             FluffFilter (diplomatic ↔ brutal toggle)
    /truth-grid         TruthGrid, MythPanel, RealityPanel, VerdictPanel,
                        MetricsBar, StockHeader, InsiderFeed, EmptyState
/hooks                  useStockData, useFluffMode
/lib                    api-client, mock-data, utils
/types                  Shared TypeScript types
```

## Features

- **Smart Ticker Search** — Debounced search with neon focus glow and dropdown
- **Fluff Filter** — Toggle between diplomatic framing and brutal wall-street reality
- **Myth Panel** — What analysts, media, and company IR actually claim
- **Reality Panel** — Raw metrics with zero narrative spin
- **Verdict Panel** — Math-driven conviction score, risk level, fluff index
- **Metrics Bar** — P/E, revenue growth, margins, market cap, short interest, FCF yield
- **Insider Feed** — Recent insider buy/sell transactions
- **Animated Grid Canvas** — Futuristic background with subtle emerald glow

## Available Tickers (Mock Data)

`TSLA` `NVDA` `AAPL` `PLTR` — full analysis  
`AMZN` `MSFT` `GOOGL` `META` `AMD` `COIN` — search results only

## Development

```bash
npm install
npm run dev
```
