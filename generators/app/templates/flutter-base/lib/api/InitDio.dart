import 'package:dio/dio.dart';

Dio initDio() {
  /// 声明dio配置项
  BaseOptions _baseOptions = BaseOptions(
    /// 接口的基础地址
    baseUrl: 'https://neteasecloudmusicapi.js.org',
    /// 超时时间
    connectTimeout: 5000,
  );
  Dio dio = Dio(_baseOptions);
  /// 添加拦截器
  dio.interceptors.add(InterceptorsWrapper(
      onRequest: (RequestOptions options, RequestInterceptorHandler handler) {
    print('请求拦截');
    return handler.next(options);
  }, onError: (DioError e, ErrorInterceptorHandler handler) {
    print('报错');
    return handler.next(e);
  }, onResponse: (Response e, ResponseInterceptorHandler handler) {
    print('响应拦截');
    return handler.next(e);
  }));
  return dio;
}
