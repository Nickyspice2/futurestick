"use client";

import { useState, useCallback, useRef } from "react";
import type { TerminalLog, TerminalLogLevel } from "@/types";
import { buildTerminalLog, getAuditLogSequence } from "@/lib/mock-data";

export function useAuditTerminal() {
  const [logs, setLogs] = useState<TerminalLog[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const append = useCallback((level: TerminalLogLevel, message: string) => {
    setLogs((prev) => [...prev.slice(-299), buildTerminalLog(level, message)]);
  }, []);

  const clear = useCallback(() => setLogs([]), []);

  const streamForTicker = useCallback(
    (ticker: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clear();

      const sequence = getAuditLogSequence(ticker);
      let i = 0;

      function scheduleNext() {
        if (i >= sequence.length) return;
        const jitter = 80 + Math.random() * 160;
        timerRef.current = setTimeout(() => {
          const [level, message] = sequence[i];
          append(level, message);
          i++;
          scheduleNext();
        }, jitter);
      }

      scheduleNext();
    },
    [append, clear]
  );

  const appendSliderChange = useCallback(
    (level: number) => {
      const label =
        level >= 80 ? "MAXIMUM FLUFF" :
        level >= 60 ? "HIGH FLUFF" :
        level >= 40 ? "MODERATE FLUFF" :
        level >= 20 ? "LOW FLUFF" : "MINIMAL";

      append("INFO", `Fluff filter recalibrated → ${level}% [${label}]`);
    },
    [append]
  );

  return { logs, append, clear, streamForTicker, appendSliderChange };
}
