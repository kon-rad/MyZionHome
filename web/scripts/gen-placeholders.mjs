// Generates branded SVG placeholders for the gallery so the site works before
// real photos are added. Run: node scripts/gen-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "media", "gallery");
mkdirSync(OUT, { recursive: true });

const items = [
  { file: "exterior-01", label: "Exterior · The Farmhouse", a: "#2A3B27", b: "#C98A3C", w: 1600, h: 1000 },
  { file: "exterior-02", label: "Forest Trail", a: "#20301F", b: "#5E6E4E", w: 1000, h: 1400 },
  { file: "living-01", label: "Living Room · Swing Chair", a: "#3A3326", b: "#C98A3C", w: 1200, h: 900 },
  { file: "living-02", label: "The Cozy Lounge", a: "#2A2E22", b: "#9AA786", w: 1200, h: 900 },
  { file: "kitchen-01", label: "The Kitchen", a: "#3A2E22", b: "#E0A04C", w: 1600, h: 1000 },
  { file: "bedroom-01", label: "Bedroom 1 · The Office", a: "#242B22", b: "#9AA786", w: 1000, h: 1400 },
  { file: "bedroom-02", label: "Master Bedroom", a: "#2A3B27", b: "#C98A3C", w: 1200, h: 900 },
  { file: "bedroom-03", label: "Bedroom 3", a: "#20301F", b: "#5E6E4E", w: 1200, h: 900 },
  { file: "trail-01", label: "Deck & Fire Pit · Dusk", a: "#3A2E22", b: "#A65A38", w: 1600, h: 1000 },
];

const svg = ({ label, a, b, w, h }) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="v" cx="0.5" cy="0.4" r="0.8">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.45"/>
    </radialGradient>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/><feColorMatrix type="saturate" values="0"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#v)"/>
  <rect width="${w}" height="${h}" filter="url(#n)" opacity="0.06"/>
  <g fill="none" stroke="#F7F3EA" stroke-opacity="0.9" stroke-width="${Math.round(w / 240)}" stroke-linejoin="round" transform="translate(${w / 2 - 34},${h / 2 - 78})">
    <path d="M6 66C6 30 34 6 70 6c0 36-28 60-64 60z"/>
    <path d="M6 66c18-4 32-18 40-36" stroke-width="${Math.round(w / 320)}"/>
  </g>
  <text x="50%" y="${h / 2 + 40}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(w / 34)}" fill="#F7F3EA" fill-opacity="0.92">${label}</text>
  <text x="50%" y="${h / 2 + 40 + Math.round(w / 30)}" text-anchor="middle" font-family="monospace" font-size="${Math.round(w / 70)}" letter-spacing="4" fill="#F7F3EA" fill-opacity="0.55">NATUREHOUSE · REPLACE WITH PHOTO</text>
</svg>`;

for (const it of items) {
  writeFileSync(join(OUT, `${it.file}.svg`), svg(it));
  console.log("wrote", it.file + ".svg");
}
console.log("Done. " + items.length + " placeholders in public/media/gallery/");
