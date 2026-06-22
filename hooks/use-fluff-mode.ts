"use client";

import { useState, useCallback } from "react";
import type { FluffMode } from "@/types";

export function useFluffMode(initial: FluffMode = "diplomatic") {
  const [mode, setMode] = useState<FluffMode>(initial);

  const toggle = useCallback(() => {
    setMode((m) => (m === "diplomatic" ? "brutal" : "diplomatic"));
  }, []);

  const set = useCallback((m: FluffMode) => setMode(m), []);

  return { mode, toggle, set, isBrutal: mode === "brutal" };
}
