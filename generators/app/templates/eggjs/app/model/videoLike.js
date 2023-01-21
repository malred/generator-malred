module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const likeSchema = new Schema({
        // 点赞状态
        like: {
            type: Number,
            // 1喜欢 -1不喜欢
            enum: [1, -1],
            require: true
        },
        // 点赞用户
        user: {
            type: mongoose.ObjectId,
            ref: 'User',
            require: true
        },
        // 点赞视频
        video: {
            type: mongoose.ObjectId,
            ref: 'Video',
            require: true
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
    return mongoose.model('VideoLike', likeSchema)
} 