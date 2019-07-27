import Color from "./Color";

export function isColorStr(color: any): boolean {
  if (typeof color !== "string") {
    return false;
  }

  if (color.length !== 4 && color.length !== 7) {
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
) {
  if (!isColorStr(colorValue)) {
    throw new Error("You must provide a valid color string when modifyinh theme color!");
  }
  getRootStyle().setProperty(createPulprColorKey(themeKey), colorValue);
}

export function modifyThemeColorWithFg(
  themeKey: string,
  colorValue: string
) {
  if (!isColorStr(colorValue)) {
    throw new Error("You must provide a valid color string when modifyinh theme background and foreground color!");
  }
  const rootStyle = getRootStyle();
  const fgColor = Color.fromHexString(colorValue).getContrastColor();
  rootStyle.setProperty(createPulprColorKey(themeKey), colorValue);
  rootStyle.setProperty(createPulprColorKey(themeKey, true), fgColor.toString());
}
