"use client";

import { motion } from "framer-motion";
import { MessageCircle, Flame } from "lucide-react";
import type { FluffMode } from "@/types";

interface FluffFilterProps {
  mode: FluffMode;
  onToggle: () => void;
}

export function FluffFilter({ mode, onToggle }: FluffFilterProps) {
  const isBrutal = mode === "brutal";

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col items-end gap-0.5">
        <span className="text-[10px] text-text-tertiary mono tracking-widest uppercase">
          Analysis Mode
        </span>
        <motion.span
          key={mode}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs font-bold mono tracking-wider ${isBrutal ? "text-crimson" : "text-text-secondary"}`}
        >
          {isBrutal ? "BRUTAL REALITY" : "DIPLOMATIC"}
        </motion.span>
      </div>

      <button
        onClick={onToggle}
        className="relative flex items-center gap-1 focus:outline-none group"
        aria-label={`Switch to ${isBrutal ? "diplomatic" : "brutal"} mode`}
        role="switch"
        aria-checked={isBrutal}
      >
        <div
          className={[
            "relative w-[88px] h-10 rounded-xl border transition-all duration-300 overflow-hidden",
            isBrutal
              ? "bg-[rgba(239,68,68,0.1)] border-[rgba(239,68,68,0.35)]"
              : "bg-surface-2 border-border",
          ].join(" ")}
        >
          <motion.div
            className={[
              "absolute top-1 bottom-1 w-[38px] rounded-lg z-10 flex items-center justify-center shadow-sm",
              isBrutal ? "bg-crimson" : "bg-surface-3",
            ].join(" ")}
            animate={{ left: isBrutal ? "46px" : "4px" }}
            transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.8 }}
          >
            <motion.div
              animate={{ rotate: isBrutal ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isBrutal ? (
                <Flame className="w-4 h-4 text-white" strokeWidth={2} />
              ) : (
                <MessageCircle className="w-4 h-4 text-text-secondary" strokeWidth={1.5} />
              )}
            </motion.div>
          </motion.div>

          {isBrutal && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background:
                  "radial-gradient(ellipse at 80% 50%, rgba(239,68,68,0.15) 0%, transparent 70%)",
              }}
            />
          )}
        </div>
      </button>

      <div className="hidden lg:flex flex-col gap-0.5">
        <span className="text-[10px] text-text-tertiary mono tracking-widest uppercase">
          Filter Level
        </span>
        <div className="flex items-center gap-1.5">
          {["D", "R"].map((label, i) => {
            const active = isBrutal ? i === 1 : i === 0;
            return (
              <div
                key={label}
                className={[
                  "w-5 h-1 rounded-full transition-all duration-300",
                  active
                    ? isBrutal
                      ? "bg-crimson"
                      : "bg-text-tertiary"
                    : "bg-surface-3",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
