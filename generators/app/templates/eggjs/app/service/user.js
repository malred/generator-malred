const Service = require('egg').Service
const jwt = require('jsonwebtoken')
class UserService extends Service {
    // 获取User的方法
    get User() {
        return this.app.model.User
    }
    /**
     * 根据用户名查找用户
     * @param {用户名} username 
     * @returns 用户实例
     */
    findByUsername(username) {
        return this.User.findOne({ username })
    }
    /**
     * 根据邮箱查找用户
     * @param {邮箱} email
     * @returns 用户实例
     */
    findByEmail(email) {
        // 除默认查到的数据,还带上password
        return this.User.findOne({ email })
            .select('+password')
    }
    /**
     * 创建用户(注册)
     * @param {*} username 
     * @param {*} email 
     * @param {*} password 
     */
    async createUser(data) {
        // 从helper里获取工具类,进行密码加盐
        data.password = this.ctx.helper.md5(data.password)
        // 接收参数,封装为user对象
        const user = new this.User(data)
        await user.save()
        return user
    }
    /**
     * 生成token
     * @param {token的数据} data 
     * @returns 
     */
    createToken(data) {
        // 参数1: 加密的数据
        // 参数2: 生成时使用的私钥
        return jwt.sign(data, this.app.config.jwt.secret, {
            // 超时时间
            expiresIn: this.app.config.jwt.expiresIn,
        })
    }
    /**
     * 验证token
     * @param {token} token 
     * @returns 
     */
    verifyToken(token) {
        // 验证token
        return jwt.verify(token, this.app.config.jwt.secret)
    }
    /**
     * 
     * @param {更新的数据} data 
     * @returns 返回更新的结果
     */
    updateUser(data) {
        // 参数1: id
        // 参数2: 更新的数据
        return this.User.findByIdAndUpdate(this.ctx.user._id, data, {
            // 默认返回更新前的数据,设置这个返回更新后的数据
            new: true,
        })
    }
    /**
     * 订阅频道
     * @param {当前用户id} userId 
     * @param {被关注的用户id} channelId 
     * @returns 被关注的用户的信息
     */
    async subscribe(userId, channelId) {
        // 获取Subscription数据模型
        const { Subscription, User } = this.app.model
        // 1,检查是否已经订阅
        const record = await Subscription.findOne({
            // 传递参数
            user: userId,
            channel: channelId
        })
        const user = await User.findById(channelId)
        // 2,没有订阅->添加订阅
        if (!record) {
            await new Subscription({
                user: userId,
                channel: channelId,
            }).save()
            // 更新用户的订阅数量
            user.subscribersCount++
            await user.save() // 更新到数据库中
        }
        // 3,返回用户信息
        return user
    }
    /**
     * 取消订阅
     * @param {当前用户id} userId 
     * @param {被取消订阅的用户id} channelId 
     * @returns 被取消订阅的用户的信息
     */
    async unsubscribe(userId, channelId) {
        // 获取Subscription数据模型
        const { Subscription, User } = this.app.model
        // 1,检查是否已经订阅
        const record = await Subscription.findOne({
            // 传递参数
            user: userId,
            channel: channelId
        })
        const user = await User.findById(channelId)
        // 2,没有订阅->添加订阅
        if (record) {
            await record.remove() // 删除订阅记录
            // 更新用户的订阅数量
            user.subscribersCount--
            await user.save() // 更新到数据库中
        }
        // 3,返回用户信息
        return user
    }
}
module.exports = UserService