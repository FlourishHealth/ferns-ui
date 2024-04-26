const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const {resolve} = require("path");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // resolve victory-native as victory for the Web app
  config.resolve.alias["victory-native"] = "victory";

  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
  };

  config.module.rules.push({
    test: /.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
};
