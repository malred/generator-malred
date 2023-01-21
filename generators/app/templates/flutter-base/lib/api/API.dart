import 'package:dio/dio.dart';

import 'LyricAPI.dart';
import 'InitDio.dart';

class API {
  Dio? _dio;

  API() {
    _dio = initDio();
  }

  /// 测试接口(网易云获取热门话题)
  LyricAPI get lyric => LyricAPI(_dio!);
}
