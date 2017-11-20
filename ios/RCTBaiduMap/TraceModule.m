//
//  TraceModule.m
//  ioty_app
//
//  Created by lcwl on 2017/11/9.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "TraceModule.h"
#import "YYServiceManager.h"

@implementation TraceModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(BaiduTraceModule);
 
RCT_EXPORT_METHOD(beginTraceWithAK:(NSString *)AK mcode:(NSString *)mcode entityName:(NSString *)entityName serviceID:(NSUInteger)serviceID keepAlive:(BOOL)keepAlive){
    BTKServiceOption *sop = [[BTKServiceOption alloc] initWithAK:AK mcode:mcode serviceID:serviceID keepAlive:keepAlive];
    [[BTKAction sharedInstance] initInfo:sop];
    // 开始服务
    BTKStartServiceOption *op = [[BTKStartServiceOption alloc] initWithEntityName:entityName];
    [[YYServiceManager defaultManager] startServiceWithOption:op];
    [[YYServiceManager defaultManager] startGather];
}

RCT_EXPORT_METHOD(stopTrace) {
  // 停止采集
  [[YYServiceManager defaultManager] stopGather];
  // 停止服务
  [[YYServiceManager defaultManager] stopService];
}


@end
