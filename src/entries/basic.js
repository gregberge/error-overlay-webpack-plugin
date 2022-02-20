/* eslint-disable */
import {
  setEditorHandler,
  startReportingRuntimeErrors,
} from 'react-error-overlay'
import launchEditorEndpoint from 'react-dev-utils/launchEditorEndpoint.js'

setEditorHandler((errorLocation) => {
  // Keep this sync with errorOverlayMiddleware.js
  fetch(
    launchEditorEndpoint +
      '?fileName=' +
      window.encodeURIComponent(errorLocation.fileName) +
      '&lineNumber=' +
      window.encodeURIComponent(errorLocation.lineNumber || 1) +
      '&colNumber=' +
      window.encodeURIComponent(errorLocation.colNumber || 1),
  )
})

startReportingRuntimeErrors({})
