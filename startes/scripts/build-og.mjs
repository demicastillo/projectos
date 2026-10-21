// Genera public/img/og-startes.png (1200×630) con la tipografía y la escalera del sitio.
// Uso: node scripts/build-og.mjs  (requiere playwright; en este entorno usa /opt/pw-browsers/chromium)
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = process.env.ROOT ?? fileURLToPath(new URL("..", import.meta.url));
const font = readFileSync(root + "public/fonts/archivo-startes.woff2").toString("base64");
const logo = readFileSync(root + "public/img/startes-logo-480.png").toString("base64");
const heights = [22, 33, 45, 57, 69, 82, 100];
const codes = ["0", "A1", "A2", "B1", "B2", "C1", "C2"];

const html = `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${font}) format("woff2");font-weight:400 800;font-stretch:70% 116%}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#fff;color:#1d1714;font-family:A;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
h1{font-size:76px;line-height:.98;font-weight:800;letter-spacing:-.035em;font-variation-settings:"wdth" 116;max-width:15ch}
.row{display:flex;align-items:flex-end;justify-content:space-between}
.bars{display:flex;gap:10px;align-items:flex-end;height:170px}
.bar{width:62px;border-radius:14px 14px 0 0;background:#f5f1ee;display:flex;align-items:flex-end;padding:0 0 12px 10px;font-weight:800;font-size:22px;font-variation-settings:"wdth" 116}
.bar.on{background:#a11312;color:#fff}
</style></head><body>
<h1>Alemán online, desde tu primera palabra hasta C2.</h1>
<div class="row"><img src="data:image/png;base64,${logo}" width="128">
<div class="bars">${codes.map((c, i) => `<div class="bar${i === 3 ? " on" : ""}" style="height:${heights[i]}%">${c}</div>`).join("")}</div></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" }).catch(() => chromium.launch());
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: root + "public/img/og-startes.png" });
await browser.close();
console.log("public/img/og-startes.png");
