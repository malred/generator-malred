module.exports = app => {
    // egg-mongoose插件默认添加mongoose到app上
    const mongoose = app.mongoose
    // 数据库对象
    const Schema = mongoose.Schema
    const userSchema = new Schema({
        // 用户名
        username: {
            type: String,
            require: true
        },
        // 密码
        password: {
            type: String,
            require: true,
            // 查询中不包含该字段
            select: false
        },
        // 邮箱
        email: {
            type: String,
            require: true
        },
        // 头像
        avatar: {
            type: String,
            default: null
        },
        // 封面
        cover: {
            type: String,
            default: null
        },
        // 频道介绍
        channelDescription: {
            type: String,
            default: null
        },
        // 被关注数
        subscribersCount: {
            type: Number,
            default: 0
        },
        // 创建时间
        createdAt: {
            type: Date,
            default: Date.now
        },
        // 修改时间
        updatedAt: {
            type: Date,
            default: Date.now
        }
    })
    return mongoose.model('User', userSchema)
}