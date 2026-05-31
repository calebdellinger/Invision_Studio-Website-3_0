type Accent = "blue" | "green" | "amber";

const stroke = {
  blue: "#60a5fa",
  green: "var(--brand-creative)",
  amber: "#fbbf24",
};

const faint = {
  blue: "rgba(96,165,250,0.15)",
  green: "color-mix(in srgb, var(--brand-creative) 15%, transparent)",
  amber: "rgba(251,191,36,0.15)",
};

/** Isometric 3D cloud with connected SaaS nodes */
export function CloudWireIllustration({ accent = "blue" }: { accent?: Accent }) {
  const s = stroke[accent];
  const f = faint[accent];
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="cloud-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={s} stopOpacity="0.25" />
          <stop offset="100%" stopColor={s} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid floor */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`g${i}`} x1={40 + i * 70} y1={180} x2={80 + i * 70} y2={140} stroke={s} strokeOpacity="0.12" strokeWidth="0.75" />
      ))}
      {/* 3D cloud stack — isometric layers */}
      <ellipse cx="200" cy="118" rx="88" ry="28" fill={f} stroke={s} strokeWidth="1.2" strokeOpacity="0.5" />
      <ellipse cx="200" cy="98" rx="72" ry="24" fill="url(#cloud-shade)" stroke={s} strokeWidth="1.4" />
      <ellipse cx="200" cy="82" rx="52" ry="18" fill={f} stroke={s} strokeWidth="1.2" strokeOpacity="0.7" />
      <path
        d="M148 108c0-18 14-32 32-32 5 0 10 1 14 4 5-10 16-16 28-16 18 0 32 14 32 32 0 2 0 4-.2 6H148c-2 0-4-2-4-4z"
        fill="none"
        stroke={s}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* API nodes */}
      {[
        { x: 72, y: 72, label: "Make", icon: "M" },
        { x: 328, y: 72, label: "n8n", icon: "n" },
        { x: 72, y: 158, label: "Zapier", icon: "Z" },
        { x: 328, y: 158, label: "APIs", icon: "↗" },
      ].map(({ x, y, label, icon }) => (
        <g key={label}>
          <line x1={x} y1={y} x2={200} y2={100} stroke={s} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 3" />
          <rect x={x - 28} y={y - 22} width="56" height="44" rx="8" fill="#0a0a0a" stroke={s} strokeWidth="1.2" strokeOpacity="0.6" />
          <text x={x} y={y - 4} textAnchor="middle" fill={s} fontSize="14" fontWeight="600">
            {icon}
          </text>
          <text x={x} y={y + 12} textAnchor="middle" fill="#71717a" fontSize="8" fontWeight="500">
            {label}
          </text>
        </g>
      ))}
      <text x="200" y="200" textAnchor="middle" fill="#52525b" fontSize="9" letterSpacing="0.12em">
        CLOUD ORCHESTRATION LAYER
      </text>
    </svg>
  );
}

/** Wire-frame Mac mini on desk in office */
export function OfficeMacWireIllustration({ accent = "green" }: { accent?: Accent }) {
  const s = stroke[accent];
  const f = faint[accent];
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden>
      {/* Room outline */}
      <rect x="30" y="30" width="340" height="160" rx="4" fill="none" stroke={s} strokeOpacity="0.2" strokeWidth="1" strokeDasharray="6 4" />
      {/* Window */}
      <rect x="280" y="40" width="70" height="55" fill={f} stroke={s} strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="315" y1="40" x2="315" y2="95" stroke={s} strokeOpacity="0.3" strokeWidth="0.75" />
      <line x1="280" y1="67" x2="350" y2="67" stroke={s} strokeOpacity="0.3" strokeWidth="0.75" />
      {/* Desk */}
      <path d="M60 155 L340 155 L340 165 L60 165 Z" fill={f} stroke={s} strokeWidth="1.2" strokeOpacity="0.6" />
      <line x1="80" y1="165" x2="80" y2="185" stroke={s} strokeOpacity="0.4" strokeWidth="1.2" />
      <line x1="320" y1="165" x2="320" y2="185" stroke={s} strokeOpacity="0.4" strokeWidth="1.2" />
      {/* Monitor */}
      <rect x="130" y="68" width="100" height="68" rx="4" fill="#0a0a0a" stroke={s} strokeWidth="1.4" />
      <rect x="138" y="76" width="84" height="52" rx="2" fill={f} stroke={s} strokeOpacity="0.4" strokeWidth="0.75" />
      <line x1="180" y1="136" x2="180" y2="148" stroke={s} strokeOpacity="0.5" strokeWidth="1.2" />
      <line x1="160" y1="148" x2="200" y2="148" stroke={s} strokeOpacity="0.5" strokeWidth="1.2" />
      {/* Mac mini */}
      <rect x="218" y="130" width="52" height="18" rx="4" fill="#0a0a0a" stroke={s} strokeWidth="1.4" />
      <circle cx="262" cy="139" r="2" fill={s} fillOpacity="0.6" />
      <text x="244" y="142" textAnchor="middle" fill={s} fontSize="7" fontWeight="600" opacity="0.7">
        mini
      </text>
      {/* Keyboard hint */}
      <rect x="148" y="148" width="56" height="8" rx="2" fill="none" stroke={s} strokeOpacity="0.35" strokeWidth="0.75" />
      {/* Plant */}
      <path d="M52 155 Q52 130 58 125 Q64 120 68 130 Q72 140 68 155" fill="none" stroke={s} strokeOpacity="0.35" strokeWidth="1" />
      <line x1="60" y1="155" x2="60" y2="165" stroke={s} strokeOpacity="0.35" strokeWidth="1" />
      {/* Lock badge — private */}
      <circle cx="60" cy="52" r="14" fill={f} stroke={s} strokeWidth="1.2" />
      <rect x="54" y="50" width="12" height="9" rx="2" fill="none" stroke={s} strokeWidth="1" />
      <path d="M56 50v-3a4 4 0 0 1 8 0v3" fill="none" stroke={s} strokeWidth="1" />
      {/* Connected nodes */}
      {[
        { x: 310, y: 130, label: "CRM" },
        { x: 310, y: 170, label: "Files" },
      ].map(({ x, y, label }) => (
        <g key={label}>
          <line x1={270} y1={139} x2={x - 18} y2={y} stroke={s} strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 2" />
          <rect x={x - 18} y={y - 10} width="36" height="20" rx="4" fill="#0a0a0a" stroke={s} strokeOpacity="0.45" strokeWidth="1" />
          <text x={x} y={y + 4} textAnchor="middle" fill="#71717a" fontSize="7">
            {label}
          </text>
        </g>
      ))}
      <text x="200" y="210" textAnchor="middle" fill="#52525b" fontSize="9" letterSpacing="0.12em">
        ON-PREMISE · LOCAL INFERENCE
      </text>
    </svg>
  );
}

