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


const _module = NativeModules.BaiduGeolocationModule;

export default {
  geocode(city, addr) {
    return new Promise((resolve, reject) => {
      try {
        _module.geocode(city, addr);
      }
      catch (e) {
        reject(e);
        return;
      }
      DeviceEventEmitter.once('onGetGeoCodeResult', resp => {
        resolve(resp);
      });
    });
  },
  reverseGeoCode(lat, lng) {
    return new Promise((resolve, reject) => {
      try {
        _module.reverseGeoCode(lat, lng);
      }
      catch (e) {
        reject(e);
        return;
      }
      DeviceEventEmitter.once('onGetReverseGeoCodeResult', resp => {
        resolve(resp);
      });
    });
  },
  reverseGeoCodeGPS(lat, lng) {
    return new Promise((resolve, reject) => {
      try {
        _module.reverseGeoCodeGPS(lat, lng);
      }
      catch (e) {
        reject(e);
        return;
      }
      DeviceEventEmitter.once('onGetReverseGeoCodeResult', resp => {
        resp.latitude = parseFloat(resp.latitude);
        resp.longitude = parseFloat(resp.longitude);
        resolve(resp);
      });
    });
  },
  getCurrentPosition() {
    if (Platform.OS == 'ios') {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          try {
            _module.reverseGeoCodeGPS(position.coords.latitude, position.coords.longitude);
          }
          catch (e) {
            reject(e);
            return;
          }
          DeviceEventEmitter.once('onGetReverseGeoCodeResult', resp => {
            resp.latitude = parseFloat(resp.latitude);
            resp.longitude = parseFloat(resp.longitude);
            resolve(resp);
          });
        }, (error) => {
          reject(error);
        }, {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        });
      });
    }
    return new Promise((resolve, reject) => {
      try {
        _module.getCurrentPosition();
      }
      catch (e) {
        reject(e);
        return;
      }
      DeviceEventEmitter.once('onGetCurrentLocationPosition', resp => {
        resolve(resp);
      });
    });
  },

  isCircleContainsPoint(clat,clng, radius, lat, lng){
    if (Platform.OS == 'ios') {

    } else {
      
      return new Promise((resolve, reject) => {
        try {
          console.log(arguments);
          _module.isCircleContainsPoint( clat,clng, radius, lat,lng);
        }
        catch (e) {
          reject(e);
          return;
        }
        DeviceEventEmitter.once('isCircleContainsPoint', resp => {
          console.log(resp);
          resolve(resp.result);
        });
      });

      // console.log(_module.isCircleContainsPoint( 121.61874973627664,29.92069732886056, 1000, 121.6188229494265,29.923283035640132));
    }
  }
};
