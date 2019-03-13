/* eslint-disable */
import url from 'url';
import SockJS from 'sockjs-client';
import {
  setEditorHandler,
  reportBuildError,
  startReportingRuntimeErrors,
} from 'react-error-overlay'
import launchEditorEndpoint from 'react-dev-utils/launchEditorEndpoint'
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';



const connection = new SockJS(
  url.format({
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: window.location.port,
    // Hardcoded in WebpackDevServer
    pathname: '/sockjs-node',
  })
);


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
  onError() {
    if (module.hot) {
      module.hot.addStatusHandler(status => {
        if (status === 'apply') {
          window.location.reload()
        }
      })
    }
  },
})

connection.onmessage = function(e) {
  const {type, data} = JSON.parse(e.data);
  switch (type) {
    case 'errors':
      const {errors} = formatWebpackMessages({
        errors: data,
        warnings: [],
      });
      reportBuildError(errors[0]);
      break;
    default:
    // Do nothing.
  }
};
