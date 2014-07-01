/**
 * @author Carlos Antonio
 * @version 0.2.0
*/
package com.bridge;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.net.Uri;
import android.content.Intent;
import android.content.Context;
import android.webkit.MimeTypeMap;
import android.content.ActivityNotFoundException;

/**
 * This class echoes a string called from JavaScript.
 */
public class Open extends CordovaPlugin {

  public static final String OPEN_ACTION = "open";

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if (action.equals(OPEN_ACTION)) {
      String url = args.getString(0);
      this.chooseIntent(url, callbackContext);
      return true;
    }
    return false;
  }

  /**
   * Returns the MIME type of the file.
   *
   * @param url
   * @return
   */
  private static String getMimeType(String url) {
    String mimeType = null;

    String extension = MimeTypeMap.getFileExtensionFromUrl(url);
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
   * @param url
   * @param callbackContext
   */
  private void chooseIntent(String url, CallbackContext callbackContext) {
    if (url != null && url.length() > 0) {
      // callbackContext.success("Successfully opened file.");
    } else {
      // callbackContext.error("Expected one non-empty string argument.");
    }
  }
}
