"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";

interface FluffSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const LEVEL_LABELS = [
  { max: 20,  label: "MINIMAL",  color: "#94a3b8" },
  { max: 40,  label: "LOW",      color: "#10b981" },
  { max: 60,  label: "MODERATE", color: "#f59e0b" },
  { max: 80,  label: "HIGH",     color: "#f97316" },
  { max: 100, label: "MAXIMUM",  color: "#ef4444" },
];

function getLevel(v: number) {
  return LEVEL_LABELS.find((l) => v <= l.max) ?? LEVEL_LABELS[LEVEL_LABELS.length - 1];
}

function trackGradient(v: number): string {
  const pct = v / 100;
  if (pct <= 0.4) {
    const t = pct / 0.4;
    const r = Math.round(148 + (16 - 148) * t);
    const g = Math.round(163 + (185 - 163) * t);
    const b = Math.round(184 + (129 - 184) * t);
    return `rgb(${r},${g},${b})`;
  }
  if (pct <= 0.7) {
    const t = (pct - 0.4) / 0.3;
    const r = Math.round(16 + (245 - 16) * t);
    const g = Math.round(185 + (158 - 185) * t);
    const b = Math.round(129 + (11 - 129) * t);
    return `rgb(${r},${g},${b})`;
  }
  const t = (pct - 0.7) / 0.3;
  const r = Math.round(245 + (239 - 245) * t);
  const g = Math.round(158 + (68 - 158) * t);
  const b = Math.round(11 + (68 - 11) * t);
  return `rgb(${r},${g},${b})`;
}

export function FluffSlider({ value, onChange }: FluffSliderProps) {
  const level = getLevel(value);
  const thumbColor = trackGradient(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  return (
    <div className="glass-panel rounded-xl px-5 py-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] mono tracking-widest uppercase text-text-tertiary">
            Fluff Filter Intensity
          </span>
          <motion.span
            key={level.label}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="text-[10px] mono font-bold tracking-widest uppercase"
            style={{ color: thumbColor }}
          >
            {level.label}
          </motion.span>
        </div>
        <motion.span
          className="text-sm font-black mono"
          style={{ color: thumbColor }}
          animate={{ color: thumbColor }}
          transition={{ duration: 0.1 }}
        >
          {value}%
        </motion.span>
      </div>

      <div className="relative flex items-center" style={{ height: "28px" }}>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-surface-3 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${value}%`,
              background: `linear-gradient(to right, #475569, ${thumbColor})`,
            }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 0.05 }}
          />
        </div>

        <motion.div
          className="absolute w-5 h-5 rounded-full border-2 border-[rgba(255,255,255,0.15)] z-[5] pointer-events-none"
          style={{
            left: `${value}%`,
            transform: `translateX(-${value / 100 * 100}%)`,
            backgroundColor: thumbColor,
            boxShadow: `0 0 10px ${thumbColor}66, 0 0 3px ${thumbColor}`,
          }}
          animate={{
            left: `${value}%`,
            backgroundColor: thumbColor,
          }}
          transition={{ duration: 0.05 }}
        />

        <input
          type="range"
          className="fluff-range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={handleChange}
          aria-label="Fluff filter intensity"
          style={{ height: "28px" }}
        />
      </div>

      <div className="flex justify-between">
        <span className="text-[9px] text-text-ghost mono">DIPLOMATIC</span>
        <span className="text-[9px] text-text-ghost mono">BRUTAL REALITY</span>
      </div>
    </div>
  );
}
