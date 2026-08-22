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
    const h1R = h1.getBoundingClientRect();
    const imgR = img.getBoundingClientRect();
    const textR = textCol.getBoundingClientRect();
    const photoR = photoCol.getBoundingClientRect();
    const portfolioR = portfolioP.getBoundingClientRect();
    const docW = document.documentElement.scrollWidth;

    // Find badges
    const badges = hero.querySelectorAll(".glass");
    const lastBadgeBottom = Array.from(badges).reduce((max, b) => {
      const r = b.getBoundingClientRect();
      return r.bottom > max ? r.bottom : max;
    }, 0);

    // Grid columns from computed style
    const gridStyle = window.getComputedStyle(grid);

    return {
      vw,
      noHScroll: docW <= vw,
      gridCols: gridStyle.gridTemplateColumns,
      textColW: Math.round(textR.width),
      photoColW: Math.round(photoR.width),
      imgW: Math.round(imgR.width),
      imgH: Math.round(imgR.height),
      imgRight: Math.round(imgR.right),
      photoBeside: photoR.left < textR.right + 5,
      h1FontSize: window.getComputedStyle(h1).fontSize,
      h1Bottom: Math.round(h1R.bottom),
      imgTop: Math.round(imgR.top),
      imgBottom: Math.round(imgR.bottom),
      // Photo vertical overlap with name: does img.top fall within the name block?
      imgAlignsWithName: imgR.top >= h1R.top - 20 && imgR.top <= h1R.bottom + 40,
      // Portfolio background position
      portfolioTop: Math.round(portfolioR.top),
      portfolioOverlapsBadges: portfolioR.top < lastBadgeBottom,
      // Hero height vs viewport
      heroH: Math.round(hero.getBoundingClientRect().height),
      heroRatio: (hero.getBoundingClientRect().height / vw).toFixed(2),
      // Description width
      descW: Math.round(
        (hero.querySelector('p[class*="max-w-md"]') || {}).getBoundingClientRect?.()?.width || 0
      ),
      // Button overflow
      btnsOverflow: Array.from(hero.querySelectorAll('a[href="#projects"], button')).some(
        (b) => b.getBoundingClientRect().right > vw
      ),
    };
  });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const results = [];

  for (const { w, h } of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto(URL, { waitUntil: "networkidle2", timeout: 15000 });
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: join(DIR, `${w}x${h}.png`), fullPage: false });
    const r = await check(page);
    results.push(r);

    const label = `${w}x${h}`;
    const issues = [];
    if (!r.noHScroll) issues.push("H-SCROLL");
    if (!r.photoBeside) issues.push("PHOTO_NOT_BESIDE");
    if (!r.imgAlignsWithName) issues.push("PHOTO_MISALIGNED");
    if (r.portfolioOverlapsBadges) issues.push("PORTFOLIO_OVERLAPS_BADGES");
    if (r.btnsOverflow) issues.push("BTNS_OVERFLOW");

    const status = issues.length === 0 ? "✅" : "❌ " + issues.join(", ");
    console.log(
      `${status.padEnd(40)} ${label.padEnd(12)} cols=${r.gridCols.padEnd(20)} img=${r.imgW}x${r.imgH}  name=${r.h1FontSize}  desc=${r.descW}px`
    );

    await page.close();
  }

  // Desktop comparison check
  const desk = results.find((r) => r.vw === 1440);
  if (desk) {
    console.log(`\n--- Desktop reference (1440) ---`);
    console.log(`  Grid: ${desk.gridCols}`);
    console.log(`  Photo: ${desk.imgW}×${desk.imgH}`);
    console.log(`  Name size: ${desk.h1FontSize}`);
  }

  await browser.close();
}

run().catch(console.error);
