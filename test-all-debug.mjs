import puppeteer from "puppeteer-core";
import { mkdirSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "http://localhost:5173";
const DIR = join(tmpdir(), "viewport-tests-final");
mkdirSync(DIR, { recursive: true });

const VIEWPORTS = [
  { w: 320, h: 568 },
  { w: 360, h: 800 },
  { w: 375, h: 812 },
  { w: 390, h: 844 },
  { w: 414, h: 896 },
  { w: 640, h: 800 },
  { w: 768, h: 1024 },
  { w: 1024, h: 768 },
  { w: 1280, h: 800 },
  { w: 1440, h: 900 },
];

async function check(page) {
  return page.evaluate(() => {
    const hero = document.getElementById("hero");
    const grid = hero.querySelector(".grid");
    const textCol = grid.children[0];
    const photoCol = grid.children[1];
    const h1 = hero.querySelector("h1");
    const img = hero.querySelector('img[alt="Chandan Singh"]');
    const portfolioP = hero.querySelector('p[class*="text-gradient"]');

    const vw = window.innerWidth;
    const textR = textCol.getBoundingClientRect();
    const photoR = photoCol.getBoundingClientRect();
    const h1R = h1.getBoundingClientRect();
    const imgR = img.getBoundingClientRect();
    const portfolioR = portfolioP.getBoundingClientRect();
    const docW = document.documentElement.scrollWidth;

    // Find all glass badges and get their bottom edge
    const badges = hero.querySelectorAll(".glass");
    let lastBadgeBottom = 0;
    badges.forEach((b) => {
      const r = b.getBoundingClientRect();
      if (r.bottom > lastBadgeBottom) lastBadgeBottom = r.bottom;
    });

    // Grid alignment: items-start means both columns top-align at grid top
    // Photo is beside text if photo.left >= text.right (they're in adjacent grid cells)
    const photoBesideText = photoR.left >= textR.right - 2;

    // Photo aligns with identity block if photo.top is near h1.top (items-start on mobile)
    const photoAlignsWithIdentity = Math.abs(imgR.top - h1R.top) < 60;

    return {
      vw,
      noHScroll: docW <= vw,
      gridCols: window.getComputedStyle(grid).gridTemplateColumns,
      textColW: Math.round(textR.width),
      photoColW: Math.round(photoR.width),
      imgW: Math.round(imgR.width),
      imgH: Math.round(imgR.height),
      photoBesideText,
      photoAlignsWithIdentity,
      imgTop: Math.round(imgR.top),
      h1Top: Math.round(h1R.top),
      portfolioTop: Math.round(portfolioR.top),
      lastBadgeBottom: Math.round(lastBadgeBottom),
      portfolioBelowBadges: portfolioR.top >= lastBadgeBottom - 5,
      heroH: Math.round(hero.getBoundingClientRect().height),
      nameFontSize: window.getComputedStyle(h1).fontSize,
      // Check if name text wraps (get h1 line height info)
      h1LineHeight: window.getComputedStyle(h1).lineHeight,
    };
  });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  console.log("Viewport       | Grid Columns          | Photo     | Name   | Beside | Aligned | Portfolio ok | No HScroll");
  console.log("---------------|-----------------------|-----------|--------|--------|---------|--------------|----------");

  for (const { w, h } of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto(URL, { waitUntil: "networkidle2", timeout: 15000 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: join(DIR, `${w}x${h}.png`), fullPage: false });
    const r = await check(page);

    const label = `${w}×${h}`.padEnd(15);
    const cols = r.gridCols.padEnd(22);
    const photo = `${r.imgW}×${r.imgH}`.padEnd(10);
    const name = r.nameFontSize.padEnd(7);
    const beside = r.photoBesideText ? "  ✅  " : "  ❌  ";
    const aligned = r.photoAlignsWithIdentity ? "  ✅  " : "  ❌  ";
    const portfolio = r.portfolioBelowBadges ? "  ✅  " : "  ❌  ";
    const hscroll = r.noHScroll ? "  ✅" : "  ❌";

    console.log(`${label}| ${cols}| ${photo}| ${name}|${beside}|${aligned}|${portfolio}  |${hscroll}`);

    await page.close();
  }

  await browser.close();
}

run().catch(console.error);
