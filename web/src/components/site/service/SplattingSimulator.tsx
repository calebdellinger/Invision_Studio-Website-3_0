"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type RenderMode = "points" | "splats" | "refined";
type ActiveScene = "residential" | "industrial" | "mapping";

interface Point3D {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

// Generate points mapping a residential room layout (walls, table, chair, decorations)
const generateResidentialPoints = (): Point3D[] => {
  const pts: Point3D[] = [];
  const addBox = (xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number, density: number, color: string, baseSize = 4) => {
    for (let i = 0; i < density; i++) {
      const u = Math.random();
      const v = Math.random();
      const w = Math.random();
      pts.push({
        x: xMin + u * (xMax - xMin),
        y: yMin + v * (yMax - yMin),
        z: zMin + w * (zMax - zMin),
        color,
        size: baseSize + Math.random() * 2,
      });
    }
  };

  // Floor (dark green/gray)
  addBox(-100, 100, 80, 83, -100, 100, 120, "var(--brand-creative)", 2);
  // Walls
  addBox(-100, -97, -80, 80, -100, 100, 150, "#1f2d1f", 3); // Left wall
  addBox(97, 100, -80, 80, -100, 100, 150, "#1f2d1f", 3); // Right wall
  addBox(-100, 100, -80, 80, -100, -97, 150, "#122012", 3); // Back wall

  // Table in center
  addBox(-35, 35, 20, 24, -35, 35, 90, "#10b981", 4); // Table top
  addBox(-33, -29, 24, 80, -33, -29, 20, "#047857", 3); // Leg 1
  addBox(29, 33, 24, 80, -33, -29, 20, "#047857", 3); // Leg 2
  addBox(-33, -29, 24, 80, 29, 33, 20, "#047857", 3); // Leg 3
  addBox(29, 33, 24, 80, 29, 33, 20, "#047857", 3); // Leg 4

  // Couch / Chair
  addBox(-75, -45, 10, 50, -20, 40, 100, "#065f46", 4); // Couch base
  addBox(-75, -70, -30, 10, -20, 40, 50, "#064e3b", 4); // Couch back

  // Floating ambient details / plants / artwork frame
  addBox(-96, -95, -40, 10, -30, 0, 40, "#10b981", 3); // Art frame
  addBox(30, 45, -20, 20, 30, 45, 60, "#34d399", 5); // Plant/indoor pot

  return pts;
};

// Generate points mapping an industrial site layout (pipes, scaffolding, generator tanks)
const generateIndustrialPoints = (): Point3D[] => {
  const pts: Point3D[] = [];
  const addCylinder = (x: number, z: number, radius: number, yMin: number, yMax: number, density: number, color: string) => {
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.95 + Math.random() * 0.05);
      pts.push({
        x: x + Math.cos(angle) * r,
        y: yMin + Math.random() * (yMax - yMin),
        z: z + Math.sin(angle) * r,
        color,
        size: 3 + Math.random() * 2,
      });
    }
  };

  const addBox = (xMin: number, xMax: number, yMin: number, yMax: number, zMin: number, zMax: number, density: number, color: string, baseSize = 3) => {
    for (let i = 0; i < density; i++) {
      pts.push({
        x: xMin + Math.random() * (xMax - xMin),
        y: yMin + Math.random() * (yMax - yMin),
        z: zMin + Math.random() * (zMax - zMin),
        color,
        size: baseSize + Math.random() * 2,
      });
    }
  };

  // Floor grid
  addBox(-110, 110, 80, 82, -110, 110, 140, "#1f2937", 2);

  // Large industrial storage tank (center left)
  addCylinder(-40, -10, 35, -70, 80, 250, "#10b981");

  // Overhead high-pressure pipe running across
  for (let xPos = -110; xPos <= 110; xPos += 8) {
    addCylinder(xPos, 35, 12, -45, -35, 12, "#34d399");
  }

  // Vertical support pillar structure
  addCylinder(50, 45, 6, -80, 80, 80, "#0f766e");
  addCylinder(50, -45, 6, -80, 80, 80, "#0f766e");

  // Scaffolding cage
  addBox(30, 70, -20, 20, -60, 60, 120, "#115e59");

  return pts;
};

