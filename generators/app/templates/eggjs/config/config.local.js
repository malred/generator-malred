/**
 * 本地开发的配置文件
 */
const secret = require('./secret'); 
exports.vod = {
    // 从本地的config/secret.js文件获取数据
    ...secret.vod
}