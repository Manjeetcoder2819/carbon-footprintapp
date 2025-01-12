module.exports = {
  // other webpack configurations like entry, output, etc.
  
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      crypto: require.resolve('crypto-browserify'),
      fs: false,
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url'),
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      buffer: require.resolve('buffer/'),
      os: require.resolve('os-browserify/browser'),
      http: require.resolve('stream-http'),
      net: false
    }
  }
};
