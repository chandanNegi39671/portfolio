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
  await page.setViewport({ width: 320, height: 568 });
  await page.goto(URL, { waitUntil: "networkidle2", timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1500));

  const data = await page.evaluate(() => {
    const hero = document.getElementById("hero");
    const portfolioP = hero.querySelector('p[class*="text-gradient"]');
    const badges = hero.querySelectorAll(".glass");

    const portfolioR = portfolioP.getBoundingClientRect();
    const badgeRects = Array.from(badges).map((b, i) => {
      const r = b.getBoundingClientRect();
      return {
        index: i,
        top: r.top,
        bottom: r.bottom,
        left: r.left,
        right: r.right,
        width: r.width,
        height: r.height,
        text: b.textContent.substring(0, 20),
      };
    });

    let lastBadgeBottom = 0;
    badgeRects.forEach((b) => {
      if (b.bottom > lastBadgeBottom) lastBadgeBottom = b.bottom;
    });

    return {
      portfolioTop: portfolioR.top,
      portfolioBottom: portfolioR.bottom,
      portfolioHeight: portfolioR.height,
      badges: badgeRects,
      lastBadgeBottom,
      gap: portfolioR.top - lastBadgeBottom,
    };
  });

  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

run().catch(console.error);
