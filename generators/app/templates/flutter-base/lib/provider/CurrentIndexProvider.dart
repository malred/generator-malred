import 'package:flutter/material.dart';

class CurrentIndexProvider with ChangeNotifier {
  int _currentIndex = 0;
  /// [currentIndex] 当前底部导航栏对应索引
  int get currentIndex => _currentIndex;

  changeIndex(int index) {
    _currentIndex = index;
    // 刷新状态
    notifyListeners();
  }
}
