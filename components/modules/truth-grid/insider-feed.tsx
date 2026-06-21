"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, User } from "lucide-react";
import type { InsiderTransaction } from "@/types";
import { formatLargeNumber } from "@/lib/api-client";

interface InsiderFeedProps {
  transactions: InsiderTransaction[];
}

export function InsiderFeed({ transactions }: InsiderFeedProps) {
  if (!transactions.length) return null;

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-xs font-bold text-text-secondary mono tracking-widest uppercase">
          Recent Insider Transactions
        </h3>
      </div>

      <div className="divide-y divide-border">
        {transactions.map((tx, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06 }}
            className="flex items-center gap-4 px-5 py-3"
          >
            <div
              className={[
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                tx.type === "buy"
                  ? "bg-[rgba(16,185,129,0.12)]"
                  : "bg-[rgba(239,68,68,0.12)]",
              ].join(" ")}
            >
              {tx.type === "buy" ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-crimson" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <User className="w-3 h-3 text-text-tertiary shrink-0" />
                <span className="text-sm font-medium text-text-primary truncate">
                  {tx.name}
                </span>
                <span className="text-xs text-text-tertiary shrink-0">{tx.title}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`text-[10px] mono font-bold uppercase ${
                    tx.type === "buy" ? "text-emerald" : "text-crimson"
                  }`}
                >
                  {tx.type === "buy" ? "BOUGHT" : "SOLD"}
                </span>
                <span className="text-xs text-text-tertiary mono">
                  {tx.shares.toLocaleString()} shares
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div
                className={`text-sm font-bold mono ${
                  tx.type === "buy" ? "text-emerald" : "text-crimson"
                }`}
              >
                {formatLargeNumber(tx.value)}
              </div>
              <div className="text-[10px] text-text-tertiary mono">
                {new Date(tx.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "2-digit",
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
