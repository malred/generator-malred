'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 拿到数据模型
    const User = this.app.model.User
    // 保存数据
    // await new User({
    //   userName: 'joker',
    //   password: '123'
    // }).save()
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
