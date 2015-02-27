/**
 * @title Open - cordova.plugins.bridge.open
 * @overview Open documents with compatible apps.
 * @copyright © 2015 cordova-bridge
 * @license GPLv2
 * @author Carlos Antonio
*/

var exec = require('cordova/exec');

/**
 * open
 *
 * @param {String} args File URI
 * @param {Function} success Success callback
 * @param {Function} error Failure callback
 */
exports.open = function(uri, success, error) {
  if (!uri || arguments.length === 0) { return false; }

  function onSuccess(path) {
    fire('success');
    if (typeof success === 'function') { success(path); }
    return path;
  }

  function onError(code) {
    fire('error');
    code = code || 0;
    if (typeof error === 'function') { error(code); }
    return code;
  }

  uri = encodeURI(uri);

  if (uri.match('http')) {
    downloadAndOpen(uri);
  } else {
    exec(onSuccess.bind(this, uri), onError, 'Open', 'open', [uri]);
  }
};

/**
 * downloadAndOpen
 *
 * @param {String} url File URI
 */
function downloadAndOpen(url) {
  var ft = new FileTransfer();
  var ios = cordova.file.cacheDirectory;
  var ext = cordova.file.externalCacheDirectory;
  var dir = (ext) ?  ext : ios;
  var name = url.substring(url.lastIndexOf('/') + 1);
  var path = dir + name;

  ft.download(url, path,
      function done(entry) {
        var file = entry.toURL();
        exec(onSuccess.bind(this, file), onError, 'Open', 'open', [file]);
      },
      onError,
      false
  );
}

/**
 * fire
 *
 * @param {String} event Event name
 */
function fire(event) {
  var channel = require('cordova/channel');
  var cordova = require('cordova');

  channel.onCordovaReady.subscribe(function() {
    cordova.fireDocumentEvent('open.' + event);
  });
}
