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

  function downloadAndOpen(fileUrl, directory) {
    var dir = directory || 'externalCacheDirectory';
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
      var ft = new FileTransfer(),
          url = fileUrl,
          filename = url.substring(url.lastIndexOf('/') + 1),
          uri = encodeURI(url),
          path = cordova.file[dir] + filename;

      ft.download(uri, path,
          function done(entry) {
            cordova.plugins.bridge.open(entry.toURL(), success, error);
          },
          function fail(error) {
            console.log('download error', error);
          },
          false
      );
    }
  }

  createActionButton('Open Image', function() {
    downloadAndOpen('http://cordova.apache.org/images/logo_full.png');
  }, 'open-file');
};
