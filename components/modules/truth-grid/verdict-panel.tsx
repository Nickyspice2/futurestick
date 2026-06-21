"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon, Gauge, CheckCircle2, XCircle } from "lucide-react";
import type { Verdict, FluffMode } from "@/types";
import { RISK_CONFIG, VERDICT_CONFIG, fluffScoreColor, fluffScoreLabel } from "@/lib/utils";

interface VerdictPanelProps {
  verdict: Verdict;
  mode: FluffMode;
  fluffScore: number;
}

export function VerdictPanel({ verdict, mode, fluffScore }: VerdictPanelProps) {
  const isBrutal = mode === "brutal";
  const riskCfg = RISK_CONFIG[verdict.riskLevel];
  const verdictCfg = VERDICT_CONFIG[verdict.label];

  return (
    <div className="glass-panel rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[rgba(245,158,11,0.1)] flex items-center justify-center">
            <Gauge className="w-3.5 h-3.5 text-amber" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-amber mono tracking-widest uppercase">
              The Verdict
            </h3>
            <p className="text-[10px] text-text-tertiary mt-0.5">
              Mathematically-driven conclusion
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <motion.div
              key={verdict.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-xl font-black mono tracking-tight ${verdictCfg.color}`}
            >
              {verdict.label}
            </motion.div>
            <div className={`text-[10px] mono font-semibold tracking-widest uppercase mt-1 ${riskCfg.color}`}>
              {riskCfg.label}
            </div>
          </div>

          <ScoreRing score={verdict.score} color={verdictCfg.color} />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-text-tertiary mono tracking-widest uppercase">
              Conviction Score
            </span>
            <span className={`text-sm font-bold mono ${verdictCfg.color}`}>
              {verdict.score}/100
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-3 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                verdict.score >= 60
                  ? "bg-emerald"
                  : verdict.score >= 40
                  ? "bg-amber"
                  : "bg-crimson"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${verdict.score}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        <FluffMeter score={fluffScore} />

        <AnimatePresence mode="wait">
          <motion.div
            key={`summary-${mode}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className={[
              "rounded-lg p-4 border text-sm leading-relaxed",
              isBrutal
                ? "bg-[rgba(239,68,68,0.06)] border-[rgba(239,68,68,0.2)] text-text-secondary"
                : "bg-surface-3 border-border text-text-tertiary",
            ].join(" ")}
          >
            {isBrutal ? verdict.brutalSummary : verdict.summary}
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-3">
          {verdict.keyStrengths.length > 0 && (
            <KeyList
              title="Strengths"
              items={verdict.keyStrengths}
              icon={CheckCircle2}
              color="text-emerald"
              borderColor="border-[rgba(16,185,129,0.15)]"
            />
          )}
          {verdict.keyRisks.length > 0 && (
            <KeyList
              title="Key Risks"
              items={verdict.keyRisks}
              icon={XCircle}
              color="text-crimson"
              borderColor="border-[rgba(239,68,68,0.15)]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="#1a1a20" strokeWidth="4" />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          stroke="currentColor"
          className={color}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-xs font-black mono ${color}`}>{score}</span>
      </div>
    </div>
  );
}

function FluffMeter({ score }: { score: number }) {
  const color = fluffScoreColor(score);
  const label = fluffScoreLabel(score);

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 px-3 rounded-lg bg-surface-3 border border-border">
      <div className="flex items-center gap-2">
        <AlertOctagon className={`w-3.5 h-3.5 ${color}`} />
        <span className="text-[10px] text-text-tertiary mono tracking-widest uppercase">
          Fluff Index
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-24 h-1 bg-surface-2 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              score >= 75 ? "bg-crimson" : score >= 50 ? "bg-amber" : "bg-emerald"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className={`text-[10px] mono font-bold ${color}`}>{label}</span>
      </div>
    </div>
  );
}

interface KeyListProps {
  title: string;
  items: string[];
  icon: React.ElementType;
  color: string;
  borderColor: string;
}

function KeyList({ title, items, icon: Icon, color, borderColor }: KeyListProps) {
  return (
    <div className={`rounded-lg border ${borderColor} p-3 space-y-2`}>
      <div className="flex items-center gap-1.5">
        <Icon className={`w-3 h-3 ${color}`} />
        <span className={`text-[10px] mono font-semibold tracking-widest uppercase ${color}`}>
          {title}
        </span>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 + 0.2 }}
            className="text-xs text-text-tertiary flex items-start gap-2 leading-relaxed"
          >
            <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${color === "text-emerald" ? "bg-emerald" : "bg-crimson"}`} />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
