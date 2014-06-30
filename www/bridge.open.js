/**
 * @title Open - cordova.plugins.bridge.open
 * @overview Open documents with compatible apps.
 * @copyright © 2014 cordova-bridge
 * @license GPLv2
 * @author Carlos Antonio
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
    // invoke optional callback
    if (typeof success === 'function') success();
  }

  function onError() {
    // invoke optional callback
    if (typeof error === 'function') error();
  }
  exec(onSuccess, onError, "Open", "open", [args]);
};
