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
  var testInfo;

  testInfo = '<h3>Press Open File and a test file will open in a native context</h3>' +
      '<div id="open-file"></div>' +
      'Expected result: File will open in native modal.';

  contentEl.innerHTML = testInfo;

  function success() {
    console.log('Successfully opened file!');
  }

  function error(code) {
    if (code === 1) {
      console.log('No file handler found');
    } else {
      console.log('Undefined error');
    }
  }

  function downloadAndOpen(fileUrl, directory) {
    document.addEventListener('deviceready', onDeviceReady, false);
    function onDeviceReady() {
      var dir = (cordova.file.tempDirectory) ? 'tempDirectory' : 'externalCacheDirectory',
          ft = new FileTransfer(),
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
    downloadAndOpen('https://raw.githubusercontent.com/cordova-bridge/open/test/test.png');
  }, 'open-file');

  createActionButton('Open PDF', function() {
    downloadAndOpen('https://raw.githubusercontent.com/cordova-bridge/open/test/test.pdf');
  }, 'open-file');
};
