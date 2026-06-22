"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import type { TerminalLog, TerminalLogLevel } from "@/types";

interface AuditTerminalProps {
  logs: TerminalLog[];
}

const LEVEL_CONFIG: Record<TerminalLogLevel, { color: string; bg: string }> = {
  INFO:    { color: "text-[#94a3b8]",  bg: "text-[#475569]"  },
  WARN:    { color: "text-amber",       bg: "text-[#92400e]"  },
  ERROR:   { color: "text-crimson",     bg: "text-[#7f1d1d]"  },
  SIGNAL:  { color: "text-cyan",        bg: "text-[#164e63]"  },
  AUDIT:   { color: "text-[#a78bfa]",   bg: "text-[#4c1d95]"  },
  SUCCESS: { color: "text-emerald",     bg: "text-[#064e3b]"  },
};

export function AuditTerminal({ logs }: AuditTerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-[#07070a] border-l border-border">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald" />
          <span className="text-[10px] mono tracking-widest uppercase text-text-tertiary">
            Audit Terminal
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="terminal-cursor text-emerald mono text-sm leading-none">▋</span>
          <span className="text-[10px] text-text-ghost mono">{logs.length} events</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-2 px-1"
        style={{ fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
            <Terminal className="w-6 h-6 text-text-ghost" />
            <p className="text-[10px] text-text-ghost mono text-center px-4">
              Select an instrument to begin audit stream
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <LogLine key={log.id} log={log} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function LogLine({ log }: { log: TerminalLog }) {
  const cfg = LEVEL_CONFIG[log.level];

  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="flex items-start gap-2 px-3 py-1 hover:bg-[rgba(255,255,255,0.02)] transition-colors rounded group"
    >
      <span className="text-[9px] text-[#2d3748] mono shrink-0 mt-0.5 group-hover:text-[#475569] transition-colors">
        {log.timestamp}
      </span>
      <span className={`text-[9px] mono font-bold uppercase shrink-0 mt-0.5 w-11 ${cfg.color}`}>
        {log.level}
      </span>
      <span className="text-[10px] text-[#64748b] mono leading-relaxed break-words group-hover:text-[#94a3b8] transition-colors">
        {log.message}
      </span>
    </motion.div>
  );
}
