
const loaderUtils = require('loader-utils')

module.exports = function(source) {
  console.log('loader a running')
  const url = loaderUtils.interpolateName(this, '[name].[ext]', source);

  console.log(url);
  // https://webpack.js.org/api/loaders/#thisemitfile
  this.emitFile(url, source);
  return source
}