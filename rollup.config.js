import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import vue from "rollup-plugin-vue";
import uglify from "rollup-plugin-uglify";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import cssvariables from "postcss-css-variables";
import nested from "postcss-nested";
import csso from "postcss-csso";
import pkg from "./package.json";

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      name: "DebtCollectiveHeader",
      file: pkg.main,
      format: "umd",
      exports: "named"
    },
    plugins: [
      resolve(),
      commonjs(),
      vue({
        autoStyles: false
      }),
      postcss({
        inject: true,
        extract: pkg.style,
        plugins: [nested(), autoprefixer(), csso(), cssvariables()]
      }),
      babel({
        exclude: ["node_modules/**"],
        runtimeHelpers: true
      })
      // uglify()
    ]
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.js",
    external: ["ms"],
    output: [{ file: pkg.module, format: "es" }],
    plugins: [
      resolve(),
      commonjs(),
      postcss({
        inject: true,
        extract: false,
        plugins: [nested(), autoprefixer(), csso(), cssvariables()]
      }),
      vue({
        css: false
      }),
      babel({
        exclude: ["node_modules/**"],
        runtimeHelpers: true
      })
    ]
  }
];
