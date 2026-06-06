import fs from 'fs';

const files = [
  'web/src/app/(public)/services/ai-integrations/page.tsx',
  'web/src/components/site/service/AiDeploymentApproaches.tsx',
  'web/src/components/site/service/AiDeploymentOrbit.tsx',
  'web/src/components/site/service/AiStatsChart.tsx',
  'web/src/components/site/service/ConstructionTradeSimulator.tsx'
];

const replacements = [
  ['bg-[#050505]', 'bg-white'],
  ['text-white', 'text-zinc-900'],
  ['text-zinc-400', 'text-zinc-600'],
  ['text-zinc-300', 'text-zinc-700'],
  ['border-white/[0.06]', 'border-zinc-200'],
  ['border-white/[0.09]', 'border-zinc-200'],
  ['border-white/[0.08]', 'border-zinc-200'],
  ['border-white/[0.07]', 'border-zinc-200'],
  ['border-white/[0.1]', 'border-zinc-200'],
  ['border-white/[0.03]', 'border-zinc-200'],
  ['border-white/10', 'border-zinc-200'],
  ['border-white/15', 'border-zinc-200'],
  ['border-white/20', 'border-zinc-300'],
  ['ring-white/[0.03]', 'ring-zinc-100'],
  ['bg-[#0e0e0f]', 'bg-zinc-50'],
  ['bg-[#111]/85', 'bg-zinc-50'],
  ['bg-[#111]/80', 'bg-zinc-50'],
  ['bg-[#111]', 'bg-zinc-50'],
  ['bg-[#080809]/80', 'bg-white'],
  ['bg-[#080809]', 'bg-zinc-50'],
  ['bg-[#0c0c0d]/90', 'bg-white'],
  ['bg-[#0c0c0d]', 'bg-zinc-50'],
  ['bg-[#0a0a0a]/95', 'bg-white'],
  ['bg-[#0a0a0a]', 'bg-zinc-50'],
  ['bg-[#060606]', 'bg-white'],
  ['bg-[#0b0b0c]', 'bg-white'],
  ['bg-[#121213]', 'bg-zinc-50'],
  ['bg-black/70', 'bg-white/80'],
  ['bg-white/[0.04]', 'bg-zinc-100'],
  ['bg-[#0a0a0b]', 'bg-zinc-100'],
  ['from-black', 'from-white'],
  ['to-black/20', 'to-white'],
  ['to-black', 'to-white'],
  ['rgba(0,0,0,0.55)', 'rgba(255,255,255,0.7)'],
  ['#000_100%', '#fff_100%'],
  ['bg-[#151517]', 'bg-zinc-100'],
  ['text-zinc-200', 'text-zinc-800'],
  ['text-[#0a0a0a]', 'text-white'],
  ['rgba(255,255,255,0.15)', 'rgba(0,0,0,0.05)']
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [search, repl] of replacements) {
    content = content.split(search).join(repl);
  }
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
