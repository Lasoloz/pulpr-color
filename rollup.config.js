import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "src/ts/pulprColor.ts",
  output: {
    dir: "dist/js/",
    name: "pulprColor",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    typescript(),
    babel({ extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"] }),
    uglify()
  ]
};
