import 'package:flutter/material.dart';

class Study extends StatefulWidget {
  const Study({Key? key}) : super(key: key);

  @override
  State<Study> createState() => _StudyState();
}

class _StudyState extends State<Study> {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('学习'),
    );
  }
}