/** Hybrid — cloud meets local office */
export function HybridWireIllustration({ accent = "amber" }: { accent?: Accent }) {
  const s = stroke[accent];
  const f = faint[accent];
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" aria-hidden>
      <line x1="200" y1="30" x2="200" y2="190" stroke={s} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />
      {/* Left — cloud half */}
      <ellipse cx="110" cy="90" rx="48" ry="18" fill={f} stroke={s} strokeWidth="1.2" strokeOpacity="0.6" />
      <path
        d="M72 98c0-14 11-24 24-24 4 0 7 1 10 3 4-7 12-12 21-12 14 0 25 10 25 24 0 1 0 2-.1 3H72c-1 0-2-1-2-2z"
        fill="none"
        stroke={s}
        strokeWidth="1.3"
      />
      <rect x="68" y="130" width="44" height="22" rx="5" fill="#0a0a0a" stroke={s} strokeOpacity="0.5" strokeWidth="1" />
      <text x="90" y="144" textAnchor="middle" fill="#71717a" fontSize="7">
        Make
      </text>
      <text x="90" y="175" textAnchor="middle" fill="#52525b" fontSize="8" letterSpacing="0.1em">
        CLOUD
      </text>
      {/* Right — local half */}
      <rect x="248" y="68" width="72" height="48" rx="4" fill="#0a0a0a" stroke={s} strokeWidth="1.2" strokeOpacity="0.6" />
      <rect x="256" y="76" width="56" height="32" rx="2" fill={f} stroke={s} strokeOpacity="0.35" strokeWidth="0.75" />
      <rect x="278" y="122" width="40" height="14" rx="3" fill="#0a0a0a" stroke={s} strokeWidth="1.2" />
      <line x1="298" y1="116" x2="298" y2="122" stroke={s} strokeOpacity="0.4" strokeWidth="1" />
      <text x="298" y="175" textAnchor="middle" fill="#52525b" fontSize="8" letterSpacing="0.1em">
        LOCAL
      </text>
      {/* Bridge sync */}
      <path d="M158 100 Q180 100 180 120 Q180 140 202 140" fill="none" stroke={s} strokeWidth="1.5" strokeDasharray="5 3" />
      <circle cx="180" cy="120" r="12" fill={f} stroke={s} strokeWidth="1.2" />
      <text x="180" y="124" textAnchor="middle" fill={s} fontSize="8" fontWeight="600">
        ⇄
      </text>
      <text x="200" y="210" textAnchor="middle" fill="#52525b" fontSize="9" letterSpacing="0.12em">
        SELECTIVE ROUTING · BEST OF BOTH
      </text>
    </svg>
  );
}

export function ApproachIllustration({ id, accent }: { id: "cloud" | "private" | "hybrid"; accent: Accent }) {
  if (id === "cloud") return <CloudWireIllustration accent={accent} />;
  if (id === "private") return <OfficeMacWireIllustration accent={accent} />;
  return <HybridWireIllustration accent={accent} />;
}
