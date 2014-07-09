/**
 * @title Open - cordova.plugins.bridge.open
 * @overview Open documents with compatible apps.
 * @copyright © 2014 cordova-bridge
 * @license GPLv2
 * @author Carlos Antonio
 * @version 0.1.0
*/

var exec = require('cordova/exec');

/**
 * open
 *
 * @param {String} args File URI
 * @param {Function} success Call on success
 * @param {Function} error Call on error
 */
exports.open = function(args, success, error) {
  if (!args || arguments.length === 0) return;

  function onSuccess() {
    var args = (arguments.length === 1) ? arguments[0] : arguments;
    if (typeof success === 'function') success(args);
  }

  function onError(code) {
    if (typeof error === 'function') error(code);
  }
  exec(onSuccess, onError, "Open", "open", [args]);
};
