export type PageId =
  | "overview"
  | "media"
  | "cut"
  | "edit"
  | "fusion"
  | "color"
  | "fairlight"
  | "deliver"
  | "shortcuts"
  | "resources";

export type SyllabusSection = { name: string; todos: string[] };

export type SyllabusPageBase = {
  title: string;
  description?: string;
  sections?: SyllabusSection[];
  resources?: { name: string; url: string }[];
};

export type ShortcutPage = {
  title: string;
  isShortcutPage: true;
  shortcuts: { cat: string; keys: { k: string; d: string }[] }[];
};

export type ResourcePage = {
  title: string;
  isResourcePage: true;
  links: { title: string; desc: string; url: string; type: string }[];
};

export type SyllabusPage = SyllabusPageBase | ShortcutPage | ResourcePage;

export const DAVINCI_PAGES: Record<PageId, SyllabusPage> = {
  overview: {
    title: "Professional Training Path",
    description:
      "This syllabus is designed to transform your workflow by mastering the specific logic of each dedicated workspace. Welcome to the industry standard.",
    sections: [
      {
        name: "Setup & Optimization",
        todos: [
          "Install Resolve 19 & configure Database location",
          "Memory Allocation: Set to maximum available minus 4GB",
          "GPU Configuration: Set to CUDA/OpenCL (Auto off)",
          "Timeline Resolution: 1080p for editing, 4K for grading",
        ],
      },
      {
        name: "The Core Sequence",
        todos: [
          "Media Management (Proxy workflow & Bins)",
          "Primary Assembly (Edit/Cut page logic)",
          "Audio Sweetening (Fairlight fundamentals)",
          "Color Transformation (The Node Pipeline)",
        ],
      },
    ],
  },
  media: {
    title: "Media Page",
    description:
      "Think of this as your production command center. Perfect organization leads to perfect edits.",
    sections: [
      {
        name: "Professional Data Wrangling",
        todos: [
          "Cloning camera cards with Checksums",
          "Proxy Generator: Set up background transcoding",
          "Metadata logging (Keywords, Scene, Shot, Angle)",
          "Smart Bins: Filtering by Lens, Resolution, or FPS",
          "Syncing external audio via waveform match",
        ],
      },
    ],
    resources: [
      {
        name: "BMD Training: Data Management",
        url: "https://www.blackmagicdesign.com/products/davinciresolve/training",
      },
    ],
  },
  cut: {
    title: "Cut Page",
    description:
      "Designed for rapid turnaround. Ideal for social media and assembly edits.",
    sections: [
      {
        name: "Speed Editing",
        todos: [
          "Mastering 'Source Tape' review mode",
          "Dynamic trimming on the dual timeline",
          "Using the 'Boring Detector' tool",
          "Fast Exports for TikTok/Reels directly",
        ],
      },
    ],
  },
  edit: {
    title: "Edit Page",
    description: "The most powerful NLE workspace for complex storytelling.",
    sections: [
      {
        name: "Advanced Timeline Control",
        todos: [
          "Trim Edit Mode (T) for Slip and Slide",
          "Nested Timelines vs Compound Clips",
          "Keyframing in the Inspector (Bezier curves)",
          "Multicam: Angle syncing and switching",
          "Subtitle Generation (AI Auto-Captioning)",
        ],
      },
    ],
  },
  fusion: {
    title: "Fusion Page",
    description: "Node-based compositing. Infinite possibilities for VFX and Titles.",
    sections: [
      {
        name: "The Power of Nodes",
        todos: [
          "Merge Nodes: The Background/Foreground logic",
          "Planar Tracking: Replacing screens and signs",
          "Delta Keyer: High-end Green Screen removal",
          "3D Workspace: Lighting, Cameras, and Particles",
          "Modifier scripts for automated animation",
        ],
      },
    ],
  },
  color: {
    title: "Color Page",
    description: "The gold standard for cinematic grading. Where logic meets art.",
    sections: [
      {
        name: "The Grading Pipeline",
        todos: [
          "Color Management: Setup DaVinci Wide Gamut",
          "Primary Grading: Balancing with Scopes",
          "Secondary Grading: Qualifier and Power Windows",
          "Node Types: Parallel, Layer, and Outside nodes",
          "Look Development: LUTs vs Film Look Creator",
        ],
      },
    ],
  },
  fairlight: {
    title: "Fairlight Page",
    description: "Full audio production suite. Don't let bad sound ruin good video.",
    sections: [
      {
        name: "Audio Precision",
        todos: [
          "AI Voice Isolation (Removing background noise)",
          "EQ & Dynamics: Compressing for consistency",
          "ADR: Automated Dialogue Replacement tools",
          "Ambience matching and Foley recording",
          "Final Loudness normalization (-14 LUFS)",
        ],
      },
    ],
  },
  deliver: {
    title: "Deliver Page",
    description: "Ensuring your final file matches your vision.",
    sections: [
      {
        name: "Export Mastering",
        todos: [
          "Bitrate settings for YouTube vs Cinema",
          "Individual Clips vs Single File export",
          "Metadata preservation (Chapters/Subtitles)",
          "Render Caching for heavy Fusion comps",
        ],
      },
    ],
  },
  shortcuts: {
    title: "The Shortcut Dashboard",
    isShortcutPage: true,
    shortcuts: [
      {
        cat: "Essential Page Switching",
        keys: [
          { k: "Shift + 2", d: "Media Page" },
          { k: "Shift + 4", d: "Edit Page" },
          { k: "Shift + 6", d: "Color Page" },
          { k: "Shift + 8", d: "Deliver Page" },
        ],
      },
      {
        cat: "Timeline Mastery",
        keys: [
          { k: "T", d: "Trim Mode Toggle" },
          { k: "B", d: "Blade Tool" },
          { k: "Shift + [ / ]", d: "Ripple Trim Start/End" },
          { k: "Alt/Opt + Y", d: "Select All Clips to Right" },
        ],
      },
      {
        cat: "Playback & View",
        keys: [
          { k: "L / K / J", d: "Fwd / Pause / Rev (Hold for Slow)" },
          { k: "Shift + L / J", d: "Fast Forward / Fast Reverse" },
          { k: "Shift + Z", d: "Zoom to Fit Entire Timeline" },
        ],
      },
      {
        cat: "The Colorist Deck",
        keys: [
          { k: "Alt/Opt + S", d: "Add Serial Node" },
          { k: "Alt/Opt + P", d: "Add Parallel Node" },
          { k: "Alt/Opt + L", d: "Add Layer Node" },
          { k: "Ctrl/Cmd + D", d: "Disable Current Node" },
        ],
      },
    ],
  },
  resources: {
    title: "Industry Knowledge Base",
    isResourcePage: true,
    links: [
      {
        title: "BMD Official Certification",
        desc: "Download the project files and take the exam for free.",
        url: "https://www.blackmagicdesign.com/products/davinciresolve/training",
        type: "Certification",
      },
      {
        title: "Casey Faris",
        desc: "The gold standard for YouTube-style editing tutorials.",
        url: "https://www.youtube.com/@caseyfaris",
        type: "Video",
      },
      {
        title: "Darren Mostyn",
        desc: "Professional color grading workflows and deep dives.",
        url: "https://www.youtube.com/@DarrenMostyn",
        type: "Video",
      },
      {
        title: "VFX Study",
        desc: "The best place to learn high-end Fusion node techniques.",
        url: "https://www.youtube.com/@VFXStudy",
        type: "Specialized",
      },
      {
        title: "The PDF Manual",
        desc: "Open via Help > Reference Manual. Use it as a searchable encyclopedia.",
        url: "#",
        type: "Official Docs",
      },
    ],
  },
};

export const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: "overview", label: "Dashboard" },
  { id: "media", label: "Media" },
  { id: "cut", label: "Cut" },
  { id: "edit", label: "Edit" },
  { id: "fusion", label: "Fusion" },
  { id: "color", label: "Color" },
  { id: "fairlight", label: "Fairlight" },
  { id: "deliver", label: "Deliver" },
  { id: "shortcuts", label: "Shortcuts" },
  { id: "resources", label: "Resources" },
];
