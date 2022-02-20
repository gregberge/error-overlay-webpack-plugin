/* global __resourceQuery */

import querystring from 'querystring'
import SockJS from 'sockjs-client'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages.js'
import { reportBuildError, dismissBuildError } from 'react-error-overlay'

let sockOptions = {}
if (typeof __resourceQuery === 'string' && __resourceQuery) {
  sockOptions = querystring.parse(__resourceQuery.substr(1))
}

const connection = new SockJS(
  `${window.location.protocol}//${
    sockOptions.sockHost || window.location.hostname
  }:${sockOptions.sockPort || window.location.port}${
    sockOptions.sockPath || '/sockjs-node'
  }`,
)

connection.onmessage = function onmessage(e) {
  const { type, data } = JSON.parse(e.data)
  let formatted
  switch (type) {
    case 'ok':
      dismissBuildError()
      break
    case 'errors':
      formatted = formatWebpackMessages({
        errors: data,
        warnings: [],
      })
      reportBuildError(formatted.errors[0])
      break
    default:
    // Do nothing.
  }
}
