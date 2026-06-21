"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp, Loader2 } from "lucide-react";
import type { SearchResult } from "@/types";
import { searchTickers } from "@/lib/api-client";

interface TickerSearchProps {
  onSelect: (ticker: string) => void;
  disabled?: boolean;
}

const SUGGESTIONS = ["TSLA", "NVDA", "AAPL", "PLTR", "AMZN"];

export function TickerSearch({ onSelect, disabled }: TickerSearchProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const data = await searchTickers(q);
    setResults(data);
    setSearching(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(query), 220);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(ticker: string) {
    setSelected(ticker);
    setQuery(ticker);
    setFocused(false);
    setResults([]);
    onSelect(ticker);
  }

  function handleClear() {
    setQuery("");
    setSelected(null);
    setResults([]);
    inputRef.current?.focus();
  }

  const showDropdown = focused && (results.length > 0 || (!query && !searching));

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <motion.div
        animate={
          focused
            ? { boxShadow: "0 0 0 1px rgba(6,182,212,0.4), 0 0 32px rgba(6,182,212,0.12)" }
            : { boxShadow: "0 0 0 1px rgba(30,30,38,1), 0 0 0px rgba(6,182,212,0)" }
        }
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center gap-3 px-4 py-3 bg-surface rounded-xl border border-border"
      >
        <div className="shrink-0">
          {searching ? (
            <Loader2 className="w-4 h-4 text-cyan animate-spin" />
          ) : (
            <Search className={`w-4 h-4 transition-colors ${focused ? "text-cyan" : "text-text-tertiary"}`} />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          onFocus={() => setFocused(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) handleSelect(query.trim());
            if (e.key === "Escape") setFocused(false);
          }}
          placeholder="Search ticker (TSLA, NVDA, AAPL...)"
          disabled={disabled}
          className="flex-1 bg-transparent text-text-primary placeholder:text-text-tertiary text-sm mono outline-none disabled:opacity-40"
          autoComplete="off"
          spellCheck={false}
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              onClick={handleClear}
              className="shrink-0 p-0.5 rounded text-text-tertiary hover:text-text-secondary transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => query.trim() && handleSelect(query.trim())}
          disabled={disabled || !query.trim()}
          className="shrink-0 px-3 py-1.5 bg-emerald text-obsidian text-xs font-bold rounded-lg mono tracking-wider disabled:opacity-30 hover:bg-[#0ea472] transition-colors"
        >
          ANALYZE
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {!query ? (
              <div className="p-3">
                <p className="text-[10px] text-text-tertiary mono tracking-widest uppercase mb-2 px-1">
                  Popular Tickers
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleSelect(t)}
                      className="px-2.5 py-1 text-xs mono text-text-secondary hover:text-text-primary bg-surface-3 hover:bg-surface-2 border border-border hover:border-cyan-border rounded-lg transition-all"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              results.map((result, idx) => (
                <motion.button
                  key={result.ticker}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={() => handleSelect(result.ticker)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-3 transition-colors text-left border-b border-border last:border-b-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-3 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5 text-text-tertiary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-text-primary mono">{result.ticker}</span>
                      <span className="text-[10px] text-text-tertiary">{result.exchange}</span>
                    </div>
                    <p className="text-xs text-text-tertiary truncate">{result.name}</p>
                  </div>
                  <span className="text-[10px] text-text-tertiary shrink-0">{result.sector}</span>
                </motion.button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {selected && (
        <div className="mt-1.5 flex items-center gap-1.5 pl-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
          <span className="text-xs text-text-tertiary">
            Showing analysis for{" "}
            <span className="text-emerald mono font-semibold">{selected}</span>
          </span>
        </div>
      )}
    </div>
  );
}
