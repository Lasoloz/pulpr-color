import { Color } from "../color/Color";
import { Result } from "./Result";

export function isColorStr(color: any): boolean {
  if (typeof color !== "string") {
    return false;
  }

  if (color.length !== 4 && color.length !== 7) {
    return false;
  }

  const testStyle = new Option().style;
  testStyle.color = color;
  if (testStyle.color === "") {
    return false;
  }

  return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color);
}

export function getRootStyle(): CSSStyleDeclaration {
  return document.documentElement.style;
}

export function createPulprColorKey(themeKey: string, isForeground: boolean = false): string {
  return (isForeground ? "fg-" : "") + "--color-" + themeKey;
}


export function modifyThemeColor(
  themeKey: string,
  colorValue: string
): Result {
  if (isColorStr(colorValue)) {
    getRootStyle().setProperty(createPulprColorKey(themeKey), colorValue);
    return Result.SUCCESS;
  } else {
    return Result.FAILURE;
  }
}
