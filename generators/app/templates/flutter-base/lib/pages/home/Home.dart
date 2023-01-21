import 'package:flutter/material.dart';
import 'package:flutter_project/utils/Global.dart';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List lyricList = [];

  @override
  void initState() {
    G.api.lyric.LyricList().then((value) => {print(value)});
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          ElevatedButton(
            onPressed: () {
              G.router!.navigateTo(context, '/login');
            },
            child: Text('跳转登录'),
          )
        ],
      ),
    );
  }
}
