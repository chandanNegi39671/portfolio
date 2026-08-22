import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "http://localhost:5173";

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1500));

  const data = await page.evaluate(() => {
    const hero = document.getElementById("hero");
    const grid = hero.querySelector(".grid");
    const textCol = grid.children[0];
    const photoCol = grid.children[1];
    const h1 = hero.querySelector("h1");
    const img = hero.querySelector('img[alt="Chandan Singh"]');
    const portfolioP = hero.querySelector('p[class*="text-gradient"]');

    // Find all glass badges
    const badges = hero.querySelectorAll(".glass");
    const badgeInfo = Array.from(badges).map((b) => {
      const r = b.getBoundingClientRect();
      return { text: b.textContent.substring(0, 30), top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) };
    });

    const gridR = grid.getBoundingClientRect();
    const textR = textCol.getBoundingClientRect();
    const photoR = photoCol.getBoundingClientRect();
    const h1R = h1.getBoundingClientRect();
    const imgR = img.getBoundingClientRect();
    const portfolioR = portfolioP.getBoundingClientRect();

    return {
      grid: { top: Math.round(gridR.top), left: Math.round(gridR.left), right: Math.round(gridR.right), width: Math.round(gridR.width), height: Math.round(gridR.height) },
      textCol: { top: Math.round(textR.top), left: Math.round(textR.left), right: Math.round(textR.right), width: Math.round(textR.width) },
      photoCol: { top: Math.round(photoR.top), left: Math.round(photoR.left), right: Math.round(photoR.right), width: Math.round(photoR.width) },
      h1: { top: Math.round(h1R.top), bottom: Math.round(h1R.bottom), left: Math.round(h1R.left), width: Math.round(h1R.width) },
      img: { top: Math.round(imgR.top), bottom: Math.round(imgR.bottom), left: Math.round(imgR.left), right: Math.round(imgR.right), width: Math.round(imgR.width), height: Math.round(imgR.height) },
      portfolio: { top: Math.round(portfolioR.top), bottom: Math.round(portfolioR.bottom), width: Math.round(portfolioR.width), height: Math.round(portfolioR.height) },
      badges: badgeInfo,
      noHScroll: document.documentElement.scrollWidth <= window.innerWidth,
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

run().catch(console.error);
