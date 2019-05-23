import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'

const chunkPathBasic = require.resolve('./entry-basic')
const chunkPathDevServer = require.resolve('./entry-devserver')

class ErrorOverlayPlugin {
  apply(compiler) {
    const className = this.constructor.name

    if (compiler.options.mode !== 'development') return

    const devServerEnabled = !!compiler.options.devServer
    const sockOptions = {}
    if (devServerEnabled) {
      sockOptions.sockHost = compiler.options.devServer.sockHost
      sockOptions.sockPath = compiler.options.devServer.sockPath
      sockOptions.sockPort = compiler.options.devServer.sockPort
    }

    compiler.hooks.entryOption.tap(className, (context, entry) => {
      adjustEntry(entry, devServerEnabled, sockOptions)
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

function adjustEntry(entry, enableDevServer, sockOptions) {
  if (typeof entry === 'string') {
    throw new Error(
      `We currently do not inject our entry code into single-file anonymous entries.
Please use a multi-main (array) or object-form \`entry\` setting for now.`,
    )
  }

  if (Array.isArray(entry)) {
    if (enableDevServer) {
      const sockHost = sockOptions.sockHost ? `&sockHost=${sockOptions.sockHost}` : ''
      const sockPath = sockOptions.sockPath ? `&sockPath=${sockOptions.sockPath}` : ''
      const sockPort = sockOptions.sockPort ? `&sockPort=${sockOptions.sockPort}` : ''
      const chunkPathDevServerWithParams = `${chunkPathDevServer}?${sockHost}${sockPath}${sockPort}`
      if (!entry.includes(chunkPathDevServerWithParams)) {
        entry.unshift(chunkPathDevServerWithParams)
      }
    }

    if (!entry.includes(chunkPathBasic)) {
      entry.unshift(chunkPathBasic)
    }
  } else {
    Object.keys(entry).forEach(entryName => {
      entry[entryName] = adjustEntry(entry[entryName], enableDevServer, sockOptions)
    })
  }

  return entry
}

module.exports = ErrorOverlayPlugin
