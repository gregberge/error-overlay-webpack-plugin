import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import { DynamicEntryPlugin, Compiler } from 'webpack'
import 'webpack-dev-server'
import { SocketOptions } from './SocketOptions'

const chunkPathBasic = require.resolve('./entries/basic')
const chunkPathDevServer = require.resolve('./entries/devserver')

export default class ErrorOverlayPlugin extends DynamicEntryPlugin {
  apply(compiler: Compiler) {
    const className = this.constructor.name

    if (compiler.options.mode !== 'development') return

    const devServerEnabled = !!compiler.options.devServer
    const sockOptions: SocketOptions = {}
    if (devServerEnabled) {
      sockOptions.sockHost = compiler.options.devServer!.sockHost
      sockOptions.sockPath = compiler.options.devServer!.sockPath
      sockOptions.sockPort = compiler.options.devServer!.sockPort
    }

    compiler.hooks.entryOption.tap(className, (context, entry): boolean => {
      adjustEntry(entry, devServerEnabled, sockOptions)
      return false
    })

    compiler.hooks.afterResolvers.tap(className, ({ options }) => {
      if (devServerEnabled) {
        const originalBefore = options.devServer!.before
        options.devServer!.before = (app, server) => {
          if (originalBefore) {
            originalBefore(app, server, compiler)
          }
          app.use(errorOverlayMiddleware())
        }
      }
    })
  }
}

type Await<T> = T extends PromiseLike<infer U> ? U : T
type EntryStaticNormalized = Await<ReturnType<DynamicEntryPlugin['entry']>>

function adjustEntry(
  entry: string | string[] | EntryStaticNormalized | (() => unknown),
  enableDevServer: boolean,
  sockOptions: SocketOptions,
): Exclude<typeof entry, string> {
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
