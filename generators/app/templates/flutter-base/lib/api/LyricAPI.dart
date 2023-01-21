import 'package:dio/dio.dart';

class LyricAPI {
  final Dio _dio;

  LyricAPI(this._dio);

  /// 歌曲歌词
  ///
  /// http://124.71.223.30:3000/lyric?id=1330348068 (起飞了)
  Future<dynamic> LyricList() async {
    Response res =
        await _dio.get('/lyric', queryParameters: {"id": "1330348068"});
    print(res.data);
  }
}
