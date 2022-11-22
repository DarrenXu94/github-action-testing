const playwright = require("playwright");

const handleConsoleMsg = async (msg) => {
  try {
    for (const arg of msg.args()) {
      const parsed = await arg.jsonValue();
      if (typeof parsed == "object" && "data" in parsed) {
        console.log(parsed.data);
      }
    }
  } catch (e) {
    console.log(e);
    return;
  }
};

async function main() {
  try {
    const browser = await playwright.chromium.launch({
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();
    await page.on("console", (msg) => handleConsoleMsg(msg));

    await page.goto("https://cf-futsal.dribl.com/ladders/");
    await page.waitForTimeout(5000);
    await page
      .locator(
        "#__layout > div > div.nuxt-container.position-relative > section.section.page-filter > div > div.pageFilter.d-none.d-lg-flex.flex-wrap > div:nth-child(2)"
      )
      .click();

    await page
      .locator(
        "#__layout > div > div.nuxt-container.position-relative > section.section.page-filter > div > div.pageFilter.d-none.d-lg-flex.flex-wrap > div:nth-child(2) > div.filter-dropdown.shadow.w-100.d-block.position-absolute.top-100.ps.ps--active-x.ps--active-y > ul > li:nth-child(3)"
      )
      .click();
    await page.waitForTimeout(5000);
    await browser.close();
  } catch (e) {
    console.log(e);
  }
}

main();
