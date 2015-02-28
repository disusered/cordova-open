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

  uri = encodeURI(uri);

  if (uri.match('http')) {
    downloadAndOpen(uri, success, error);
  } else {
    exec(onSuccess.bind(this, uri, success),
         onError.bind(this, error), 'Open', 'open', [uri]);
  }
};

/**
 * downloadAndOpen
 *
 * @param {String} url File URI
 * @param {Function} success Success callback
 * @param {Function} error Failure callback
 */
function downloadAndOpen(url, success, error) {
  var ft = new FileTransfer();
  var ios = cordova.file.cacheDirectory;
  var ext = cordova.file.externalCacheDirectory;
  var dir = (ext) ?  ext : ios;
  var name = url.substring(url.lastIndexOf('/') + 1);
  var path = dir + name;

  ft.download(url, path,
      function done(entry) {
        var file = entry.toURL();
        exec(onSuccess.bind(this, file, success),
             onError.bind(this, error), 'Open', 'open', [file]);
      },
      onError.bind(this, error),
      false
  );
}

/**
 * onSuccess
 *
 * @param {String} path File URI
 * @param {Function} callback Callback
 * @return {String} File URI
 */
function onSuccess(path, callback) {
  fire('success');
  if (typeof callback === 'function') { callback(path); }
  return path;
}

/**
 * onError
 *
 * @param {Function} callback Callback
 * @return {Number} Error Code
 */
function onError(callback) {
  var code = (arguments.length > 1) ? arguments[1] : 0;
  fire('error', code);
  if (typeof callback === 'function') {
    callback(code);
  }
  return code;
}

/**
 * fire
 *
 * @param {String} event Event name
 */
function fire(event, data) {
  var channel = require('cordova/channel');
  var cordova = require('cordova');

  channel.onCordovaReady.subscribe(function() {
    cordova.fireDocumentEvent('open.' + event, {data: data});
  });
}
