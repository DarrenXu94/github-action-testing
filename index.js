const playwright = require("playwright");

async function main() {
  try {
    const browser = await playwright.chromium.launch({
      channel: "chrome",
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("https://cf-futsal.dribl.com/ladders/");
    await page.waitForTimeout(5000);
    let theTitle = await page.title();

    console.log("done on page", theTitle);
    await browser.close();
  } catch (e) {
    console.log(e);
  }
}

main();
