import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const pages = [
  { url: 'http://localhost:3000/', label: 'home', wait: 4500 },
  { url: 'http://localhost:3000/aanbod/fitness', label: 'aanbod-fitness', wait: 1500 },
  { url: 'http://localhost:3000/aanbod/groepslessen', label: 'aanbod-groepslessen', wait: 1500 },
  { url: 'http://localhost:3000/aanbod/personal-training', label: 'aanbod-personal-training', wait: 1500 },
  { url: 'http://localhost:3000/aanbod/voeding', label: 'aanbod-voeding', wait: 1500 },
  { url: 'http://localhost:3000/aanbod/relax', label: 'aanbod-relax', wait: 1500 },
  { url: 'http://localhost:3000/tarieven/abonnementen', label: 'tarieven-abonnementen', wait: 1500 },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const { url, label, wait } of pages) {
  const outputPath = path.join(SCREENSHOT_DIR, `${label}.png`);
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, wait));
  await page.screenshot({ path: outputPath, fullPage: true });
  await page.close();
  console.log(`Saved: ${label}.png`);
}

await browser.close();
console.log('All screenshots done.');
