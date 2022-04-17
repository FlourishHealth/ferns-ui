import postcssCssnext from "postcss-cssnext";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import replace from "rollup-plugin-replace";
import typescript from "rollup-plugin-typescript";
// import filesize from "rollup-plugin-filesize";
// import visualizer from "rollup-plugin-visualizer";

const breakpoints = {
  sm: "(min-width: 576px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1312px)",
};

// This will likely be needed in the future to support icons.
// const svgPath = () => ({
//   name: "svgPath",
//   load(id) {
//     if (extname(id) !== ".svg") {
//       return null;
//     }

//     const data = readFileSync(id, "utf-8");

//     return new Promise((resolve, reject) =>
//       parseString(data, (err, result) => {
//         if (err) {
//           return reject(err);
//         }

//         const path = result.svg.path[0].$.d;
//         const code = `export default '${path}';`;
//         return resolve({code});
//       })
//     );
//   },
// });

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/unifier.js",
      format: "cjs",
      name: "unified",
      exports: "named",
      globals: {
        react: "React",
        "prop-types": "PropTypes",
        classnames: "classnames",
        "classnames/bind": "classnames",
        "react-dom": "ReactDOM",
      },
      sourcemap: "inline",
    },
  ],
  external: ["react", "prop-types", "classnames/bind", "classnames", "react-dom"],
  plugins: [
    typescript({lib: ["es5", "es6", "dom", "esnext", "dom.iterable"], target: "es5"}),
    commonjs(),
    resolve(),
    postcss({
      sourceMap: true,
      writeDefinitions: true,
      // Put the CSS directly into the exported file. We might change this in the future for client
      // side performance.
      extract: false,
      plugins: [
        // Add custom media breakpoints so we can do things like "display: flex, smDisplay: none"
        // to hide an item on small displays.
        postcssCssnext({
          features: {
            customMedia: {
              extensions: breakpoints,
            },
          },
        }),
      ],
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    // This will likely be needed in the future to support icons.
    // svgPath(),
    // These are useful for debugging why the bundle is so big, but not needed for dev.
    // visualizer(),
    // filesize(),
  ],
};
