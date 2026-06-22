"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "emerald" | "crimson" | "amber" | "slate" | "cyan";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  emerald:
    "bg-[rgba(16,185,129,0.12)] text-emerald border border-[rgba(16,185,129,0.25)]",
  crimson:
    "bg-[rgba(239,68,68,0.12)] text-crimson border border-[rgba(239,68,68,0.25)]",
  amber:
    "bg-[rgba(245,158,11,0.12)] text-amber border border-[rgba(245,158,11,0.25)]",
  slate:
    "bg-surface-3 text-text-secondary border border-border",
  cyan:
    "bg-[rgba(6,182,212,0.12)] text-cyan border border-[rgba(6,182,212,0.25)]",
};

export function Badge({ variant = "slate", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest mono uppercase",
        VARIANT_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
