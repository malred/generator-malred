module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const commentSchema = new Schema({
        // 评论内容
        content: {
            type: String,
            required: true,
        },
        // 评论用户
        user: {
            type: mongoose.ObjectId,
            ref: 'User',
            require: true
        },
        // 评论视频
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
    return mongoose.model('Comment', commentSchema)
}