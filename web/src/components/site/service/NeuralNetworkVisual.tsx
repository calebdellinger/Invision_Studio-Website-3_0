"use client";

import { useEffect, useRef, useState } from "react";
import { TradeSchematicOverlay } from "./TradeSchematicOverlay";

type SimStage = "idle" | "scanning" | "analyzing" | "optimizing" | "plan";
type TradeId = "excavation" | "electrician" | "plumber" | "carpenter";
type OverlayType = "blueprint" | "material";

const TRADE_COLORS: Record<TradeId, [number, number, number]> = {
  excavation: [251, 191, 36],   // amber-400
  electrician: [96, 165, 250],  // blue-400
  plumber: [56, 189, 248],      // sky-400
  carpenter: [167, 139, 250],   // purple-400
};

function getTargetPositions(trade: TradeId, numNodes: number) {
  const targets: {x: number, y: number, z: number}[] = [];
  
  if (trade === "excavation") {
    const side = Math.ceil(Math.sqrt(numNodes)); 
    for(let i=0; i<numNodes; i++) {
       const row = Math.floor(i / side);
       const col = i % side;
       const x = (col - side/2 + 0.5) * 0.6;
       const z = (row - side/2 + 0.5) * 0.6;
       const y = (Math.sin(x * 2.5) * Math.cos(z * 2.5)) * 0.4; 
       targets.push({x, y, z});
    }
  } else if (trade === "electrician") {
    for(let i=0; i<numNodes; i++) {
       if (i < numNodes * 0.35) {
         targets.push({ 
           x: (Math.random() - 0.5) * 0.2, 
           y: (Math.random() - 0.5) * 0.2, 
           z: (i / (numNodes * 0.35) - 0.5) * 4.5 
         });
       } else {
         const z = (Math.random() - 0.5) * 4.0;
         const x = (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 1.2);
         const y = (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 1.2);
         targets.push({
           x: Math.round(x * 1.5) / 1.5, 
           y: Math.round(y * 1.5) / 1.5, 
           z: Math.round(z * 1.5) / 1.5
         });
       }
    }
  } else if (trade === "plumber") {
    for(let i=0; i<numNodes; i++) {
       const isX = i % 2 === 0;
       const length = (Math.random() - 0.5) * 4.5;
       const angle = Math.random() * Math.PI * 2;
       const radius = 0.5;
       
       if (isX) {
         targets.push({ x: length, y: Math.sin(angle) * radius, z: Math.cos(angle) * radius });
       } else {
         targets.push({ x: Math.cos(angle) * radius, y: length, z: Math.sin(angle) * radius });
       }
    }
  } else {
    const side = Math.ceil(Math.cbrt(numNodes)); 
    for(let i=0; i<numNodes; i++) {
       const x = (i % side);
       const y = Math.floor((i / side) % side);
       const z = Math.floor(i / (side * side));
       targets.push({
         x: (x - side/2 + 0.5) * 0.8,
         y: (y - side/2 + 0.5) * 0.8,
         z: (z - side/2 + 0.5) * 0.8
       });
    }
  }
  
  while(targets.length < numNodes) targets.push({x:0, y:0, z:0});
  return targets.slice(0, numNodes);
}

