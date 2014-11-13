exports.defineAutoTests = function() {
  describe('Bridge plugin (window.cordova.plugins.bridge)', function() {
    it('should exist', function() {
      expect(window.cordova.plugins.bridge).toBeDefined();
    });

    it('should contain the Open plugin', function() {
      expect(window.cordova.plugins.bridge.open).toBeDefined();
    });
  });
};

exports.defineManualTests = function(contentEl, createActionButton) {
  var logMessage,
      clearLog,
      imgTestInfo;

  logMessage = function(message, color) {
      var log = document.getElementById('info'),
          logLine = document.createElement('div');
      if (color) {
        logLine.style.color = color;
      }
      logLine.innerHTML = message;
      log.appendChild(logLine);
    };

  clearLog = function() {
    var log = document.getElementById('info');
    log.innerHTML = '';
  };

  imgTestInfo = '<h3>Press Open Image and a test image will open in a native context</h3>' +
      '<div id="open_image"></div>' +
      'Expected result: Image will open in native modal.';

  contentEl.innerHTML = '<div id="info"></div>' + imgTestInfo;

  createActionButton('Open Image', function() {
    function success() {
      clearLog();
      logMessage('Success');
    }

    function error(code) {
      clearLog();
      if (code === 1) {
        logMessage('No file handler found');
      } else {
        logMessage('Undefined error');
      }
    }
    cordova.plugins.bridge.open('file:/storage/sdcard/Pictures/icon.png', success, error);
  }, 'open_image');
};
