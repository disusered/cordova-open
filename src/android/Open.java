package com.bridge;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class Open extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("open")) {
            String path = args.getString(0);
            this.chooseIntent(path, callbackContext);
            return true;
        }
        return false;
    }

    private void chooseIntent(String path, CallbackContext callbackContext) {
        if (path != null && path.length() > 0) {
            callbackContext.success(path);
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    }
}
