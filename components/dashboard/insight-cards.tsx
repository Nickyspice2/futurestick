"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import type { MythEntry, RealityEntry, FluffMode } from "@/types";

interface InsightCardsProps {
  myths: MythEntry[];
  realities: RealityEntry[];
  mode: FluffMode;
}

const SOURCE_LABELS: Record<MythEntry["source"], string> = {
  analyst: "ANALYST",
  media: "MEDIA",
  company: "COMPANY IR",
  social: "SOCIAL",
};

const SEVERITY_DOT: Record<MythEntry["severity"], string> = {
  low: "bg-amber",
  medium: "bg-crimson opacity-70",
  high: "bg-crimson animate-pulse",
};

const SIGNAL_BADGE: Record<RealityEntry["signal"], { text: string; color: string }> = {
  bullish:  { text: "BULLISH",  color: "text-emerald" },
  bearish:  { text: "BEARISH",  color: "text-crimson"  },
  neutral:  { text: "NEUTRAL",  color: "text-amber"    },
};

export function InsightCards({ myths, realities, mode }: InsightCardsProps) {
  const pairs = myths.map((myth, i) => ({ myth, reality: realities[i] ?? null }));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <span className="text-[10px] mono tracking-widest uppercase text-text-tertiary">
          Narrative vs Reality
        </span>
        <div className="h-px flex-1 bg-border" />
        <span className="text-[10px] mono text-text-ghost">{pairs.length} pairs</span>
      </div>

      {pairs.map(({ myth, reality }, idx) => (
        <InsightPair
          key={myth.id}
          myth={myth}
          reality={reality}
          idx={idx}
          mode={mode}
        />
      ))}
    </div>
  );
}

interface InsightPairProps {
  myth: MythEntry;
  reality: RealityEntry | null;
  idx: number;
  mode: FluffMode;
}

function InsightPair({ myth, reality, idx, mode }: InsightPairProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.06, duration: 0.28, ease: "easeOut" }}
      className="grid grid-cols-[1fr_auto_1fr] gap-0 rounded-xl overflow-hidden border border-border"
    >
      <div className="bg-[rgba(239,68,68,0.04)] px-4 py-4 border-r border-[rgba(239,68,68,0.15)]">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-3.5 h-3.5 text-crimson shrink-0" />
          <span className="text-[9px] mono font-bold uppercase tracking-widest text-crimson">
            Claim
          </span>
          <span className="text-[9px] mono text-text-ghost uppercase ml-auto">
            {SOURCE_LABELS[myth.source]}
          </span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          &ldquo;{myth.claim}&rdquo;
        </p>
        <div className="flex items-center gap-1.5 mt-3">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${SEVERITY_DOT[myth.severity]}`} />
          <span className="text-[9px] mono text-text-ghost uppercase">{myth.severity} severity</span>
        </div>
      </div>

      <div className="flex items-center justify-center w-8 bg-surface-3 border-x border-border">
        <ArrowRight className="w-3.5 h-3.5 text-text-ghost" />
      </div>

      <div className="bg-[rgba(16,185,129,0.03)] px-4 py-4">
        {reality ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0" />
              <span className="text-[9px] mono font-bold uppercase tracking-widest text-emerald">
                Reality
              </span>
              <span className={`text-[9px] mono font-bold ml-auto ${SIGNAL_BADGE[reality.signal].color}`}>
                {SIGNAL_BADGE[reality.signal].text}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-[9px] mono text-text-ghost uppercase tracking-wider shrink-0">
                {reality.metric}
              </span>
              <span className={`text-sm font-black mono ${SIGNAL_BADGE[reality.signal].color}`}>
                {reality.value}
              </span>
            </div>
            <p className="text-xs text-text-tertiary leading-relaxed">
              {mode === "brutal"
                ? reality.context
                : reality.context.split(".")[0] + "."}
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center h-full py-4">
            <span className="text-xs text-text-ghost mono italic">No direct data point mapped</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
