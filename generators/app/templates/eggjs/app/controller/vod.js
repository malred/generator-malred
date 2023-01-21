const Controller = require('egg').Controller
class VodController extends Controller {
    /**
     * 获取视频上传地址和凭证
     */
    async createUploadVideo() {
        // 获取请求参数
        const query = this.ctx.query
        // 校验
        this.ctx.validate({
            Title: { type: 'string' },
            FileName: { type: 'string' },
        }, query)
        this.ctx.body = await this.app.vodClient.request(
            "CreateUploadVideo",
            query, {}
        )
    }
    /**
     * 更新视频上传凭证
     */
    async refreshUploadVideo() {
        // 获取请求参数
        const query = this.ctx.query
        // 校验
        this.ctx.validate({
            videoId: { type: 'string' },
        }, query)
        this.ctx.body = await this.app.vodClient.request(
            "RefreshUploadVideo",
            query, {}
        )
    }
}
module.exports = VodController