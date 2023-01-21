/**
 * 生产环境的配置文件
 */
exports.vod = {
    // 通过环境变量来得到数据(比起写在代码里更安全)
    accessKeyId: process.env.accessKeyId,
    accessKeySecret: process.env.accessKeySecret
}