/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_	';

  // add your middleware config here
  config.middleware = [
    // _ 对应 驼峰
    'errorHandler',
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 配置mongoose
  config.mongoose = {
    client: {
      // 连接数据库
      url: 'mongodb://127.0.0.1/<%= projname %>',
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      plugins: []
    }
  } 
  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['*'],//允许访问接口的白名单，例如：http://localhost:8080 *表示均可访问
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // jwt配置
  config.jwt = {
    // 生成jwt时使用的私钥
    secret: '1c2b31a6-cbe1-4149-91ac-03fa6b4e96ba',
    // 超时时间: 1d -> 一天
    expiresIn: '1d'
  }
  return {
    ...config,
    ...userConfig,
  };
};
