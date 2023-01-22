/**
 * 生产环境的配置文件
 */
exports.test = {
    // 通过环境变量来得到数据(比起写在代码里更安全)
    a: process.env.a,
    b: process.env.b,
}