module.exports = app => {
  const { router, controller } = app;
  // 得到auth中间件
  const auth = app.middleware.auth()
  // 路由加前缀
  router.prefix('/api/v1')
  /**
   * 用户部分
   */
  // 注册
  router
    // 用户注册
    .post('/users', controller.user.create)
    // 登录
    .post('/users/login', controller.user.login)
    // 获取用户信息 不需要登录也能用
    .get('/users/:userId', app.middleware.auth({ required: false }), controller.user.getUser)
    // 获取当前登录用户 auth配置到具体路由作为中间件
    .get('/user', auth, controller.user.getCurrentUser)
    // 更新用户数据
    .patch('/user', auth, controller.user.update) 
};  
