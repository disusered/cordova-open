open
====

[![Build Status](https://travis-ci.org/disusered/cordova-open.svg)](https://travis-ci.org/disusered/cordova-open) [![Code Climate](https://codeclimate.com/github/disusered/cordova-open/badges/gpa.svg)](https://codeclimate.com/github/disusered/cordova-open) 

Open audio, video, images and more with applications installed on the user's device.

<img src="https://raw.githubusercontent.com/disusered/cordova-open/docs/open.png" width="300px" />

## Install

```bash
$ cordova plugin add com.disusered.open
```

## Usage

The plugin exposes the following methods:

```javascript
cordova.plugins.disusered.open(file, success, error, trustAllCertificates)
```

#### Parameters:
* __file:__ A string representing a URI
* __success:__ Optional success callback
* __error:__ Optional error callback
* __trustAllCertificates:__ Optional, trusts any certificate when the connection is done over HTTPS.

#### Events:
* __pause:__ Opening files emits Cordova's pause event
* __resume:__ Closing the file emits Cordova's resume event
* __open.success:__ File is found and can be opened
* __open.error:__ File not found, or no file handler is installed

## Example

#### Default usage

```javascript
// with a file uri
cordova.plugins.disusered.open('file:/storage/sdcard/dcim/camera/1404177327783.jpg');

// with a remote url
cordova.plugins.disusered.open('https://raw.githubusercontent.com/disusered/cordova-open/test/test.png');
```

#### With optional callbacks

```javascript
var open = cordova.plugins.disusered.open;

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
