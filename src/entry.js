/* eslint-disable */
import {
  setEditorHandler,
  startReportingRuntimeErrors,
  dismissBuildError,
} from 'react-error-overlay'
import launchEditorEndpoint from 'react-dev-utils/launchEditorEndpoint'

setEditorHandler(errorLocation => {
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

startReportingRuntimeErrors({
  onError: function() {
    module.hot.addStatusHandler(status => {
      if (status === 'apply') {
        window.location.reload()
      }
    })
  },
})
