"use client";

import { useEffect, useRef } from "react";

export function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let tick = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const cellSize = 48;
      const cols = Math.ceil(w / cellSize) + 1;
      const rows = Math.ceil(h / cellSize) + 1;

      ctx.strokeStyle = "rgba(30, 30, 38, 0.8)";
      ctx.lineWidth = 0.5;

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellSize, 0);
        ctx.lineTo(c * cellSize, h);
        ctx.stroke();
      }

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellSize);
        ctx.lineTo(w, r * cellSize);
        ctx.stroke();
      }

      const dotCount = 8;
      for (let i = 0; i < dotCount; i++) {
        const x = ((i * 137.5 + tick * 0.4) % w);
        const y = ((i * 89.3 + tick * 0.2) % h);
        const alpha = 0.08 + 0.06 * Math.sin(tick * 0.02 + i);
        const radius = 1 + Math.sin(tick * 0.015 + i * 0.8);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.fill();
      }

      const gradX = (w / 2) + Math.sin(tick * 0.005) * (w * 0.2);
      const gradY = h * 0.35;
      const gradient = ctx.createRadialGradient(gradX, gradY, 0, gradX, gradY, w * 0.5);
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.025)");
      gradient.addColorStop(0.4, "rgba(6, 182, 212, 0.01)");
      gradient.addColorStop(1, "rgba(9, 9, 11, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      tick++;
      animFrame = requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
