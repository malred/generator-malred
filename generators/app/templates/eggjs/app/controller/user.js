const { Controller } = require('egg');
class UserController extends Controller {
    /**
     * 用户注册
     *  */
    async create() {
        // 请求体
        const body = this.ctx.request.body
        // 1,数据校验
        this.ctx.validate({
            // 默认是必填项
            username: { type: 'string' },
            email: { type: 'email' },
            password: { type: 'string' },
        })
        const userService = this.service.user
        // 如果查询到已经存在该用户名/邮箱的用户 
        let findByUsername = await userService.findByUsername(body.username)
        if (findByUsername !== null) {
            // 抛异常
            this.ctx.throw(422, '用户已存在' + body.username)
        }
        let findByEmail = await userService.findByEmail(body.email)
        if (findByEmail !== null) {
            // 抛异常
            this.ctx.throw(422, '邮箱已被注册')
        }
        // this.ctx.throw(422, '测试')
        // 2,保存用户
        const user = await userService.createUser(body)
        // 3,生成token
        console.log(user);
        const token = userService.createToken({
            userId: user._id,
        })
        // 4,返回响应
        this.ctx.body = {
            user: {
                email: user.email,
                token,
                username: user.username,
                channelDescription: user.channelDescription,
                avatar: user.avatar
            }
        }
    }
    /**
     * 用户登录
     */
    async login() {
        // 请求体
        const body = this.ctx.request.body
        // 1,数据校验
        this.ctx.validate({
            // 默认是必填项 
            email: { type: 'email' },
            password: { type: 'string' },
        }, body)
        // 2,校验邮箱是否存在
        const userService = this.service.user
        const user = await userService.findByEmail(body.email)
        // 如果不存在该用户
        if (!user) {
            this.ctx.throw(422, '用户不存在')
        }
        // 3,校验密码是否正确 
        if (this.ctx.helper.md5(body.password) !== user.password) {
            this.ctx.throw(422, '密码不正确')
        }
        // 4,生成token
        const token = userService.createToken({
            userId: user._id
        })
        // 5,发送响应数据
        this.ctx.body = {
            user: {
                email: user.email,
                token,
                username: user.username,
                channelDescription: user.channelDescription,
                avatar: user.avatar
            }
        }
    }
    /**
     * 获取当前登录用户
     */
    async getCurrentUser() {
        // 1,验证token
        const user = this.ctx.user
        this.ctx.body = {
            user: {
                email: user.email,
                token: this.ctx.header['authorization'],
                username: user.username,
                channelDescription: user.channelDescription,
                avatar: user.avatar
            }
        }
    }
    /**
     * 更新用户信息
     */
    async update() {
        // 1,基本数据验证
        // 请求体
        const body = this.ctx.request.body
        // 1,数据校验
        this.ctx.validate({
            // 设置为可选项
            email: { type: 'email', required: false },
            password: { type: 'string', required: false },
            username: { type: 'string', required: false },
            channelDescription: { type: 'string', required: false },
            avatar: { type: 'string', required: false },
        }, body)
        const userService = this.service.user
        // 有传入才校验,和旧数据相同的直接通过
        // 2,校验用户是否已存在
        if (body.username) {
            if (body.username !== this.ctx.user.username &&
                await userService.findByUsername(body.username)) {
                this.ctx.throw(422, '用户已存在')
            }
        }
        // 3,校验邮箱是否已存在
        if (body.email) {
            if (body.email !== this.ctx.user.email &&
                await userService.findByEmail(body.email)) {
                this.ctx.throw(422, '邮箱已存在')
            }
        }
        if (body.password) {
            // 密码加密
            body.password = this.ctx.helper.md5(body.password)
        }
        // 4,更新用户信息
        const user = await userService.updateUser(body)
        // 5,返回更新之后的用户信息
        this.ctx.body = {
            user: {
                email: user.email,
                password: user.password,
                username: user.username,
                channelDescription: user.channelDescription,
                avatar: user.avatar
            }
        }
    }
    /**
     * 订阅频道
     */
    async subscribe() {
        const userId = this.ctx.user._id
        const channelId = this.ctx.params.userId // 路径参数 
        // 1,用户不能订阅自己
        if (userId.equals(channelId)) {
            this.ctx.throw(422, '不能订阅自己')
        }
        // 2,添加订阅
        const user = await this.service.user.subscribe(userId, channelId)
        // 3,发送响应
        this.ctx.body = {
            user: {
                ...this.ctx.helper._.pick(user, [
                    'username',
                    'email',
                    'avatar',
                    'cover',
                    'channelDescription',
                    'subscribersCount'
                ]),
                // 订阅状态
                isSubscribed: true
            }
        }
    }
    /**
     * 取消订阅
     */
    async unsubscribe() {
        const userId = this.ctx.user._id
        const channelId = this.ctx.params.userId // 路径参数 
        // 1,用户不能订阅自己
        if (userId.equals(channelId)) {
            this.ctx.throw(422, '不能取消订阅自己')
        }
        // 2,取消订阅
        const user = await this.service.user.unsubscribe(userId, channelId)
        // 3,发送响应
        this.ctx.body = {
            user: {
                ...this.ctx.helper._.pick(user, [
                    'username',
                    'email',
                    'avatar',
                    'cover',
                    'channelDescription',
                    'subscribersCount'
                ]),
                // 订阅状态
                isSubscribed: false
            }
        }
    }
    /**
     * 获取用户信息
     */
    async getUser() {
        // 1,获取订阅状态
        let isSubscribed = false
        // 如果已登录(没登录肯定没订阅状态)
        if (this.ctx.user) {
            // 获取订阅记录
            const record = await this.app.model.Subscription.find({
                user: this.ctx.user._id,
                channel: this.ctx.params.userId,
            })
            if (record.length !== 0) {
                // 记录登录状态
                isSubscribed = true
            }
        }
        // 2,获取用户信息
        const user = await this.app.model.User.findById(this.ctx.params.userId)
        // 3,返回响应
        this.ctx.body = {
            user: {
                ...this.ctx.helper._.pick(user, [
                    'username',
                    'email',
                    'avatar',
                    'cover',
                    'channelDescription',
                    'subscribersCount'
                ]),
                // 订阅状态
                isSubscribed
            }
        }
    }
    /**
     * 获取用户的订阅列表
     */
    async getSubscriptions() {
        const Subscription = this.app.model.Subscription
        let subscription = await Subscription.find({
            user: this.ctx.params.userId,
            // 连表查询,查询条件是Subscription的channel字段
        }).populate('channel')
        subscription = subscription.map(item => {
            return this.ctx.helper._.pick(item.channel, [
                '_id',
                'username',
                'avatar',
            ])
            // return {
            //     _id: item.channel_id,
            //     username: item.channel.username,
            //     avatar: item.channel.avatar
            // }
        })
        this.ctx.body = {
            subscription
        }
    }
}
module.exports = UserController;
