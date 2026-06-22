import type { RiskLevel, VerdictLabel } from "@/types";

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const RISK_CONFIG: Record<
  RiskLevel,
  { label: string; color: string; bg: string; border: string }
> = {
  low: {
    label: "LOW RISK",
    color: "text-emerald",
    bg: "bg-emerald-glow",
    border: "border-emerald-border",
  },
  medium: {
    label: "MODERATE RISK",
    color: "text-amber",
    bg: "bg-amber-glow",
    border: "border-amber-border",
  },
  high: {
    label: "HIGH RISK",
    color: "text-crimson",
    bg: "bg-crimson-glow",
    border: "border-crimson-border",
  },
  extreme: {
    label: "EXTREME RISK",
    color: "text-crimson",
    bg: "bg-crimson-glow",
    border: "border-crimson-border",
  },
};

export const VERDICT_CONFIG: Record<
  VerdictLabel,
  { color: string; bg: string; border: string }
> = {
  UNDERVALUED: {
    color: "text-emerald",
    bg: "bg-emerald-glow",
    border: "border-emerald-border",
  },
  "FAIRLY VALUED": {
    color: "text-amber",
    bg: "bg-amber-glow",
    border: "border-amber-border",
  },
  OVERVALUED: {
    color: "text-amber",
    bg: "bg-amber-glow",
    border: "border-amber-border",
  },
  "SPECULATIVE TRAP": {
    color: "text-crimson",
    bg: "bg-crimson-glow",
    border: "border-crimson-border",
  },
  "HYPE BUBBLE": {
    color: "text-crimson",
    bg: "bg-crimson-glow",
    border: "border-crimson-border",
  },
};

export function fluffScoreColor(score: number): string {
  if (score >= 75) return "text-crimson";
  if (score >= 50) return "text-amber";
  return "text-emerald";
}

export function fluffScoreLabel(score: number): string {
  if (score >= 85) return "MAXIMUM FLUFF";
  if (score >= 70) return "HIGH FLUFF";
  if (score >= 50) return "MODERATE FLUFF";
  if (score >= 30) return "LOW FLUFF";
  return "MINIMAL FLUFF";
}
