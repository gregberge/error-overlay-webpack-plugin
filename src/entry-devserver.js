import url from 'url';
import SockJS from 'sockjs-client';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import {
  reportBuildError,
} from 'react-error-overlay'

const connection = new SockJS(
  url.format({
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: window.location.port,
    // Hardcoded in WebpackDevServer
    pathname: '/sockjs-node',
  })
);

connection.onmessage = function onmessage(e) {
  const {type, data} = JSON.parse(e.data);
  let formatted
  switch (type) {
    case 'errors':
      formatted = formatWebpackMessages({
        errors: data,
        warnings: [],
      });
      reportBuildError(formatted.errors[0]);
      break;
    default:
    // Do nothing.
  }
};
