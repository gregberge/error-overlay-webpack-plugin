import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'

class ErrorOverlayPlugin {
  apply(compiler) {
    const className = this.constructor.name

    if (compiler.options.mode !== 'development') return

    compiler.hooks.entryOption.tap(className, (context, entry) => {
      const chunkPath = require.resolve('./entry')
      adjustEntry(entry, chunkPath)
    })

    compiler.hooks.afterResolvers.tap(className, ({ options }) => {
      if (options.devServer) {
        const originalBefore = options.devServer.before
        options.devServer.before = (app, server) => {
          if (originalBefore) {
            originalBefore(app, server)
          }
          app.use(errorOverlayMiddleware())
        }
      }
    })
  }
}

function adjustEntry(entry, chunkPath) {
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
    Object.keys(entry).forEach(entryName => {
      entry[entryName] = adjustEntry(entry[entryName], chunkPath)
    })
  }

  return entry
}

module.exports = ErrorOverlayPlugin
