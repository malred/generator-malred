/**
 * 扩展eggjs 应用实例application
 */
let xxxClient=null;
module.exports = {
    get xxxClient() {
        if (!xxxClient) {
            // 从配置文件获取
            const { a, b } = this.config.test
            // 使用配置文件的信息进行操作
            xxxClient=null
        }
        return xxxClient
    }
}
