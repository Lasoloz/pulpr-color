import { isColorStr } from "../../../../src/ts/color/themeUtils";

describe("`isColorStr` function", () => {
  it.each`
    colorStr     | correctness
    ${"#abf"}    | ${true}
    ${"#ACF"}    | ${true}
    ${"#019"}    | ${true}
    ${"#g0h"}    | ${false}
    ${"#00ac56"} | ${true}
    ${"#0fgzza"} | ${false}
    ${"0f45ac"}  | ${false}
  `("should return $correctness when `$colorStr` is provided", ({ colorStr, correctness }) => {
    expect(isColorStr(colorStr)).toBe(correctness);
  });
});
