import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'

export function tapEntry(context, entry) {
  entry.unshift(require.resolve('./entry'))
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
