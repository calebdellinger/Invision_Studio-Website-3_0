"use client";

import { useEffect, useRef } from "react";

const G = { r: 80, g: 161, b: 42 } as const;

interface Star {
  x: number;
  y: number;
  size: number;
  op: number;
  phase: number;
}

interface SpaceNode {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
  phase: number;
}

interface Pulse {
  a: number;
  b: number;
  t: number;
  spd: number;
}

export function AiSpaceBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rawCtx = el.getContext("2d");
    if (!rawCtx) return;
    // Re-bind with explicit non-null types so closure functions see them correctly
    const canvas: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const mobile = window.innerWidth < 768;
    const SC = mobile ? 200 : 380;
    const NC = mobile ? 18 : 34;
    const MP = mobile ? 4 : 9;

    let W = 0,
      H = 0,
      raf = 0,
      frame = 0;
    let stars: Star[] = [];
    let nodes: SpaceNode[] = [];
    const pulses: Pulse[] = [];

    function setup() {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    function mkStars() {
      stars = Array.from({ length: SC }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.4 + 0.15,
        op: Math.random() * 0.45 + 0.04,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function mkNodes() {
      nodes = Array.from({ length: NC }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.16,
        vz: (Math.random() - 0.5) * 0.0013,
        r: Math.random() * 2.6 + 1.1,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    setup();
    mkStars();
    mkNodes();

    const onResize = () => {
      setup();
      mkStars();
    };
    window.addEventListener("resize", onResize);

    function tick() {
      frame++;
      ctx.clearRect(0, 0, W, H);

      // Ambient center glow
      const cg = ctx.createRadialGradient(
        W * 0.5,
        H * 0.38,
        0,
        W * 0.5,
        H * 0.38,
        Math.max(W, H) * 0.62
      );
      cg.addColorStop(0, `rgba(${G.r},${G.g},${G.b},0.048)`);
      cg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (const s of stars) {
        s.phase += 0.005;
        const tw = Math.sin(s.phase) * 0.28 + 0.72;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${G.r},${G.g},${G.b},${s.op * tw * 0.6})`;
        ctx.fill();
      }

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.z += n.vz;
        n.phase += 0.017;
        if (n.x < 0 || n.x > W) {
          n.vx *= -1;
          n.x = Math.max(0, Math.min(W, n.x));
        }
        if (n.y < 0 || n.y > H) {
          n.vy *= -1;
          n.y = Math.max(0, Math.min(H, n.y));
        }
        if (n.z < 0 || n.z > 1) {
          n.vz *= -1;
          n.z = Math.max(0, Math.min(1, n.z));
        }
      }

      // Connections
      const cd = Math.min(W, H) * 0.29;
      const conns: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const dz = Math.abs(a.z - b.z);
          if (d < cd && dz < 0.42) {
            const al = (1 - d / cd) * (1 - dz / 0.42) * 0.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${G.r},${G.g},${G.b},${al})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
            conns.push([i, j]);
          }
        }
      }

      // Spawn pulses
      if (pulses.length < MP && conns.length > 0 && frame % 48 === 0) {
        const [a, b] = conns[Math.floor(Math.random() * conns.length)];
        pulses.push({ a, b, t: 0, spd: 0.006 + Math.random() * 0.012 });
      }

      // Draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.spd;
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const na = nodes[p.a],
          nb = nodes[p.b];
        const px = na.x + (nb.x - na.x) * p.t;
        const py = na.y + (nb.y - na.y) * p.t;
        const pg = ctx.createRadialGradient(px, py, 0, px, py, 7);
        pg.addColorStop(0, `rgba(${G.r},${G.g},${G.b},0.88)`);
        pg.addColorStop(0.5, `rgba(${G.r},${G.g},${G.b},0.26)`);
        pg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, 1.7, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(210,255,175,0.9)";
        ctx.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const sc = 0.42 + n.z * 0.88;
        const r = n.r * sc;
        const pulse = Math.sin(n.phase) * 0.22 + 0.78;
        const al = (0.25 + n.z * 0.54) * pulse;

        const hg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5.5);
        hg.addColorStop(0, `rgba(${G.r},${G.g},${G.b},${al * 0.55})`);
        hg.addColorStop(0.38, `rgba(${G.r},${G.g},${G.b},${al * 0.12})`);
        hg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 5.5, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${G.r},${G.g},${G.b},${al})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,255,175,${al * 0.88})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />
  );
}
