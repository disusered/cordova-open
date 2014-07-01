#import <Foundation/Foundation.h>
#import <QuickLook/QuickLook.h>

#import <Cordova/CDV.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>

@interface Open : CDVPlugin <QLPreviewControllerDelegate, QLPreviewControllerDataSource, QLPreviewItem>

@property (strong, nonatomic) NSURL* url;
@property (readonly) NSURL* item;

@end
