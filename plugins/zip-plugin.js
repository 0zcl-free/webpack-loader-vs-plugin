const JSZip = require('jszip')
const path = require('path')
const RawSource = require('webpack-sources').RawSource
const zip = new JSZip()

module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      console.log('options', this.options, compilation.assets)
      const folder = zip.folder(this.options.filename)
      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source()
        folder.file(filename, source)
      }

      zip.generateAsync({
        type: 'nodebuffer'
      }).then(content => {
        console.log('content', content)
        const outputPath = path.join(compilation.options.output.path, this.options.filename + '.zip')
        console.log('outputPath', outputPath)
        const outputRelativePath = path.relative(
          compilation.options.output.path,
          outputPath
        )
        console.log('outputRelativePath', outputRelativePath)
        compilation.assets[outputRelativePath] = new RawSource(content)
        
        callback()
      })

    })
  }
}