var exec = require('cordova/exec');

/**
 * open
 *
 * @param {String} args File URI
 * @param {Function} success Optional success callback
 * @param {Function} error Optional error callback.
 */
exports.open = function(args, success, error) {
  if (!args || arguments.length === 0) return;

  function defaultSuccess() {
    if (typeof success === 'function') {
      success();
    }
  }

  function defaultError() {
    if (typeof error === 'function') {
      error();
    }
  }
  exec(defaultSuccess, defaultError, "BridgeOpen", "open", [args]); 
};
