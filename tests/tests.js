exports.defineAutoTests = function() {
  describe('Bridge plugin (cordova.plugins.bridge)', function() {
    it('should exist', function() {
      expect(window.cordova.plugins.bridge).toBeDefined();
    });
  });

  describe('Open method (cordova.plugins.bridge.open)', function() {
    it('should exist', function() {
      expect(window.cordova.plugins.bridge.open).toBeDefined();
    });

    it('should return false if run with no arguments', function() {
      expect(window.cordova.plugins.bridge.open()).toBe(false);
    });
  });
};

exports.defineManualTests = function(contentEl, createActionButton) {
  var logMessage,
      clearLog,
      testInfo;

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

  testInfo = '<h3>Press Open File and a test file will open in a native context</h3>' +
      '<div id="open-file"></div>' +
      'Expected result: File will open in native modal.';

  contentEl.innerHTML = '<div id="info"></div>' + testInfo;

  createActionButton('Open File', function() {
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
    cordova.plugins.bridge.open('file:/storage/sdcard/Pictures/sample.pdf', success, error);
  }, 'open-file');
};
