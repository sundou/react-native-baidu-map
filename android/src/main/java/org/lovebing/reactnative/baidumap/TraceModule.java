package org.lovebing.reactnative.baidumap;

import android.util.Log;

import com.baidu.trace.Trace;
import com.baidu.trace.LBSTraceClient;
import com.baidu.trace.model.OnCustomAttributeListener;
import com.baidu.trace.model.OnTraceListener;
import com.baidu.trace.model.PushMessage;
import com.baidu.trace.api.track.OnTrackListener;
import com.baidu.trace.api.fence.OnFenceListener;
import com.baidu.trace.api.entity.OnEntityListener;
import com.baidu.trace.api.analysis.OnAnalysisListener;
import com.baidu.trace.api.bos.OnBosListener;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;



/**
 * Created by apple on 2017/7/13.
 */
public class TraceModule extends BaseModule {

    public TraceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    public String getName() {
        return "BaiduTraceModule";
    }

    private Trace mTrace = null;

    private LBSTraceClient mTraceClient = null;

    private OnTraceListener mTraceListener = null;

    @ReactMethod
    public void beginTrace(String serviceId, String entityName, int gatherInterval, int packInterval) {

//        Log.i("TraceInit", "Call Function succeed");

//        WritableMap params = Arguments.createMap();
//        params.putString("init", "succeed");
//
//        sendEvent("onGetReverseGeoCodeResult", params);

        // 轨迹服务ID
//        long serviceId = 145808;
//        // 设备标识
//        String entityName = "myTrace";

        // 是否需要对象存储服务，默认为：false，关闭对象存储服务。注：鹰眼 Android SDK v3.0以上版本支持随轨迹上传图像等对象数据，若需使用此功能，该参数需设为 true，且需导入bos-android-sdk-1.0.2.jar。
        boolean isNeedObjectStorage = false;
        // 初始化轨迹服务
//        Trace mTrace = new Trace(serviceId, entityName, isNeedObjectStorage);
        long ID = Long.parseLong(serviceId);
        mTrace = new Trace(ID, entityName, isNeedObjectStorage);
        // 初始化轨迹服务客户端
//        LBSTraceClient mTraceClient = new LBSTraceClient(getReactApplicationContext());
        mTraceClient = new LBSTraceClient(getReactApplicationContext());

        // 定位周期(单位:秒)
        // int gatherInterval = 5;
        // 打包回传周期(单位:秒)
        // int packInterval = 10;
        // 设置定位和打包周期
        mTraceClient.setInterval(gatherInterval, packInterval);

        // 初始化轨迹服务监听器
//        OnTraceListener mTraceListener = new OnTraceListener() {

        mTraceListener = new OnTraceListener() {
            // 开启服务回调
            @Override
            public void onStartTraceCallback(int status, String message) {
                Log.i("onStartTraceCallback", "Call Function succeed");

                mTraceClient.startGather(mTraceListener);
            }
            // 停止服务回调
            @Override
            public void onStopTraceCallback(int status, String message) {
                Log.i("onStopTraceCallback", "Call Function succeed");


                WritableMap params = Arguments.createMap();
                params.putString("message: ", message);
                params.putInt("status: ", status);
                sendEvent("onStopTrace", params);
            }
            // 开启采集回调
            @Override
            public void onStartGatherCallback(int status, String message) {
                Log.i("onStartGatherCallback", "Call Function succeed");


                WritableMap params = Arguments.createMap();
                params.putString("message: ", message);
                params.putInt("status: ", status);
                sendEvent("onBeginTrace", params);
            }
            // 停止采集回调
            @Override
            public void onStopGatherCallback(int status, String message) {
                Log.i("onStopGatherCallback", "Call Function succeed");
            }
            @Override
            public void onPushCallback(byte messageNo, PushMessage message) {
            }
            @Override
            public void onBindServiceCallback(int errorNo, String message) {
                Log.i("onBindServiceCallback", "Call Function succeed");
            }
        };

        mTraceClient.startTrace(mTrace, mTraceListener);
    }

    @ReactMethod
    public void stopTrace() {
        mTraceClient.stopTrace(mTrace, mTraceListener);
    }


}
