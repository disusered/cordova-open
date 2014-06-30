/********* Open.m Cordova Plugin Implementation *******/

#import <Cordova/CDV.h>

@interface Open : CDVPlugin {
  // Member variables go here.
}

- (void)open:(CDVInvokedUrlCommand*)command;
@end

@implementation Open

- (void)open:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSString* path = [command.arguments objectAtIndex:0];

    if (path != nil && [path length] > 0) {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:path];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

@end