export function NeuralNetworkVisual({ stage, trade }: { stage: SimStage; trade: TradeId }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef(stage);
  const tradeRef = useRef(trade);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayType, setOverlayType] = useState<OverlayType>("blueprint");
  
  const overlayStateRef = useRef({
    isVisible: false,
    type: "blueprint" as OverlayType
  });

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    tradeRef.current = trade;
  }, [trade]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    let rafId: number;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const NUM_NODES = 64; 
    const nodes: { 
      x: number, y: number, z: number, 
      tx: number, ty: number, tz: number, 
      radius: number, phase: number, freq: number 
    }[] = [];
    
    let conns: [number, number][] = [];
    let activeTrade = tradeRef.current;

    function generateLayout(targetTrade: TradeId) {
       const targets = getTargetPositions(targetTrade, NUM_NODES);
       for(let i=0; i<NUM_NODES; i++) {
         if (nodes[i]) {
            nodes[i].tx = targets[i].x;
            nodes[i].ty = targets[i].y;
            nodes[i].tz = targets[i].z;
         } else {
            nodes[i] = {
              x: targets[i].x, y: targets[i].y, z: targets[i].z,
              tx: targets[i].x, ty: targets[i].y, tz: targets[i].z,
              radius: Math.random() * 1.5 + 1.2,
              phase: Math.random() * Math.PI * 2,
              freq: 1.5 + Math.random() * 2.0, 
            }
         }
       }
       
       conns = [];
       for(let i=0; i<NUM_NODES; i++){
         for(let j=i+1; j<NUM_NODES; j++){
           const dx = nodes[i].tx - nodes[j].tx;
           const dy = nodes[i].ty - nodes[j].ty;
           const dz = nodes[i].tz - nodes[j].tz;
           const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
           
           let threshold = 1.0;
           if (targetTrade === "excavation") threshold = 0.85;
           if (targetTrade === "electrician") threshold = 1.6;
           if (targetTrade === "plumber") threshold = 1.2;
           if (targetTrade === "carpenter") threshold = 0.9;

           if (dist < threshold) {
             conns.push([i, j]);
           } else if (Math.random() > 0.985) { 
             conns.push([i, j]); 
           }
         }
       }
    }
    
    generateLayout(activeTrade);

    const pulses: { a: number, b: number, t: number, spd: number }[] = [];

    let rotationY = 0;
    let rotationX = 0;
    let currentSpeedMultiplier = 1;

    let currentR = TRADE_COLORS[activeTrade][0];
    let currentG = TRADE_COLORS[activeTrade][1];
    let currentB = TRADE_COLORS[activeTrade][2];

    // Camera state machine for rapid macro zoom
    const camState = {
      phase: "macro" as "macro" | "zooming_in" | "hold" | "zooming_out",
      timer: Math.random() * 500 + 300,
      focalNodeIndex: 0,
      focalPx: 0,
      focalPy: 0,
      dist: 3.5,
      xOff: 0,
      yOff: 0,
    };

    function render() {
      if (tradeRef.current !== activeTrade) {
         activeTrade = tradeRef.current;
         generateLayout(activeTrade);
      }

      for(const n of nodes) {
         n.x += (n.tx - n.x) * 0.05;
         n.y += (n.ty - n.y) * 0.05;
         n.z += (n.tz - n.z) * 0.05;
      }

      const currentStage = stageRef.current;
      let targetSpeedMultiplier = 1;
      
      if (currentStage === 'idle' || currentStage === 'plan') {
        targetSpeedMultiplier = 1;
      } else if (currentStage === 'scanning') {
        targetSpeedMultiplier = 3.5;
      } else if (currentStage === 'analyzing') {
        targetSpeedMultiplier = 6.0;
      } else if (currentStage === 'optimizing') {
        targetSpeedMultiplier = 9.0;
      }

      currentSpeedMultiplier += (targetSpeedMultiplier - currentSpeedMultiplier) * 0.05;

      const targetColor = TRADE_COLORS[activeTrade];
      currentR += (targetColor[0] - currentR) * 0.04;
      currentG += (targetColor[1] - currentG) * 0.04;
      currentB += (targetColor[2] - currentB) * 0.04;
      const rgb = `${Math.round(currentR)}, ${Math.round(currentG)}, ${Math.round(currentB)}`;

      // Update camera logic
      const isProcessing = currentSpeedMultiplier > 1.5;
      if (isProcessing) {
        if (camState.phase === "macro") {
          camState.timer -= 16;
          if (camState.timer <= 0) {
            camState.phase = "zooming_in";
            camState.focalNodeIndex = Math.floor(Math.random() * nodes.length);
          }
        } else if (camState.phase === "zooming_in") {
          camState.dist += (0.6 - camState.dist) * 0.25; 
          camState.xOff += (-camState.focalPx) * 0.2;
          camState.yOff += (-camState.focalPy) * 0.2;
          
          if (Math.abs(camState.dist - 0.6) < 0.05) {
            camState.phase = "hold";
            // 800ms hold ensures the image fades in smoothly and stays for a half second
            camState.timer = 800; 
            if (!overlayStateRef.current.isVisible) {
              overlayStateRef.current.isVisible = true;
              setShowOverlay(true);
            }
          }
        } else if (camState.phase === "hold") {
          camState.timer -= 16;
          if (camState.timer <= 0) {
            camState.phase = "zooming_out";
            if (overlayStateRef.current.isVisible) {
              overlayStateRef.current.isVisible = false;
              setShowOverlay(false);
              
              // Toggle type for next time
              overlayStateRef.current.type = overlayStateRef.current.type === "blueprint" ? "material" : "blueprint";
              setOverlayType(overlayStateRef.current.type);
            }
          }
        } else if (camState.phase === "zooming_out") {
          camState.dist += (3.5 - camState.dist) * 0.25;
          camState.xOff += (0 - camState.xOff) * 0.2;
          camState.yOff += (0 - camState.yOff) * 0.2;
          
          if (Math.abs(camState.dist - 3.5) < 0.05) {
            camState.phase = "macro";
            camState.timer = Math.random() * 800 + 400; // brief pause before next snap
          }
        }
      } else {
        camState.phase = "macro";
        camState.dist += (3.5 - camState.dist) * 0.1;
        camState.xOff += (0 - camState.xOff) * 0.1;
        camState.yOff += (0 - camState.yOff) * 0.1;
        if (overlayStateRef.current.isVisible) {
           overlayStateRef.current.isVisible = false;
           setShowOverlay(false);
        }
      }

      ctx.clearRect(0, 0, W, H);
      
      const cx = W / 2;
      const cy = H / 2;
      
      const bgGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.8);
      bgGlow.addColorStop(0, `rgba(${rgb}, ${0.04 * currentSpeedMultiplier})`);
      bgGlow.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, W, H);

      rotationY += 0.0025 * currentSpeedMultiplier;
      rotationX += 0.001 * currentSpeedMultiplier;
      
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      const fov = 2.5; 

      const projectedNodes = nodes.map((n, idx) => {
        let rx = n.x * cosY - n.z * sinY;
        let rz = n.x * sinY + n.z * cosY;
        let ry = n.y;

        let finalY = ry * cosX - rz * sinX;
        let finalZ = ry * sinX + rz * cosX;

        n.phase += 0.015 * currentSpeedMultiplier;
        const wobbleX = Math.sin(n.phase) * 0.04;
        const wobbleY = Math.cos(n.phase) * 0.04;
        const wobbleZ = Math.sin(n.phase * 0.8) * 0.04;

        finalZ += wobbleZ;

        const zPos = finalZ + camState.dist;
        const safeZ = Math.max(0.1, zPos); 
        const scale = fov / safeZ;

        const px = cx + (rx + wobbleX) * cx * scale * 0.45 + camState.xOff;
        const py = cy + (finalY + wobbleY) * cy * scale * 0.45 + camState.yOff;

        if (idx === camState.focalNodeIndex) {
          camState.focalPx = (rx + wobbleX) * cx * scale * 0.45;
          camState.focalPy = (finalY + wobbleY) * cy * scale * 0.45;
        }

        const reverbWave = Math.pow(Math.sin(n.phase * n.freq), 4);
        const reverbAmp = Math.max(0, currentSpeedMultiplier - 1.0) * 0.35; 
        const reverbScale = 1 + reverbWave * reverbAmp;

        return { px, py, scale, z: finalZ, ref: n, id: idx, reverbScale, reverbWave };
      });

      projectedNodes.sort((a, b) => a.z - b.z);

      const projMap = new Map();
      for (const p of projectedNodes) projMap.set(p.id, p);

      const sortedConns = conns.map(([i, j]) => {
        const a = projMap.get(i);
        const b = projMap.get(j);
        return { a, b, avgZ: a && b ? (a.z + b.z) / 2 : -99 };
      }).sort((c1, c2) => c1.avgZ - c2.avgZ);

      for (const { a, b } of sortedConns) {
        if(!a || !b) continue;

        const zFactor = (a.avgZ || (a.z + b.z) / 2);
        let rawOpacity = 0.15 + (zFactor * 0.1); 
        rawOpacity = Math.max(0.01, Math.min(rawOpacity, 0.4));
        
        const edgeReverb = 1 + ((a.reverbScale + b.reverbScale) / 2 - 1) * 0.5;
        const macroFade = Math.min(1, (camState.dist - 0.6) / 2.0);

        const opacity = rawOpacity * (0.8 + currentSpeedMultiplier * 0.2) * edgeReverb * macroFade;
        ctx.lineWidth = Math.max(0.2, (a.scale + b.scale) * 0.4) * edgeReverb; 
        ctx.strokeStyle = `rgba(${rgb}, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();
      }

      if (currentSpeedMultiplier > 1.5 && Math.random() < 0.2 * currentSpeedMultiplier) {
         const [a, b] = conns[Math.floor(Math.random() * conns.length)];
         pulses.push({ a, b, t: 0, spd: (0.01 + Math.random() * 0.02) * currentSpeedMultiplier });
      }

      for(let i = pulses.length - 1; i >= 0; i--){
        const p = pulses[i];
        p.t += p.spd;
        if(p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const a = projMap.get(p.a);
        const b = projMap.get(p.b);
        if (!a || !b) continue;
        
        const px = a.px + (b.px - a.px) * p.t;
        const py = a.py + (b.py - a.py) * p.t;
        
        const currentZ = a.z + (b.z - a.z) * p.t;
        const scale = a.scale + (b.scale - a.scale) * p.t;
        
        const pulseOpacity = Math.max(0.1, 0.5 + currentZ * 0.25);
        
        ctx.beginPath();
        ctx.arc(px, py, 3 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${pulseOpacity * (0.7 + 0.3 * Math.sin(p.t * Math.PI))})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(px, py, 1.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
        ctx.fill();
      }

      for(const n of projectedNodes) {
        const r = Math.max(0.5, n.ref.radius * n.scale * 2.2) * n.reverbScale;
        
        let rawOpacity = 0.4 + (n.z * 0.3);
        rawOpacity = Math.max(0.05, Math.min(rawOpacity, 1.0));

        const nodeOpacity = Math.min(1.0, rawOpacity * (1 + n.reverbWave * 0.5));

        if (currentSpeedMultiplier > 1.5 && n.z > -0.5) {
          const glowRadius = r * (3 + n.reverbWave * 2); 
          const glow = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, glowRadius);
          
          const glowOp = nodeOpacity * 0.4 * (currentSpeedMultiplier / 2);
          glow.addColorStop(0, `rgba(${rgb}, ${Math.min(1, glowOp)})`);
          glow.addColorStop(1, "rgba(255,255,255,0)");
          
          ctx.beginPath();
          ctx.arc(n.px, n.py, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${nodeOpacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.px, n.py, r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, nodeOpacity * 1.5)})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    }
    
    render();

    const handleResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-[#fcfcfc] overflow-hidden rounded-lg border border-zinc-200" style={{ transformStyle: 'preserve-3d' }}>
       <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
       
       <TradeSchematicOverlay trade={trade} isVisible={showOverlay} type={overlayType} />
       
       <div className="absolute bottom-3 left-4 flex items-center gap-2 z-30">
         {stage !== "idle" && stage !== "plan" && (
           <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-600 opacity-80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-700" />
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-700">
                AI PROCESSING
              </span>
           </>
         )}
         {stage === "plan" && (
           <>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-700" />
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-700">
                OPTIMIZED
              </span>
           </>
         )}
         {stage === "idle" && (
           <>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-300" />
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                SYSTEM IDLE
              </span>
           </>
         )}
       </div>
    </div>
  );
}
