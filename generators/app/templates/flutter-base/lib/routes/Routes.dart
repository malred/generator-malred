// lib/routes/Routes.dart
import 'package:fluro/fluro.dart';

import 'RoutesHandler.dart';

class Routes {
  // 配置路由和处理器的映射
  static void configureRoutes(FluroRouter router) {
    router.define('/', handler: indexHandler);
    router.define('/login', handler: loginHandler);
    router.notFoundHandler = notFoundHandler;
  }
}
