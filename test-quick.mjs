import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "http://localhost:5173";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  for (const { w, h } of [{ w: 320, h: 568 }, { w: 375, h: 812 }, { w: 640, h: 800 }, { w: 1440, h: 900 }]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h });
    await page.goto(URL, { waitUntil: "networkidle2", timeout: 15000 });
    await new Promise((r) => setTimeout(r, 1500));

    const r = await page.evaluate(() => {
      const hero = document.getElementById("hero");
      const grid = hero.querySelector(".grid");
      const textCol = grid.children[0];
      const photoCol = grid.children[1];
      const h1 = hero.querySelector("h1");
      const img = hero.querySelector('img[alt="Chandan Singh"]');
      const portfolioP = hero.querySelector('p[class*="text-gradient"]');
      const badges = hero.querySelectorAll(".glass");
      let lastBadgeBottom = 0;
      badges.forEach((b) => { const r = b.getBoundingClientRect(); if (r.bottom > lastBadgeBottom) lastBadgeBottom = r.bottom; });
      const portfolioR = portfolioP.getBoundingClientRect();
      const imgR = img.getBoundingClientRect();
      const textR = textCol.getBoundingClientRect();
      const h1R = h1.getBoundingClientRect();
      return {
        vw: window.innerWidth,
        photoBeside: photoCol.getBoundingClientRect().left >= textR.right - 2,
        photoAligns: Math.abs(imgR.top - h1R.top) < 60,
        portfolioBelow: portfolioR.top >= lastBadgeBottom - 2,
        noHScroll: document.documentElement.scrollWidth <= window.innerWidth,
        imgW: Math.round(imgR.width),
        imgH: Math.round(imgR.height),
        nameFont: window.getComputedStyle(h1).fontSize,
        portfolioTop: Math.round(portfolioR.top),
        badgeBottom: Math.round(lastBadgeBottom),
      };
    });

    const pass = r.photoBeside && r.photoAligns && r.portfolioBelow && r.noHScroll;
    console.log(`${pass ? "✅" : "❌"} ${w}×${h}  photo=${r.imgW}×${r.imgH}  name=${r.nameFont}  portfolio=${r.portfolioTop}px  badgeBottom=${r.badgeBottom}px  gap=${r.portfolioTop - r.badgeBottom}px`);
    await page.close();
  }

  await browser.close();
}

run().catch(console.error);
