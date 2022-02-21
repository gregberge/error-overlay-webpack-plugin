const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware')

const chunkPathBasic = require.resolve('./entries/basic.mjs')
const chunkPathDevServer = require.resolve('./entries/devserver.mjs')

class ErrorOverlayPlugin {
  apply(compiler) {
    const className = this.constructor.name

    if (compiler.options.mode !== 'development') return

    const devServerEnabled = !!compiler.options.devServer
    const sockOptions = {}
    if (devServerEnabled) {
      // In the webpack config it's possible to override the websocket server's
      // connect URL for clients that need to connect through a proxy or other means.
      //
      // Use a webSocketURL config if present, otherwise default to the same address
      // as the devServer:
      sockOptions.sockHost =
        compiler.options.devServer.client?.webSocketURL?.hostname ||
        compiler.options.devServer.host
      sockOptions.sockPath =
        compiler.options.devServer.client?.webSocketURL?.pathname ||
        (compiler.options.devServer.webSocketServer === "object" && compiler.options.devServer.webSocketServer.options?.path) ||
        '/ws'
      sockOptions.sockPort =
        compiler.options.devServer.client?.webSocketURL?.port ||
        compiler.options.devServer.port
    }

    compiler.hooks.entryOption.tap(className, (context, entry) => {
      adjustEntry(entry, devServerEnabled, sockOptions)
    })

    compiler.hooks.afterResolvers.tap(className, ({ options }) => {
      if (devServerEnabled) {
        const originalOnBeforeSetupMiddleware =
          options.devServer.onBeforeSetupMiddleware
          options.devServer.setupMiddlewares = (middlewares, devServer) => {
          if (originalOnBeforeSetupMiddleware) {
            originalOnBeforeSetupMiddleware(devServer)
          }
          middlewares.unshift(errorOverlayMiddleware());
          return middlewares;
        }
      }
    })
  }
}

function adjustEntry(entry, enableDevServer, sockOptions) {
  if (typeof entry === 'string') {
    entry = [entry] // for anonymous single entry points
  }

  if (Array.isArray(entry)) {
    if (enableDevServer) {
      const sockHost = sockOptions.sockHost
        ? `&sockHost=${sockOptions.sockHost}`
        : ''
      const sockPath = sockOptions.sockPath
        ? `&sockPath=${sockOptions.sockPath}`
        : ''
      const sockPort = sockOptions.sockPort
        ? `&sockPort=${sockOptions.sockPort}`
        : ''
      const chunkPathDevServerWithParams = `${chunkPathDevServer}?${sockHost}${sockPath}${sockPort}`
      if (!entry.includes(chunkPathDevServerWithParams)) {
        entry.unshift(chunkPathDevServerWithParams)
      }
    }

    if (!entry.includes(chunkPathBasic)) {
      entry.unshift(chunkPathBasic)
    }
  } else {
    Object.keys(entry).forEach((entryName) => {
      entry[entryName] = adjustEntry(
        entry[entryName],
        enableDevServer,
        sockOptions,
      )
    })
  }

  return entry
}

module.exports = ErrorOverlayPlugin
