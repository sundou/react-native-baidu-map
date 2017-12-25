import {
  requireNativeComponent,
  NativeModules,
  Platform,
  DeviceEventEmitter
} from 'react-native';

import React, {
  Component,
  PropTypes
} from 'react';


const _module = NativeModules.BaiduTraceModule;

export default {
  beginTrace(serviceId, entityName, gatherInterval, packInterval, keepAlive) {
    if (Platform.OS == 'ios') {
      return new Promise((resolve, reject) => {
        try {
          // AK mcode entityName serviceID keepAlive
          _module.beginTraceWithAK(serviceId, entityName, gatherInterval, packInterval, keepAlive);
        }
        catch (e) {
          reject(e);
          return;
        }
        DeviceEventEmitter.once('onBeginTrace', resp => {
          resolve(resp);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        try {
          _module.beginTrace(serviceId, entityName, gatherInterval, packInterval);
        }
        catch (e) {
          reject(e);
          return;
        }
        DeviceEventEmitter.once('onBeginTrace', resp => {
          resolve(resp);
        });
      });
    }

  },

  stopTrace() {
    // if (Platform.OS == 'ios') {

    // }
    return new Promise((resolve, reject) => {
      try {
        _module.stopTrace();
      }
      catch (e) {
        reject(e);
        return;
      }
      DeviceEventEmitter.once('onStopTrace', resp => {
        resolve(resp);
      });
    });
  }
};
