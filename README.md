open
====

[![Circle CI](https://circleci.com/gh/disusered/cordova-open.svg?style=shield&circle-token=6bd6b31455ee9ce4602f9b1ed980c872b10d7507)](https://circleci.com/gh/disusered/cordova-open)

Open audio, video, images and more with applications installed on the user's device

<img src="https://raw.githubusercontent.com/disusered/cordova-open/docs/open.png" width="300px" />

## Install

```bash
$ cordova plugin add com.bridge.open
```

## Usage

The plugin exposes the following methods:

```javascript
cordova.plugins.bridge.open(file, success, error)
```

#### Parameters:
* __file:__ A string representing a URI
* __success:__ Optional success callback
* __error:__ Optional error callback

#### Events:
* __pause:__ Opening files emits Cordova's pause event
* __resume:__ Closing the file emits Cordova's resume event
* __open.success:__ File is found and can be opened
* __open.error:__ File not found, or no file handler is installed

## Example

#### Default usage

```javascript
// with a file uri
cordova.plugins.bridge.open('file:/storage/sdcard/dcim/camera/1404177327783.jpg');

// with a remote url
cordova.plugins.bridge.open('https://raw.githubusercontent.com/disusered/cordova-open/test/test.png');
```

#### With optional callbacks

```javascript
var open = cordova.plugins.bridge.open;

function success() {
  console.log('Success');
}

function error(code) {
  if (code === 1) {
    console.log('No file handler found');
  } else {
    console.log('Undefined error');
  }
}

open('file:/storage/sdcard/DCIM/Camera/1404177327783.jpg', success, error);
```
