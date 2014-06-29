var exec = require('cordova/exec');

/**
 * open
 *
 * @param {String} args File URI
 * @param {Function} [success] Call on success
 * @param {Function} [error] Call on error
 */
exports.open = function(args, success, error) {
  if (!args || arguments.length === 0) return;

  function defaultSuccess() {
    // invoke optional callback
    if (typeof success === 'function') success();
  }

  function defaultError() {
    // invoke optional callback
    if (typeof error === 'function') error();
  }
  exec(defaultSuccess, defaultError, "BridgeOpen", "open", [args]); 
};
