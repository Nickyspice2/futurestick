"use client";

import { motion } from "framer-motion";
import type { TruthAnalysis, FluffMode } from "@/types";
import { MythPanel } from "./myth-panel";
import { RealityPanel } from "./reality-panel";
import { VerdictPanel } from "./verdict-panel";
import { TruthGridSkeleton } from "@/components/ui/skeleton";

interface TruthGridProps {
  analysis: TruthAnalysis | null;
  loading: boolean;
  mode: FluffMode;
}

export function TruthGrid({ analysis, loading, mode }: TruthGridProps) {
  if (loading) return <TruthGridSkeleton />;
  if (!analysis) return null;

  return (
    <motion.div
      key={analysis.ticker}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start"
    >
      <MythPanel myths={analysis.myth} />
      <RealityPanel entries={analysis.reality} mode={mode} />
      <VerdictPanel verdict={analysis.verdict} mode={mode} fluffScore={analysis.fluffScore} />
    </motion.div>
  );
}
