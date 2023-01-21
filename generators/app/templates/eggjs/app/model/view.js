module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const viewSchema = new Schema({
        // 用户
        user: {
            type: mongoose.ObjectId,
            ref: 'User',
            required: true,
        },
        // 视频
        video: {
            type: mongoose.ObjectId,
            ref: 'Video',
            required: true,
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
    return mongoose.model('View', viewSchema)
}