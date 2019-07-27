export default class Color {
  public static WHITE_LIKE = Color.fromHexString("#efefef");
  public static BLACK_LIKE = Color.fromHexString("#0f0f0f");

  public static fromHexString(colorStr: string): Color {
    let matches: RegExpMatchArray;
    let hex3: boolean = false;
    if (colorStr.length === 4) {
      matches = colorStr.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
      hex3 = true;
    } else if (colorStr.length === 7) {
      matches = colorStr.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    } else {
      throw new Error("Color string must be 4 or 7 characters long to match `#rrggbb` or `#rgb` format!");
    }

    return Color.processMatches(matches, hex3);
  }


  private static RELATIVE_LUMINANCE_BOUND = 0.03928;
  private static RELATIVE_LUM_SMALL_DIV = 12.92;
  private static RELATIVE_LUM_BIG_SUM = 0.055;
  private static RELATIVE_LUM_BIG_DIV = 1.055;
  private static RELATIVE_LUM_BIG_EXP = 2.4;
  private static RELATIVE_LUM_RED_MULT = 0.2126;
  private static RELATIVE_LUM_GREEN_MULT = 0.7152;
  private static RELATIVE_LUM_BLUE_MULT = 0.0722;

  private static processMatches(matches: RegExpMatchArray, hex3: boolean): Color {
    if (matches == null || matches.length !== 4) {
      throw new Error("Color is not matching `#rrggbb` or `#rgb` format!");
    }

    return new Color(
      this.parseComponent(matches[1], hex3),
      this.parseComponent(matches[2], hex3),
      this.parseComponent(matches[3], hex3)
    );
  }

  private static parseComponent(compStr: string, scale: boolean): number {
    // Since called after regex, correct string is always provided
    return parseInt(compStr + (scale ? compStr : ""), 16);
  }


  private red: number;
  private green: number;
  private blue: number;
  private relativeLuminance: number;


  private constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.relativeLuminance = this.calculateRelativeLuminance();
  }


  public getRed(): number {
    return this.red;
  }

  public getGreen(): number {
    return this.green;
  }

  public getBlue(): number {
    return this.blue;
  }

  public getRelativeLuminance(): number {
    return this.relativeLuminance;
  }

  public getContrastColor(lightOpt: Color = Color.WHITE_LIKE, darkOpt: Color = Color.BLACK_LIKE): Color {
    const cr1 = this.contastRatio(lightOpt);
    const cr2 = this.contastRatio(darkOpt);

    if (cr1 > cr2) {
      return lightOpt;
    } else {
      return darkOpt;
    }
  }


  public toString(): string {
    return "#" +
      this.paddedComponent(this.red) +
      this.paddedComponent(this.green) +
      this.paddedComponent(this.blue);
  }


  private contastRatio(color: Color): number {
    const lumThis = this.relativeLuminance;
    const lumOther = color.relativeLuminance;

    if (lumThis > lumOther) {
      return (lumThis + 0.05) / (lumOther + 0.05);
    } else {
      return (lumOther + 0.05) / (lumOther + 0.05);
    }
  }

  private calculateRelativeLuminance(): number {
    const sr = this.red / 255;
    const sg = this.green / 255;
    const sb = this.blue / 255;

    return Color.RELATIVE_LUM_RED_MULT * this.relativeLuminanceComponent(sr) +
      Color.RELATIVE_LUM_GREEN_MULT * this.relativeLuminanceComponent(sg) +
      Color.RELATIVE_LUM_BLUE_MULT * this.relativeLuminanceComponent(sb);
  }

  private relativeLuminanceComponent(component: number): number {
    if (component < Color.RELATIVE_LUMINANCE_BOUND) {
      return component / Color.RELATIVE_LUM_SMALL_DIV;
    } else {
      return Math.pow(
        ((component + Color.RELATIVE_LUM_BIG_SUM) / Color.RELATIVE_LUM_BIG_DIV),
        Color.RELATIVE_LUM_BIG_EXP
      );
    }
  }

  private paddedComponent(value: number): string {
    const str = value.toString(16);
    return (str.length === 1 ? "0" : "") + str;
  }
}
