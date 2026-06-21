"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Megaphone, Newspaper, Building2, Users } from "lucide-react";
import type { MythEntry } from "@/types";
import { Badge } from "@/components/ui/badge";

interface MythPanelProps {
  myths: MythEntry[];
}

const SOURCE_CONFIG = {
  analyst: { label: "Analyst", icon: Building2 },
  media: { label: "Media", icon: Newspaper },
  company: { label: "Company IR", icon: Megaphone },
  social: { label: "Social", icon: Users },
};

const SEVERITY_CONFIG = {
  low: { color: "text-amber", dotColor: "bg-amber" },
  medium: { color: "text-crimson", dotColor: "bg-crimson" },
  high: { color: "text-crimson", dotColor: "bg-crimson animate-pulse" },
};

export function MythPanel({ myths }: MythPanelProps) {
  return (
    <div className="glass-panel rounded-xl overflow-hidden border-[rgba(239,68,68,0.2)] border flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(239,68,68,0.15)]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[rgba(239,68,68,0.12)] flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5 text-crimson" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-crimson mono tracking-widest uppercase">
              The Myth
            </h3>
            <p className="text-[10px] text-text-tertiary mt-0.5">
              What the narrative machine claims
            </p>
          </div>
        </div>
        <Badge variant="crimson">{myths.length}</Badge>
      </div>

      <div className="flex flex-col divide-y divide-border flex-1">
        {myths.map((myth, idx) => {
          const source = SOURCE_CONFIG[myth.source];
          const severity = SEVERITY_CONFIG[myth.severity];
          const SourceIcon = source.icon;

          return (
            <motion.div
              key={myth.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.3, ease: "easeOut" }}
              className="p-4 group hover:bg-[rgba(239,68,68,0.03)] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${severity.dotColor}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
                    &ldquo;{myth.claim}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 mt-2.5">
                    <div className="flex items-center gap-1 text-[10px] text-text-tertiary">
                      <SourceIcon className="w-3 h-3" />
                      <span className="mono">{source.label}</span>
                    </div>
                    <span className="text-text-ghost">·</span>
                    <span className={`text-[10px] mono font-semibold uppercase tracking-wider ${severity.color}`}>
                      {myth.severity} severity
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
