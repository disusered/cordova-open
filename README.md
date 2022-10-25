# cordova-open

[![Build Status](https://travis-ci.org/disusered/cordova-open.svg)](https://travis-ci.org/disusered/cordova-open) [![Code Climate](https://codeclimate.com/github/disusered/cordova-open/badges/gpa.svg)](https://codeclimate.com/github/disusered/cordova-open)

> Open audio, video, images and more with applications installed on the user's device.

<img src="https://raw.githubusercontent.com/disusered/cordova-open/docs/open.png" width="300px" />

## Install

This version or the Cordova Open Plugin must be installed from the Github Repo listed below.

```bash
$ cordova plugin add https://github.com/remoorejr/cordova-open.git
```

## Features

- This version uses the newer AndroidX libraries for compatibility with the latest versions of Android.

## Usage

```javascript
var open = cordova.plugins.disusered.open;

function success() {
  console.log("Success");
}

function error(code) {
  if (code === 1) {
    console.log("No file handler found");
  } else {
    console.log("Undefined error");
  }
}

function progress(progressEvent) {
  if (progressEvent.lengthComputable) {
    var perc = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
    // update UI with status, for example:
    // statusDom.innerHTML = perc + "% loaded...";
  } else {
    // download does not offer a length... just show dots
    /*
       if(statusDom.innerHTML == "") {
       statusDom.innerHTML = "Loading";
       } else {
       statusDom.innerHTML += ".";
       }
     */
  }
}

open(
  "file:/storage/sdcard/DCIM/Camera/1404177327783.jpg",
  success,
  error,
  progress
);
```

## API

The plugin exposes the following methods:

```javascript
cordova.plugins.disusered.open(
  file,
  success,
  error,
  progress,
  trustAllCertificates
);
```

#### Parameters:

- **file:** A string representing a URI
- **success:** Optional success callback
- **error:** Optional error callback
- **progress:** Optional progress callback
- **trustAllCertificates:** Optional, trusts any certificate when the connection is done over HTTPS.

#### Events:

- **pause:** Opening files emits Cordova's pause event (Android only)
- **resume:** Closing the file emits Cordova's resume event
- **open.success:** File is found and can be opened
- **open.error:** File not found, or no file handler is installed

## License

MIT © [Carlos Rosquillas](http://carlosanton.io)
