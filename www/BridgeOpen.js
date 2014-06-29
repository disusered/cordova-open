var exec = require('cordova/exec');

/**
 * open
 * Open documents with compatible apps
 *
 * @param {String} args File URI
 * @param {Function} [success] Call on success
 * @param {Function} [error] Call on error
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
  exec(onSuccess, onError, "BridgeOpen", "open", [args]);
};
