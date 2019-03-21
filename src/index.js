import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'

const chunkPathBasic = require.resolve('./entry-basic')
const chunkPathDevServer = require.resolve('./entry-devserver')

class ErrorOverlayPlugin {
  apply(compiler) {
    const className = this.constructor.name

    if (compiler.options.mode !== 'development') return

    const devServerEnabled = !!compiler.options.devServer

    compiler.hooks.entryOption.tap(className, (context, entry) => {
      adjustEntry(entry, devServerEnabled)
    })

    compiler.hooks.afterResolvers.tap(className, ({ options }) => {
      if (devServerEnabled) {
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

function adjustEntry(entry, enableDevServer) {
  if (typeof entry === 'string') {
    throw new Error(
      `We currently do not inject our entry code into single-file anonymous entries.
Please use a multi-main (array) or object-form \`entry\` setting for now.`,
    )
  }

  if (Array.isArray(entry)) {
    if (enableDevServer) {
      if (!entry.includes(chunkPathDevServer)) {
        entry.unshift(chunkPathDevServer)
      }
    }

    if (!entry.includes(chunkPathBasic)) {
      entry.unshift(chunkPathBasic)
    }
  } else {
    Object.keys(entry).forEach(entryName => {
      entry[entryName] = adjustEntry(entry[entryName], enableDevServer)
    })
  }

  return entry
}

module.exports = ErrorOverlayPlugin
