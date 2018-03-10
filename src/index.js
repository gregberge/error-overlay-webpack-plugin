import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'

const overlayPath = require.resolve('./entry')

export function tapEntry(context, entry) {
  if (typeof entry === "string") {
    throw new Error("error-overlay-webpack-plugin does not support string entry")
  } else if (Array.isArray(entry)) {
    entry.unshift(overlayPath)
  } else if (typeof entry === "object") {
    Object.keys(entry).forEach((key) => {
      entry[key].unshift(overlayPath)
    })
  }
}

class ErrorOverlayPlugin {
  apply(compiler) {
    if (compiler.options.mode !== 'development') return

    compiler.hooks.entryOption.tap('TestPlugin', tapEntry);

    compiler.hooks.afterResolvers.tap('TestPlugin', ({ options }) => {
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

export default ErrorOverlayPlugin
