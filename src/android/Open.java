/**
 * Open.java
 *
 * Copyright (C) 2014 Carlos Antonio
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 */

package com.bridge;
import java.io.File;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import android.net.Uri;
import android.content.Context;
import android.content.Intent;
import android.webkit.MimeTypeMap;
import android.content.ActivityNotFoundException;
import android.webkit.URLUtil;
import android.os.AsyncTask;
import android.webkit.CookieManager;

/**
 * This class starts an activity for an intent to view files
 */
public class Open extends CordovaPlugin {

  public static final String OPEN_ACTION = "open";

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals(OPEN_ACTION)) {
      String path = args.getString(0);
        new FileDownloadAsyncTask(path, callbackContext).execute();
      }
      return true;
  }

  /**
   * Returns the MIME type of the file.
   *
   * @param path
   * @return
   */
  private static String getMimeType(String path) {
    String mimeType = null;

    String extension = MimeTypeMap.getFileExtensionFromUrl(path);
    if (extension != null) {
      MimeTypeMap mime = MimeTypeMap.getSingleton();
      mimeType = mime.getMimeTypeFromExtension(extension);
    }

    System.out.println("Mime type: " + mimeType);

    return mimeType;
  }

  /**
   * Creates an intent for the data of mime type
   *
   * @param path
   * @param callbackContext
   */
  private void previewFile(String path, CallbackContext callbackContext) {
    if (path != null && path.length() > 0) {
      try {
        Uri uri = Uri.parse(path);
        String mime = getMimeType(path);
        Intent intent = new Intent(Intent.ACTION_VIEW);
        Context context = cordova.getActivity().getApplicationContext();

        intent.setDataAndTypeAndNormalize(uri, mime);
        context.startActivity(intent);

        callbackContext.success();
      } catch (ActivityNotFoundException e) {
        e.printStackTrace();
        callbackContext.error(e.getMessage());
      }
    } else {
      callbackContext.error(2);
    }
  }

  private class FileDownloadAsyncTask extends AsyncTask<Void, Void, File> {
    private final CallbackContext callbackContext;
    private final String url;

    public FileDownloadAsyncTask(String url, CallbackContext callbackContext) {
      super();
      this.callbackContext = callbackContext;
      this.url = url;
    }

    @Override
    protected File doInBackground(Void... arg0) {
      // File file = downloadFile(url);
      return file;
    }

    @Override
    protected void onPostExecute(File result) {
      String path = result.toString();
      previewFile(path, callbackContext);
    }
  }
}
