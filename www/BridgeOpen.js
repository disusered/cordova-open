var exec = require('cordova/exec');

exports.open = function(args, success, error) {
  var argsArray = 
    (Object.prototype.toString.call(args) === '[object Array]') ? args : [args];

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
  exec(defaultSuccess, defaultError, "BridgeOpen", "open", [argsArray]); 
};
