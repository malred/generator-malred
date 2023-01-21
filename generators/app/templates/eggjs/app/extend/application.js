/**
 * 扩展eggjs 应用实例application
 */
var RPCClient = require('@alicloud/pop-core').RPCClient;
/**
 * 从阿里云copy的获取点播服务的代码
 * @param {*} accessKeyId 
 * @param {*} accessKeySecret 
 * @returns 
 */
function initVodClient(accessKeyId, accessKeySecret) {
    var regionId = 'cn-shanghai';   // 点播服务接入地域
    var client = new RPCClient({//填入AccessKey信息
        accessKeyId: accessKeyId,
        accessKeySecret: accessKeySecret,
        endpoint: 'http://vod.' + regionId + '.aliyuncs.com',
        apiVersion: '2017-03-21'
    });

    return client;
}
// 默认为空,用到才返回
let vodClient = null
module.exports = {
    get vodClient() { 
        if (!vodClient) {
            // 从配置文件获取key
            const { accessKeyId, accessKeySecret } = this.config.vod 
            vodClient = initVodClient(accessKeyId, accessKeySecret)
        }
        return vodClient
    }
}