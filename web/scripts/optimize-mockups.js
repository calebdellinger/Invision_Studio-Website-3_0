const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/components/site');
const destDir = path.join(__dirname, '../public/mockups');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const mockups = [
  'apex_detail_mockup.html',
  'pumpkin_patch_v2.html',
  'whiteout_co_mockup.html',
  'current_and_stone_mockup.html',
  'meridian_build_hero (1).html',
  'meridian_build_hero.html',
];

const scrollStyle = `<style>
html, body {
  overflow: hidden !important;
  scroll-behavior: auto !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
</style>`;

mockups.forEach((filename) => {
  const srcPath = path.join(srcDir, filename);
  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    return;
  }

  let html = fs.readFileSync(srcPath, 'utf8');

  // Inject styles
  let updatedHtml = html;
  if (html.includes('</head>')) {
    updatedHtml = html.replace('</head>', `${scrollStyle}</head>`);
  } else {
    updatedHtml = `${scrollStyle}${html}`;
  }

  const destPath = path.join(destDir, filename);
  fs.writeFileSync(destPath, updatedHtml, 'utf8');
  console.log(`Optimized and copied ${filename} to public/mockups/`);
});
