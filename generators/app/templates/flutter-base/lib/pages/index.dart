import 'package:flutter/material.dart';
import 'package:flutter_project/provider/CurrentIndexProvider.dart';
import 'package:provider/provider.dart';

import 'home/Home.dart';
import 'mine/Mine.dart';
import 'study/Study.dart';

class Index extends StatefulWidget {
  const Index({Key? key}) : super(key: key);

  @override
  State<Index> createState() => _IndexState();
}

class _IndexState extends State<Index> {
  final List<BottomNavigationBarItem> bottomNavitems = [
    BottomNavigationBarItem(
      label: '首页',
      icon: Icon(Icons.home),
      backgroundColor: Colors.blue,
    ),
    BottomNavigationBarItem(
      label: '学习',
      icon: Icon(Icons.school),
      backgroundColor: Colors.green,
    ),
    BottomNavigationBarItem(
      label: '我的',
      icon: Icon(Icons.person),
      backgroundColor: Colors.pink,
    ),
  ];
  final List pages = [
    {
      "appBar": AppBar(
        title: Text('首页'),
        centerTitle: true,
        elevation: 0,
      ),
      "page": Home(),
    },
    {
      "appBar": AppBar(
        title: Text('学习中心'),
        centerTitle: true,
        elevation: 0,
      ),
      "page": Study(),
    },
    {
      "appBar": AppBar(
        title: Text('个人中心'),
        centerTitle: true,
        elevation: 0,
      ),
      "page": Mine(),
    },
  ];

  // int currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    /// 从provider里获取状态(监听模式可以实时更新组件,非监听模式则不会,性能好一点)
    // int currentIndex = Provider.of<CurrentIndexProvider>(context).currentIndex;
    int currentIndex = context.watch<CurrentIndexProvider>().currentIndex;
    return Scaffold(
      appBar: pages[currentIndex]['appBar'],
      bottomNavigationBar: BottomNavigationBar(
        items: bottomNavitems,
        currentIndex: currentIndex,
        selectedItemColor: Colors.black87,
        // 点击后弹出下方文字,背景颜色也改变
        type: BottomNavigationBarType.shifting,
        onTap: (index) {
          // setState(() {
          //   currentIndex = index;
          // });
          // 修改provider里的状态
          // Provider.of<CurrentIndexProvider>(context,listen: false).changeIndex(index);
          context.read<CurrentIndexProvider>().changeIndex(index);
        },
      ),
      body: pages[currentIndex]['page'],
    );
  }
}
