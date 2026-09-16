// Genera content/photo-diary.json: todas las fotografías del sitio, sin duplicados,
// con sus dimensiones reales para poder maquetarlas sin recortes ni fondos.
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const inventory = JSON.parse(await readFile(new URL("../content/site-inventory.json", import.meta.url), "utf8"));

const isChrome = (image) => image.source.includes("sociallinks") || image.source.includes("ssl.gstatic.com");
const candidates = inventory.pages.flatMap((page) => page.images.filter((image) => !isChrome(image)).map((image) => ({ ...image, section: page.section })));

const seen = new Set();
const photos = [];

for (const image of candidates) {
  const buffer = await readFile(new URL(`../public${image.local}`, import.meta.url));
  const hash = createHash("sha1").update(buffer).digest("hex");
  if (seen.has(hash)) continue;
  const { width, height } = await sharp(buffer).metadata();
  // Iconos y marcas de agua del sitio original: no son fotografías.
  if (width < 400 || height < 400) continue;
  seen.add(hash);
  photos.push({ src: image.local, width, height });
}

await writeFile(new URL("../content/photo-diary.json", import.meta.url), `${JSON.stringify({ photos }, null, 2)}\n`);
console.log(`${photos.length} fotografías`);
