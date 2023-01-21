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
    .post('/users', controller.user.create)
    // 登录
    .post('/users/login', controller.user.login)
    // 获取用户信息 不需要登录也能用
    .get('/users/:userId', app.middleware.auth({ required: false }), controller.user.getUser)
    // 获取当前登录用户 auth配置到具体路由作为中间件
    .get('/user', auth, controller.user.getCurrentUser)
    // 更新用户数据
    .patch('/user', auth, controller.user.update)
    // 用户订阅
    .post('/users/:userId/subscribe', auth, controller.user.subscribe)
    // 取消订阅
    .delete('/users/:userId/subscribe', auth, controller.user.unsubscribe)
    // 获取用户订阅的频道列表
    .get('/users/:userId/subscriptions', controller.user.getSubscriptions)
  /**
   * 阿里云认证部分
   */
  // 阿里云 vod
  router
    .get('/vod/CreateUploadVideo', auth, controller.vod.createUploadVideo)
    // 阿里云 刷新视频上传凭证
    .get('/vod/RefreshUploadVideo', auth, controller.vod.refreshUploadVideo)
  /**
   * 视频部分 
   */
  router
    // 创建视频
    .post('/videos', auth, controller.video.createVideo)
    // 获取视频详情 不登录也能看视频
    .get('/videos/:videoId', app.middleware.auth({ required: false }), controller.video.getVideo)
    // 获取视频列表
    .get('/videos', controller.video.getVideos)
    // 获取用户发布的视频列表
    .get('/users/:userId/videos', controller.video.getUserVideos)
    // 获取用户关注的频道列表
    .get('/user/videos/feed', auth, controller.video.getUserFeedVideos)
    // 修改视频
    .patch('/videos/:videoId', auth, controller.video.updateVideo)
    // 删除视频
    .delete('/videos/:videoId', auth, controller.video.deleteVideo)
    // 添加视频评论
    .post('/videos/:videoId/comments', auth, controller.video.createComment)
    // 获取视频评论列表
    .get('/videos/:videoId/comments', controller.video.getVideoComments)
    // 删除视频评论
    .delete('/videos/:videoId/comments/:commentId', auth, controller.video.deleteVideoComments)
    // 喜欢视频
    .post('/videos/:videoId/like', auth, controller.video.likeVideo)
    // 不喜欢视频
    .post('/videos/:videoId/dislike', auth, controller.video.dislikeVideo)
    // 获取用户喜欢的视频列表
    .get('/user/videos/liked', auth, controller.video.getUserLikedVideos)
};  
