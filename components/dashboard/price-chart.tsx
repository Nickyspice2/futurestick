"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { PricePoint } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface PriceChartProps {
  data: PricePoint[];
  ticker: string;
  loading?: boolean;
}

const VIEWBOX_W = 620;
const VIEWBOX_H = 180;
const PAD = { top: 16, right: 16, bottom: 32, left: 52 };
const PLOT_W = VIEWBOX_W - PAD.left - PAD.right;
const PLOT_H = VIEWBOX_H - PAD.top - PAD.bottom;

function smoothPath(pts: Array<{ x: number; y: number }>): string {
  if (pts.length < 2) return "";
  return pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
    const p0 = pts[Math.max(i - 2, 0)];
    const p1 = pts[i - 1];
    const p3 = pts[Math.min(i + 1, pts.length - 1)];
    const cp1x = (p1.x + (p.x - p0.x) / 6).toFixed(2);
    const cp1y = (p1.y + (p.y - p0.y) / 6).toFixed(2);
    const cp2x = (p.x - (p3.x - p1.x) / 6).toFixed(2);
    const cp2y = (p.y - (p3.y - p1.y) / 6).toFixed(2);
    return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }, "");
}

export function PriceChart({ data, ticker, loading = false }: PriceChartProps) {
  const chart = useMemo(() => {
    if (!data.length) return null;

    const prices = data.map((d) => d.price);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const priceRange = maxP - minP || 1;

    const toX = (i: number) => PAD.left + (i / (data.length - 1)) * PLOT_W;
    const toY = (p: number) => PAD.top + PLOT_H - ((p - minP) / priceRange) * PLOT_H;

    const svgPts = data.map((d, i) => ({ x: toX(i), y: toY(d.price) }));
    const linePath = smoothPath(svgPts);
    const first = svgPts[0];
    const last = svgPts[svgPts.length - 1];
    const areaPath = `${linePath} L ${last.x.toFixed(2)},${(PAD.top + PLOT_H).toFixed(2)} L ${first.x.toFixed(2)},${(PAD.top + PLOT_H).toFixed(2)} Z`;

    const isPositive = data[data.length - 1].price >= data[0].price;
    const strokeColor = isPositive ? "#10b981" : "#ef4444";
    const gradientId = `chart-grad-${ticker}`;

    const xLabels = [0, 7, 14, 21, 29].filter((i) => i < data.length).map((i) => ({
      x: toX(i),
      label: new Date(data[i].date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }));

    const ySteps = 4;
    const yLabels = Array.from({ length: ySteps + 1 }, (_, i) => {
      const price = minP + (priceRange / ySteps) * i;
      return {
        y: toY(price),
        label: `$${price >= 1000 ? (price / 1000).toFixed(1) + "k" : price.toFixed(0)}`,
      };
    });

    return { linePath, areaPath, strokeColor, gradientId, xLabels, yLabels, isPositive, last, minP, maxP };
  }, [data, ticker]);

  if (loading) {
    return <Skeleton className="w-full h-[180px] rounded-xl" />;
  }

  if (!chart) return null;

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-[10px] mono tracking-widest uppercase text-text-tertiary">
          90-Day Price
        </span>
        <span className={`text-[10px] mono font-bold ${chart.isPositive ? "text-emerald" : "text-crimson"}`}>
          {chart.isPositive ? "▲" : "▼"}&nbsp;
          {(((data[data.length - 1].price - data[0].price) / data[0].price) * 100).toFixed(1)}%
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="w-full"
        style={{ height: "auto" }}
        aria-label={`${ticker} 90-day price chart`}
        role="img"
      >
        <defs>
          <linearGradient id={chart.gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chart.strokeColor} stopOpacity="0.18" />
            <stop offset="100%" stopColor={chart.strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>

        {chart.yLabels.map(({ y, label }) => (
          <g key={label}>
            <line
              x1={PAD.left}
              y1={y}
              x2={VIEWBOX_W - PAD.right}
              y2={y}
              stroke="#1e1e26"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 6}
              y={y}
              textAnchor="end"
              dominantBaseline="middle"
              fill="#475569"
              fontSize="9"
              fontFamily="var(--font-geist-mono)"
            >
              {label}
            </text>
          </g>
        ))}

        {chart.xLabels.map(({ x, label }) => (
          <text
            key={label}
            x={x}
            y={VIEWBOX_H - 6}
            textAnchor="middle"
            fill="#475569"
            fontSize="9"
            fontFamily="var(--font-geist-mono)"
          >
            {label}
          </text>
        ))}

        <motion.path
          d={chart.areaPath}
          fill={`url(#${chart.gradientId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        <motion.path
          d={chart.linePath}
          fill="none"
          stroke={chart.strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        <motion.circle
          cx={chart.last.x}
          cy={chart.last.y}
          r={3.5}
          fill={chart.strokeColor}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.25, type: "spring" }}
        />
      </svg>
    </div>
  );
}