// Generate points mapping an outdoor landscape grid (hills, contours, survey targets)
const generateMappingPoints = (): Point3D[] => {
  const pts: Point3D[] = [];
  // Generate terrain heights using concentric waves
  const cols = 22;
  const rows = 22;
  const spacing = 11;
  const startX = -((cols - 1) * spacing) / 2;
  const startZ = -((rows - 1) * spacing) / 2;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const gridX = startX + c * spacing;
      const gridZ = startZ + r * spacing;
      // Terrain wave equation + noise
      const distFromCenter = Math.sqrt(gridX * gridX + gridZ * gridZ);
      const wave = Math.cos(distFromCenter * 0.04) * 35;
      const noise = (Math.random() - 0.5) * 6;
      const gridY = wave + noise + 20;

      // Add main grid point
      pts.push({
        x: gridX,
        y: gridY,
        z: gridZ,
        color: "var(--brand-creative)",
        size: 3.5,
      });

      // Add a small dense cluster of points around each contour vertex (simulate splat density)
      for (let k = 0; k < 4; k++) {
        const offsetRad = 2.5 + Math.random() * 3.5;
        const theta = Math.random() * Math.PI * 2;
        pts.push({
          x: gridX + Math.cos(theta) * offsetRad,
          y: gridY + (Math.random() - 0.5) * 3,
          z: gridZ + Math.sin(theta) * offsetRad,
          color: "#059669",
          size: 2.5 + Math.random() * 2,
        });
      }
    }
  }

  // Survey tripod marker in the middle
  pts.push({ x: 0, y: -40, z: 0, color: "#ffffff", size: 6 });
  for (let i = 0; i < 20; i++) {
    pts.push({ x: 0, y: -40 + i * 3, z: 0, color: "#34d399", size: 3 });
  }

  return pts;
};

