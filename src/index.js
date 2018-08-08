import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'

class ErrorOverlayPlugin {
  apply(compiler) {
    const className = this.constructor.name

    if (compiler.options.mode !== 'development') return

    compiler.hooks.entryOption.tap(className, (context, entry) => {
      compiler.hooks.compilation.tap(compilation => {
        const chunkPath = require.resolve('./entry')
        adjustEntry(entry, chunkPath, compilation)
      })
    })

    compiler.hooks.afterResolvers.tap(className, ({ options }) => {
      if (options.devServer) {
        const originalBefore = options.devServer.before
        options.devServer.before = app => {
          if (originalBefore) {
            originalBefore(app)
          }
          app.use(errorOverlayMiddleware())
        }
      }
    })
  }
}

function adjustEntry(entry, chunkPath, compilation) {
  if (typeof entry === 'string') {
    throw new Error(
      `We currently do not inject our entry code into single-file anonymous entries.
Please use a multi-main (array) or object-form \`entry\` setting for now.`,
    )
  }

  if (Array.isArray(entry)) {
    if (!entry.includes(chunkPath)) {
      entry.unshift(chunkPath)
    }
  } else {
    const className = ErrorOverlayPlugin.constructor.name
    compilation.warnings.push(
      new Error(
        `${className}: When using entry as object-form the error overlay will not show errors that occur before it loads`,
      ),
    )
    entry.errorOverlay = chunkPath
  }

  return entry
}

module.exports = ErrorOverlayPlugin
