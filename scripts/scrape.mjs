import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import * as cheerio from "cheerio";
import sharp from "sharp";

const root = "https://sites.google.com/view/micaelawallace-audiovisual";
const pages = [
  ["inicio", `${root}/`],
  ["direccion", `${root}/direcci%C3%B3n`],
  ["asistencias", `${root}/asistencias-de-direcci%C3%B3n`],
  ["otros-servicios", `${root}/otros-servicios-prestados`],
];
const output = path.join(process.cwd(), "content");
const media = path.join(process.cwd(), "public", "media");

const absolute = (value, base) => new URL(value, base).href;
const slugify = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

await mkdir(output, { recursive: true });
await mkdir(media, { recursive: true });

const inventory = { source: root, scrapedAt: new Date().toISOString(), pages: [] };
const seenImages = new Map();

for (const [section, url] of pages) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const html = await response.text();
  const $ = cheerio.load(html);
  const images = [...new Set($("img[src]").map((_, element) => absolute($(element).attr("src"), url)).get())];
  const links = [...new Set($("a[href]").map((_, element) => absolute($(element).attr("href"), url)).get())];
  const videos = [...new Set($("a[href], iframe[src]").map((_, element) => $(element).attr("href") || $(element).attr("src")).get().filter((href) => href?.includes("youtube.com") || href?.includes("youtu.be")))];
  const text = $("body").text().replace(/\s+/g, " ").trim();
  const page = { section, url, title: $("title").text().trim(), text, links, videos, images: [] };

  for (const imageUrl of images) {
    if (!seenImages.has(imageUrl)) {
      const imageResponse = await fetch(imageUrl);
      if (imageResponse.ok && imageResponse.headers.get("content-type")?.startsWith("image/")) {
        const filename = `${String(seenImages.size + 1).padStart(3, "0")}-${slugify(section)}.webp`;
        await sharp(Buffer.from(await imageResponse.arrayBuffer())).webp({ quality: 84 }).toFile(path.join(media, filename));
        seenImages.set(imageUrl, `/media/${filename}`);
      }
    }
    if (seenImages.has(imageUrl)) page.images.push({ source: imageUrl, local: seenImages.get(imageUrl) });
  }
  inventory.pages.push(page);
  console.log(`${section}: ${page.images.length} images, ${page.videos.length} videos`);
}

await writeFile(path.join(output, "site-inventory.json"), JSON.stringify(inventory, null, 2));
console.log(`Saved ${inventory.pages.length} pages and ${seenImages.size} images.`);