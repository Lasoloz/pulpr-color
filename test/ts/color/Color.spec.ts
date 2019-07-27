import Color from "../../../src/ts/color/Color";

describe("`Color` class", () => {
  test("should be instantiable from `#rgb` notation", () => {
    const COLOR_STR = "#aBf";
    const EXPECTED_STR = "#aabbff";
    const color = Color.fromHexString(COLOR_STR);
    expect(color.toString()).toBe(EXPECTED_STR);
  });

  test("should be instantiable from `#rrggbb` notation", () => {
    const COLOR_STR = "#0f1E9a";
    const color = Color.fromHexString(COLOR_STR);
    expect(color.toString()).toBe(COLOR_STR.toLowerCase());
  });

  test("should throw error for invalid formats", () => {
    expect(() => {
      Color.fromHexString("12345f");
    }).toThrow(Error);
    expect(() => {
      Color.fromHexString("#31fa");
    }).toThrow(Error);
    expect(() => {
      Color.fromHexString("#ghi");
    }).toThrow(Error);
  });

  describe("when instantiated", () => {
    const COLOR_STR = "#1f2";
    const COLOR_6_STR = "#11ff22";
    const RED = 0x11;
    const GREEN = 0xff;
    const BLUE = 0x22;
    let color: Color;

    beforeEach(() => {
      color = Color.fromHexString(COLOR_STR);
    });

    test("string conversion should convert back to `#rrggbb` notation", () => {
      expect(color.toString()).toBe(COLOR_6_STR);
    });

    test("red component should be available through getter", () => {
      expect(color.getRed()).toBe(RED);
    });

    test("green component should be available through getter", () => {
      expect(color.getGreen()).toBe(GREEN);
    });

    test("blue component should be available through getter", () => {
      expect(color.getBlue()).toBe(BLUE);
    });

    test("correct contrast color should be chosen when requested", () => {
      expect(color.getContrastColor()).toBe(Color.BLACK_LIKE);
    });
  });
});
