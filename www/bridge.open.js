/**
 * @title Open - cordova.plugins.bridge.open
 * @overview Open documents with compatible apps.
 * @copyright © 2014 cordova-bridge
 * @license GPLv2
 * @author Carlos Antonio
 * @version 0.1.1
*/

var exec = require('cordova/exec');

/**
 * open
 *
 * @param {String} args File URI
 * @param {Function} success Success callback
 * @param {Function} error Failure callback
 */
exports.open = function(args, success, error) {
  if (!args || arguments.length === 0) return;

  function onSuccess(path) {
    if (typeof success === 'function') success(path);
    return path;
  }

  function onError(code) {
    var error = code || 0;
    if (typeof error === 'function') error(error);
    return error;
  }

  exec(onSuccess, onError, "Open", "open", [args]);
};
