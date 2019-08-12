import * as puppeteer from "puppeteer";
import createDirectoryIfNeeded from "../util/createDirectoryIfNeeded";
import createScreenshotOptions from "../util/createScreenshotOptions";

const TIMEOUT = 5000;
const URL = "http://localhost:1234/pug/theme.html";
const XPATH = "/html/body/div[1]";

async function createPage(): Promise<puppeteer.Page> {
  const browser = await puppeteer.launch();
  return await browser.newPage();
}

async function getFirstDivStyle(page: puppeteer.Page): Promise<CSSStyleDeclaration> {
  return await page.evaluate(() => {
    const firstDiv = document.querySelector(".example");
    return JSON.parse(JSON.stringify(getComputedStyle(firstDiv)));
  });
}

function createThemeUtilsScreenshotOpt(fnName: string, flag: string): puppeteer.BinaryScreenShotOptions {
  return createScreenshotOptions("themeUtils", fnName, flag);
}

describe("`modifyThemeColor` function", () => {
  beforeAll(() => {
    createDirectoryIfNeeded(".test");
  });

  test("should check original theme color on test page", async () => {
    const page = await createPage();
    await page.goto(URL);
    await page.waitForXPath(XPATH);
    await page.screenshot(createThemeUtilsScreenshotOpt("modifyThemeColor", "original"));
    const style = await getFirstDivStyle(page);
    expect(style.backgroundColor).toBe("rgb(106, 4, 29)");
    await page.close();
  }, TIMEOUT);
  test("should modify theme color on test page", async () => {
    const page = await createPage();
    await page.goto(URL);
    await page.waitForXPath(XPATH);
    await page.click("#change-button");
    await page.screenshot(createThemeUtilsScreenshotOpt("modifyThemeColor", "modified"));
    const style = await getFirstDivStyle(page);
    expect(style.backgroundColor).toBe("rgb(43, 92, 33)");
    await page.close();
  }, TIMEOUT);
});
