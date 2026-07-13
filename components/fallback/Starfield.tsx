"use client";
import { useEffect, useRef } from "react";

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let stars: { x:number; y:number; r:number; a:number; tw:number; ph:number }[] = [];
    let raf = 0, W = 0, H = 0;

    const resize = () => {
      W = cv.width = innerWidth * dpr;  H = cv.height = innerHeight * dpr;
      cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
      const n = Math.round((innerWidth * innerHeight) / 5200);
      stars = Array.from({ length: n }, () => ({
        x: Math.random()*W, y: Math.random()*H, r: (Math.random()*1.1+0.3)*dpr,
        a: Math.random()*0.6+0.2, tw: Math.random()*0.02+0.004, ph: Math.random()*6.28,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0,0,W,H);
      for (const s of stars) {
        const a = reduce ? s.a : s.a + Math.sin(t*s.tw + s.ph)*0.35;
        ctx.globalAlpha = Math.max(0.05, Math.min(1, a));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fillStyle = "#fff"; ctx.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize(); draw(0);
    addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />;
}
