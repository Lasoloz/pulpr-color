import * as puppeteer from "puppeteer";
import createDirectoryIfNeeded from "../util/createDirectoryIfNeeded";
import createScreenshotOptions from "../util/createScreenshotOptions";

const TIMEOUT = 5000;
const URL = "http://localhost:1234/pug/theme.html";

async function createPage(): Promise<puppeteer.Page> {
  const browser = await puppeteer.launch();
  return await browser.newPage();
}

function createThemeUtilsScreenshotOpt(fnName: string, flag: string): puppeteer.BinaryScreenShotOptions {
  return createScreenshotOptions("themeUtils", fnName, flag);
}

describe("`modifyThemeColor` function", () => {
  beforeAll(() => {
    createDirectoryIfNeeded(".test");
  });

  test("should modify theme color on test page", async () => {
    const page = await createPage();
    await page.goto(URL);
    await page.waitForXPath("/html/body/div[1]");
    await page.screenshot(createThemeUtilsScreenshotOpt("modifyThemeColor", "before"));
  }, TIMEOUT);
});
