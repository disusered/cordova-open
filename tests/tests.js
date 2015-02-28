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

  testInfo = '<h3>Press Open File and a test file will open in a ' +
    'native context</h3><div id="open-file"></div>' +
    'Expected result: File will open in native modal.';

  contentEl.innerHTML = testInfo;

  function success() {
    console.log('Successfully opened file!');
    removeEventListeners();
  }

  function error(code) {
    if (code.error === 1 || code === 1) {
      console.log('No file handler found');
    } else {
      console.log('Undefined error');
    }
    removeEventListeners();
  }

  function addEventListeners() {
    document.addEventListener('open.success', success, false);
    document.addEventListener('open.error', error, false);
  }

  function removeEventListeners() {
    document.removeEventListener('open.success', success, false);
    document.removeEventListener('open.error', error, false);
  }

  createActionButton('Success Events', function() {
    addEventListeners();
    cordova.plugins.bridge.open(
      'https://raw.githubusercontent.com/disusered/cordova-open/test/test.png');
  }, 'open-file');

  createActionButton('Error events', function() {
    addEventListeners();
    cordova.plugins.bridge.open(
      'https://raw.githubusercontent.com/disusered/cordova-open/test/test.xyz');
  }, 'open-file');

  createActionButton('Open Image', function() {
    cordova.plugins.bridge.open(
      'https://raw.githubusercontent.com/disusered/cordova-open/test/test.png',
      success, error);
  }, 'open-file');

  createActionButton('Open PDF', function() {
    cordova.plugins.bridge.open(
      'https://raw.githubusercontent.com/disusered/cordova-open/test/test.pdf',
      success, error);
  }, 'open-file');
};
