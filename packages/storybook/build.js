const watch = process.argv[2] === "-w";
require("esbuild")
  .build({
    entryPoints: ["src/index.tsx"],
    outfile: "dist/index.js",
    bundle: true,
    format: "esm",
    // minify: true,
    sourcemap: true,
    external: [
      "@react-native-community/async-storage",
      "@react-native-community/blur",
      "@react-native-community/datetimepicker",
      "@react-native-community/picker",
      "@sentry/browser",
      "@sentry/react",
      "@sentry/react-native",
      "mixpanel-browser",
      "react",
      "react-app-polyfill",
      "react-date-picker",
      "react-dev-utils",
      "react-dom",
      "react-native",
      "react-native-gesture-handler",
      "react-native-haptic-feedback",
      "react-native-hyperlink",
      "react-native-modalize",
      "react-native-navigation",
      "react-native-permissions",
      "react-native-picker-select",
      "react-native-portalize",
      "react-native-svg",
      "react-router",
      "react-router-dom",
      // "victory-native",
    ],
    inject: ["./react-shim.js"],
    watch: watch
      ? {
          onRebuild(error, result) {
            if (error) {
              console.error("watch build failed:", error);
            } else {
              console.log("watch build succeeded:", result);
            }
          },
        }
      : false,
  })
  .then((result) => {
    if (watch) {
      console.log("Watching...");
    } else {
      console.log("Build complete!");
    }
  });
