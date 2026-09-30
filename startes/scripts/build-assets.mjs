// Genera las imágenes optimizadas de /public a partir de los originales en /assets.
// El logo original no se modifica: solo se recorta el margen transparente y se escala.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const LOGO = "assets/startes-logo.png";
const PHOTO = "assets/mariana-masgoret.jpg";
await mkdir("public/img", { recursive: true });

// Logo completo sin margen transparente.
const trimmed = await sharp(LOGO).trim().png().toBuffer();
const meta = await sharp(trimmed).metadata();
console.log("logo recortado", meta.width, meta.height);
for (const w of [240, 480]) {
  await sharp(trimmed).resize({ width: w }).png({ compressionLevel: 9 }).toFile(`public/img/startes-logo-${w}.png`);
  await sharp(trimmed).resize({ width: w }).webp({ quality: 90 }).toFile(`public/img/startes-logo-${w}.webp`);
}

// Símbolo (curvas) sin el wordmark, para el favicon.
const symbolRaw = await sharp(LOGO).extract({ left: 440, top: 400, width: 1040, height: 880 }).png().toBuffer();
const symbol = await sharp(symbolRaw).trim().png().toBuffer();
const square = await sharp(symbol)
  .resize({ width: 440, height: 440, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: 36, bottom: 36, left: 36, right: 36, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png().toBuffer();
// Fondo claro redondeado para que el negro del símbolo se lea en pestañas oscuras.
const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512"><rect width="512" height="512" rx="112" fill="#FAF8F3"/></svg>`);
const icon = await sharp(bg).composite([{ input: square }]).png().toBuffer();
await sharp(icon).resize(512).toFile("public/img/icon-512.png");
await sharp(icon).resize(180).toFile("public/img/apple-touch-icon.png");
await sharp(icon).resize(32).toFile("public/img/favicon-32.png");
await sharp(icon).resize(16).toFile("public/img/favicon-16.png");

// Foto de Mariana.
for (const w of [480, 800]) {
  await sharp(PHOTO).resize({ width: w }).webp({ quality: 78 }).toFile(`public/img/mariana-masgoret-${w}.webp`);
}

// Imagen Open Graph 1200×630.
const logoOg = await sharp(trimmed).resize({ height: 360 }).png().toBuffer();
const ogSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#FAF8F3"/>
  <path d="M-40 575 C 320 470, 760 640, 1260 470" stroke="#A11312" stroke-width="18" fill="none" stroke-linecap="round"/>
  <path d="M-40 625 C 340 520, 780 690, 1260 530" stroke="#EABF34" stroke-width="18" fill="none" stroke-linecap="round"/>
  <text x="560" y="210" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#171717">Aprendé alemán</text>
  <text x="560" y="280" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#171717">online.</text>
  <text x="560" y="345" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#57534E">Clases individuales y grupales · A1 a C2</text>
  <text x="560" y="385" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#57534E">Exámenes · Español para germanoparlantes</text>
</svg>`);
await sharp(ogSvg).composite([{ input: logoOg, left: 90, top: 110 }]).png({ compressionLevel: 9 }).toFile("public/img/og-startes.png");
console.log("listo");
