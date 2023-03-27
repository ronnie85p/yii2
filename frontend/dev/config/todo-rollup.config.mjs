// import serve from "rollup-plugin-serve";
// import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
// import { cacheBuild } from "rollup-cache";

export default {
  input: "src/todo/index.jsx",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
    sourcemap: true,
  },
  // resolve: {
  //   alias: {
  //     src: path.resolve(__dirname, "../src/"),
  //     components: path.resolve(__dirname, "../src/components"),
  //     funcs: path.resolve(__dirname, "../src/funcs"),
  //   },
  // },

  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx"],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    json(),
    // serve({
    //   open: true,
    //   verbose: true,
    //   contentBase: ["", "public"],
    // }),
    // livereload({ watch: "dist" }),
  ],
};
