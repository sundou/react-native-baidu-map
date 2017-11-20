//
//  TraceModule.h
//  ioty_app
//
//  Created by lcwl on 2017/11/9.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <BaiduTraceSDK/BTKServiceOption.h>
#import <BaiduTraceSDK/BTKAction.h>

#import "BaseModule.h"

@interface TraceModule : BaseModule <BTKTraceDelegate>

@end
