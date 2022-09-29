const webpack = require("webpack")

module.exports = function override(config, env) {
  let loaders = config.resolve;
  loaders.fallback = {
    ...config.resolve.fallback,
    fs: false,
    tls: false,
    net: false,
    http: require.resolve("stream-http"),
    https: false,
    buffer: require.resolve("buffer"),
    zlib: require.resolve("browserify-zlib"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
  };

  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
    }),
  ]

  return config;
};
