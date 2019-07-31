import * as puppeteer from "puppeteer";

export default function createScreenshotOptions(
  filename: string,
  fnName: string,
  flag: string
): puppeteer.BinaryScreenShotOptions {
  return {
    encoding: "binary",
    path: `.test/${filename}_${fnName}_${flag}.png`,
    type: "png"
  };
}
