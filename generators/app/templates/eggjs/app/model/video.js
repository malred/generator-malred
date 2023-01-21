module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const videoSchema = new Schema({
        // 视频标题
        title: {
            type: String,
            require: true
        },
        // 视频介绍
        description: {
            type: String,
            require: true
        },
        // 视频播放地址
        playUrl: {
            type: String,
            require: true
        },
        // 视频封面
        cover: {
            type: String,
            require: true
        },
        // 视频作者
        user: {
            type: mongoose.ObjectId,
            require: true,
            // 指定为User模型对应的数据表
            ref: 'User'
        },
        // 喜欢数量
        likesCount: {
            type: Number,
            require: true,
            default: 0
        },
        // 不喜欢数量
        dislikesCount: {
            type: Number,
            require: true,
            default: 0
        },
        // 播放量
        viewsCount: {
            type: Number,
            require: true,
            default: 0
        },
        // 评论数
        commentsCount: {
            type: Number,
            require: true,
            default: 0
        },
        // 对应的阿里云视频id
        vodVideoId: {
            type: String,
            require: true,
        },
        // 创建时间
        createdAt: {
            type: Date,
            default: Date.now
        },
        // 更新时间
        updatedAt: {
            type: Date,
            default: Date.now
        }
    })
    return mongoose.model('Video', videoSchema)
}