export function SplattingSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>("splats");
  const [activeScene, setActiveScene] = useState<ActiveScene>("residential");
  const [densityPercent, setDensityPercent] = useState<number>(75);
  const [rotX, setRotX] = useState<number>(-0.25);
  const [rotY, setRotY] = useState<number>(0.65);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [scanPulse, setScanPulse] = useState<number>(0.2); // vertical scanning line position [0, 1]
  const [showWireframe, setShowWireframe] = useState<boolean>(true);
  const mouseRef = useRef<{ x: number; y: number; dragging: boolean }>({ x: 0, y: 0, dragging: false });

  // Load points based on active scene selection
  const [points, setPoints] = useState<Point3D[]>([]);

  useEffect(() => {
    if (activeScene === "residential") {
      setPoints(generateResidentialPoints());
    } else if (activeScene === "industrial") {
      setPoints(generateIndustrialPoints());
    } else {
      setPoints(generateMappingPoints());
    }
  }, [activeScene]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let localRotY = rotY;
    let localScanPulse = scanPulse;
    let scanDirection = 1;

    const render = () => {
      // Resize to match container fluid size
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width * 2 || canvas.height !== rect.height * 2) {
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(2, 2);

      const width = canvas.width / 2;
      const height = canvas.height / 2;
      const centerX = width / 2;
      const centerY = height / 2;

      // Increment rotation Y angle if auto-rotation is on
      if (isRotating) {
        localRotY += 0.0035;
        setRotY(localRotY);
      }

      // Animate scan pulse line
      localScanPulse += 0.003 * scanDirection;
      if (localScanPulse > 0.9) {
        scanDirection = -1;
      } else if (localScanPulse < 0.1) {
        scanDirection = 1;
      }
      setScanPulse(localScanPulse);

      const sinX = Math.sin(rotX);
      const cosX = Math.cos(rotX);
      const sinY = Math.sin(localRotY);
      const cosY = Math.cos(localRotY);

      // Project points from 3D to 2D
      const projected = points
        .map((p) => {
          // Centered translation
          const x = p.x;
          const y = p.y;
          const z = p.z;

          // Rotate Y axis
          let x1 = x * cosY - z * sinY;
          let z1 = x * sinY + z * cosY;

          // Rotate X axis
          let y2 = y * cosX - z1 * sinX;
          let z2 = y * sinX + z1 * cosX;

          // Projection metrics
          const dist = 320;
          const scale = 270 / (dist + z2);
          const px = centerX + x1 * scale;
          const py = centerY + y2 * scale;

          return {
            x2d: px,
            y2d: py,
            depth: z2,
            original: p,
            scale,
          };
        })
        // Sort back to front (painter's algorithm)
        .sort((a, b) => b.depth - a.depth);

      // Limit density based on slider
      const visibleCount = Math.floor(projected.length * (densityPercent / 100));
      const activeProjected = projected.slice(0, visibleCount);

      // Draw wireframe grid base under the model
      if (showWireframe) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const gridSpacing = 20;
        const gridRange = 100;
        for (let xVal = -gridRange; xVal <= gridRange; xVal += gridSpacing) {
          // Line along Z
          const p1 = project3D(xVal, 80, -gridRange, cosX, sinX, cosY, sinY, centerX, centerY);
          const p2 = project3D(xVal, 80, gridRange, cosX, sinX, cosY, sinY, centerX, centerY);
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Line along X
          const p3 = project3D(-gridRange, 80, xVal, cosX, sinX, cosY, sinY, centerX, centerY);
          const p4 = project3D(gridRange, 80, xVal, cosX, sinX, cosY, sinY, centerX, centerY);
          ctx.moveTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
        }
        ctx.stroke();

        // Subtly draw box outline of room
        ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        const corners = [
          [-100, -80, -100], [100, -80, -100], [100, 80, -100], [-100, 80, -100],
          [-100, -80, 100], [100, -80, 100], [100, 80, 100], [-100, 80, 100]
        ];
        const projCorners = corners.map(([cx, cy, cz]) =>
          project3D(cx, cy, cz, cosX, sinX, cosY, sinY, centerX, centerY)
        );
        // Connect lower ring
        ctx.moveTo(projCorners[0].x, projCorners[0].y);
        for (let i = 1; i < 4; i++) ctx.lineTo(projCorners[i].x, projCorners[i].y);
        ctx.closePath();
        // Connect upper ring
        ctx.moveTo(projCorners[4].x, projCorners[4].y);
        for (let i = 5; i < 8; i++) ctx.lineTo(projCorners[i].x, projCorners[i].y);
        ctx.closePath();
        // Connect vertical edges
        for (let i = 0; i < 4; i++) {
          ctx.moveTo(projCorners[i].x, projCorners[i].y);
          ctx.lineTo(projCorners[i + 4].x, projCorners[i + 4].y);
        }
        ctx.stroke();
      }

      // Draw scanned points / splats
      activeProjected.forEach(({ x2d, y2d, depth, original, scale }) => {
        // Skip if outside canvas viewport bounds
        if (x2d < -20 || x2d > width + 20 || y2d < -20 || y2d > height + 20) return;

        // Interactive depth fog
        const opacity = Math.max(0.08, Math.min(0.9, 1 - (depth + 100) / 250));

        // Render point cloud
        if (renderMode === "points") {
          ctx.fillStyle = original.color;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x2d, y2d, original.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        // Render ellipsoidal splats
        if (renderMode === "splats") {
          ctx.globalAlpha = opacity * 0.45;
          ctx.fillStyle = original.color;

          ctx.save();
          ctx.translate(x2d, y2d);
          // Angle of splat ellipse (rotated based on unique position hash)
          const angle = (original.x * 0.05 + original.y * 0.02) % (Math.PI * 2);
          ctx.rotate(angle);

          ctx.beginPath();
          const rx = original.size * 1.5 * scale;
          const ry = original.size * 0.65 * scale;
          ctx.ellipse(0, 0, Math.max(1.5, rx), Math.max(0.6, ry), 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Render refined photorealistic splatting
        if (renderMode === "refined") {
          // Draw dense splats overlayed with bright details
          ctx.globalAlpha = opacity * 0.65;
          ctx.fillStyle = original.color;

          ctx.save();
          ctx.translate(x2d, y2d);
          const angle = (original.x * 0.05 + original.y * 0.02) % (Math.PI * 2);
          ctx.rotate(angle);

          ctx.beginPath();
          const rx = original.size * 1.25 * scale;
          const ry = original.size * 0.75 * scale;
          ctx.ellipse(0, 0, Math.max(1, rx), Math.max(0.6, ry), 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Overlay mock camera lens focus / scanner lines
      ctx.globalAlpha = 1;
      const scanY = height * localScanPulse;

      // Sweeping Laser Scanning Plane
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#10b981";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(15, scanY);
      ctx.lineTo(width - 15, scanY);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Sweeping light bloom glow
      const scanGlow = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGlow.addColorStop(0, "rgba(16, 185, 129, 0)");
      scanGlow.addColorStop(0.5, "rgba(16, 185, 129, 0.06)");
      scanGlow.addColorStop(1, "rgba(16, 185, 129, 0)");
      ctx.fillStyle = scanGlow;
      ctx.fillRect(15, scanY - 30, width - 30, 60);

      // Render outer lens boundary details
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Camera reticle / crop marks
      const retLength = 12;
      ctx.beginPath();
      // Top Left
      ctx.moveTo(10, 10 + retLength); ctx.lineTo(10, 10); ctx.lineTo(10 + retLength, 10);
      // Top Right
      ctx.moveTo(width - 10 - retLength, 10); ctx.lineTo(width - 10, 10); ctx.lineTo(width - 10, 10 + retLength);
      // Bottom Left
      ctx.moveTo(10, height - 10 - retLength); ctx.lineTo(10, height - 10); ctx.lineTo(10 + retLength, height - 10);
      // Bottom Right
      ctx.moveTo(width - 10 - retLength, height - 10); ctx.lineTo(width - 10, height - 10); ctx.lineTo(width - 10, height - 10 - retLength);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [points, renderMode, densityPercent, rotX, rotY, isRotating, showWireframe]);

  // Project coordinates helper
  const project3D = (
    x: number, y: number, z: number,
    cosX: number, sinX: number, cosY: number, sinY: number,
    centerX: number, centerY: number
  ) => {
    let x1 = x * cosY - z * sinY;
    let z1 = x * sinY + z * cosY;
    let y2 = y * cosX - z1 * sinX;
    let z2 = y * sinX + z1 * cosX;
    const dist = 320;
    const scale = 270 / (dist + z2);
    return {
      x: centerX + x1 * scale,
      y: centerY + y2 * scale
    };
  };

  // Mouse drag handles rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      dragging: true,
    };
    setIsRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!mouseRef.current.dragging) return;
    const deltaX = e.clientX - mouseRef.current.x;
    const deltaY = e.clientY - mouseRef.current.y;

    setRotY((prev) => prev + deltaX * 0.0075);
    setRotX((prev) => Math.max(-Math.PI / 3, Math.min(Math.PI / 3, prev + deltaY * 0.0075)));

    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  };

  const handleMouseUp = () => {
    mouseRef.current.dragging = false;
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-[#0c0c0e] p-6 shadow-[0_32px_80px_-32px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-black/[0.03]">
      
      {/* ── Viewport Control Headers ── */}
      <div className="flex flex-col gap-4 border-b border-black/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "residential", label: "Villa Interior" },
            { id: "industrial", label: "Refinery Zone" },
            { id: "mapping", label: "Terrain Grid" },
          ].map((scene) => (
            <button
              key={scene.id}
              onClick={() => setActiveScene(scene.id as ActiveScene)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeScene === scene.id
                  ? "border-[color-mix(in_srgb,var(--brand-creative)_40%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_10%,transparent)] text-[color-mix(in_srgb,var(--brand-creative)_90%,white_10%)]"
                  : "border-black/[0.05] bg-white/[0.01] text-zinc-600 hover:border-black/[0.12] hover:text-zinc-600"
              }`}
            >
              {scene.label}
            </button>
          ))}
        </div>

        {/* Display rendering mode selectors */}
        <div className="flex rounded-lg border border-black/[0.08] bg-[#080809] p-1">
          {[
            { id: "points", label: "Points" },
            { id: "splats", label: "Gaussian Splats" },
            { id: "refined", label: "Refined Twin" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setRenderMode(mode.id as RenderMode)}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all duration-250 ${
                renderMode === mode.id
                  ? "bg-[var(--brand-creative)] text-[#0a0a0a]"
                  : "text-zinc-600 hover:text-zinc-600"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Interactive Canvas Arena ── */}
      <div className="relative mt-6 aspect-[16/10] w-full min-h-[300px] cursor-grab active:cursor-grabbing rounded-xl bg-white/60 overflow-hidden border border-black/[0.05]">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="absolute inset-0 h-full w-full"
        />

        {/* Floating HUD status stats (Top Right) */}
        <div className="pointer-events-none absolute right-4 top-4 flex flex-col gap-1.5 font-mono text-[9px] text-zinc-600">
          <div className="flex items-center justify-between gap-4 rounded border border-black/[0.04] bg-white/80 px-2 py-1 backdrop-blur-sm">
            <span>Scan Engine:</span>
            <span className="text-[var(--brand-creative)] font-semibold uppercase tracking-wider">WebGPU v2</span>
          </div>
          <div className="flex items-center justify-between gap-4 rounded border border-black/[0.04] bg-white/80 px-2 py-1 backdrop-blur-sm">
            <span>Render Mode:</span>
            <span className="text-zinc-900 uppercase font-semibold">
              {renderMode === "points" ? "Point Cloud" : renderMode === "splats" ? "Volumetric Gaussian" : "Splatting Mesh"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 rounded border border-black/[0.04] bg-white/80 px-2 py-1 backdrop-blur-sm">
            <span>Viewport FPS:</span>
            <span className="text-[var(--brand-creative)]">60.00 FPS</span>
          </div>
        </div>

        {/* Scanning instruction pill (Bottom center) */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-black/[0.08] bg-white/75 px-3 py-1.5 text-[10px] text-zinc-600 backdrop-blur-sm">
          Drag on screen to rotate structure · Adjust density below
        </div>
      </div>

      {/* ── Parameters Control Panel ── */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Splat Count / Density
              </label>
              <span className="font-mono text-xs text-[var(--brand-creative)]">
                {Math.floor(points.length * (densityPercent / 100)) * 8} splats
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={densityPercent}
              onChange={(e) => setDensityPercent(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-[var(--brand-creative)]"
            />
            <p className="mt-1.5 text-[11px] text-zinc-600 leading-normal">
              Adjusts the resolution density of the 3D ellipsoid point-grid mapping.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-end gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => setShowWireframe(!showWireframe)}
            className={`rounded-lg border px-4 py-2.5 text-xs font-semibold transition-all ${
              showWireframe
                ? "border-[color-mix(in_srgb,var(--brand-creative)_30%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_6%,transparent)] text-zinc-600"
                : "border-black/10 bg-white/[0.02] text-zinc-600 hover:border-black/20"
            }`}
          >
            {showWireframe ? "Hide Scan Cage" : "Show Scan Cage"}
          </button>
          
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`rounded-lg border px-4 py-2.5 text-xs font-semibold transition-all ${
              isRotating
                ? "border-[color-mix(in_srgb,var(--brand-creative)_40%,transparent)] bg-[color-mix(in_srgb,var(--brand-creative)_10%,transparent)] text-[var(--brand-creative)]"
                : "border-black/10 bg-white/[0.02] text-zinc-600 hover:border-black/20"
            }`}
          >
            {isRotating ? "Auto-Rotate On" : "Auto-Rotate Paused"}
          </button>
        </div>
      </div>
    </div>
  );
}
