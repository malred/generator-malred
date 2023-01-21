// lib/routes/RoutesHandler.dart
import 'package:fluro/fluro.dart';
import 'package:flutter/material.dart';
import '../pages/notfound/notFound.dart';
import '../pages/index.dart';
import '../pages/user/Login.dart';

// 首页
var indexHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> params) {
  return Index();
});
// 登录页
var loginHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> params) {
  return Login();
});
// 404页
var notFoundHandler = Handler(
    handlerFunc: (BuildContext context, Map<String, List<String>> params) {
  return NotFound();
});
