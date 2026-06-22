"use client";

import { cn } from "@/lib/utils";

type ContainerGlow = "emerald" | "crimson" | "amber" | "none";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  titleRight?: React.ReactNode;
  glow?: ContainerGlow;
  cornerAccents?: boolean;
  noPadding?: boolean;
}

const GLOW_STYLES: Record<ContainerGlow, string> = {
  emerald: "shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_0_24px_rgba(16,185,129,0.07)]",
  crimson: "shadow-[0_0_0_1px_rgba(239,68,68,0.25),0_0_24px_rgba(239,68,68,0.07)]",
  amber:   "shadow-[0_0_0_1px_rgba(245,158,11,0.25),0_0_24px_rgba(245,158,11,0.07)]",
  none:    "",
};

const CORNER_COLOR: Record<ContainerGlow, string> = {
  emerald: "border-[rgba(16,185,129,0.5)]",
  crimson: "border-[rgba(239,68,68,0.5)]",
  amber:   "border-[rgba(245,158,11,0.5)]",
  none:    "border-[rgba(255,255,255,0.12)]",
};

export function Container({
  children,
  className,
  title,
  titleRight,
  glow = "none",
  cornerAccents = false,
  noPadding = false,
}: ContainerProps) {
  const cornerCls = CORNER_COLOR[glow];

  return (
    <div
      className={cn(
        "relative rounded-xl glass-panel overflow-visible",
        GLOW_STYLES[glow],
        className
      )}
    >
      {cornerAccents && (
        <>
          <span className={cn("absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 rounded-tl-xl pointer-events-none z-10", cornerCls)} />
          <span className={cn("absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 rounded-tr-xl pointer-events-none z-10", cornerCls)} />
          <span className={cn("absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 rounded-bl-xl pointer-events-none z-10", cornerCls)} />
          <span className={cn("absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 rounded-br-xl pointer-events-none z-10", cornerCls)} />
        </>
      )}

      {(title !== undefined || titleRight !== undefined) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border shrink-0">
          {title !== undefined && (
            <span className="text-[10px] mono tracking-widest uppercase text-text-tertiary select-none">
              {title}
            </span>
          )}
          {titleRight && <div className="flex items-center">{titleRight}</div>}
        </div>
      )}

      <div className={cn("overflow-hidden rounded-b-xl", !noPadding && !(title !== undefined) && "rounded-xl")}>
        {children}
      </div>
    </div>
  );
}
