module.exports = function override(config, env) {
  let loaders = config.resolve;
  loaders.fallback = {
    fs: false,
    tls: false,
    net: false,
    http: require.resolve("stream-http"),
    https: false,
    zlib: require.resolve("browserify-zlib"),
    path: require.resolve("path-browserify"),
    stream: require.resolve("stream-browserify"),
    crypto: require.resolve("crypto-browserify"),
  };

  return config;
};
