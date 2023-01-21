module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const subscriptionSchema = new Schema({
        // 订阅用户
        user: {
            type: mongoose.ObjectId,
            ref: 'User',
            require: true
        },
        // 订阅频道
        channel: {
            type: mongoose.ObjectId,
            ref: 'User',
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
    return mongoose.model('Subscription', subscriptionSchema)
}