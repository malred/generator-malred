const Controller = require('egg').Controller
class VideoController extends Controller {
    /**
     * 创建视频
     */
    async createVideo() {
        // 获取请求体数据
        const body = this.ctx.request.body
        // 获取video数据模型
        const { Video } = this.app.model
        // 校验参数
        this.ctx.validate({
            title: { type: 'string' },
            description: { type: 'string' },
            vodVideoId: { type: 'string' },
            cover: { type: 'string' },
        }, body)
        // 获取当前登录用户id
        body.user = this.ctx.user._id
        // 创建video对象
        const video = await new Video(body).save()
        // 设置状态码(创建成功)
        this.ctx.status = 201
        // 返回响应
        this.ctx.body = { video }
    }
    /**
     * 获取视频详情
     */
    async getVideo() {
        // 获取数据模型
        const { Video, VideoLike, Subscription } = this.app.model
        // 获取请求参数 
        const { videoId } = this.ctx.params
        // 根据视频id获取数据
        let video = await Video.findById(videoId)
            // 多表查询 -- 获取作者(频道)信息
            .populate('user', '_id username avatar subscribersCount')
        // 如果不存在该视频
        if (!video) {
            this.ctx.throw(404, 'Video not found')
        }
        // video转json,作为返回信息,方便添加信息
        video = video.toJSON()
        // 添加信息
        video.isLiked = false // 是否喜欢
        video.isDisliked = false // 是否不喜欢
        video.user.isSubscribed = false // 是否已订阅视频作者
        // 如果当前是登录状态
        if (this.ctx.user) {
            // 获取当前用户id
            const userId = this.ctx.user._id
            // 查询真实的状态信息
            if (await VideoLike.findOne({
                user: userId, video: videoId, like: 1
            })) {
                video.isLiked = true
            }
            if (await VideoLike.findOne({
                user: userId, video: videoId, like: -1
            })) {
                video.isDisliked = true
            }
            if (await Subscription.findOne({
                user: userId, channel: video.user._id
            })) {
                video.user.isSubscribed = true
            }
        }
        this.ctx.body = {
            video
        }
    }
    /**
     * 获取视频列表(分页)
     */
    async getVideos() {
        // 拿到数据模型
        const { Video } = this.app.model
        // 拿到路由参数(分页信息)
        let { pageNum = 1, pageSize = 10 } = this.ctx.query
        pageNum = Number.parseInt(pageNum)
        pageSize = Number.parseInt(pageSize)
        const getVideos = Video
            .find()
            .populate('user')
            .sort({
                // 排序规则: 根据createAt倒序
                createAt: -1
            })
            .skip((pageNum - 1) * pageSize) // 分页偏移量 offset
            .limit(pageSize) // 分页查询数
        // 获取总视频数量
        const getVideosCount = Video.countDocuments()
        // 让两个任务并行执行(因为有先后关系)
        const [videos, videosCount] = await Promise.all([
            getVideos,
            getVideosCount
        ])
        this.ctx.body = {
            videos,
            videosCount
        }
    }
    /**
     * 获取用户发布的视频列表(分页)
     */
    async getUserVideos() {
        // 拿到数据模型
        const { Video } = this.app.model
        // 拿到路由参数(分页信息)
        let { pageNum = 1, pageSize = 10 } = this.ctx.query
        // 路径参数
        const userId = this.ctx.params.userId
        pageNum = Number.parseInt(pageNum)
        pageSize = Number.parseInt(pageSize)
        // 获取该用户发布的视频列表
        const getVideos = Video
            .find({
                user: userId
            })
            .populate('user')
            .sort({
                // 排序规则: 根据createAt倒序
                createAt: -1
            })
            .skip((pageNum - 1) * pageSize) // 分页偏移量 offset
            .limit(pageSize) // 分页查询数
        // 获取该用户的总视频数量
        const getVideosCount = Video.countDocuments({
            user: userId
        })
        // 让两个任务并行执行(因为有先后关系)
        const [videos, videosCount] = await Promise.all([
            getVideos,
            getVideosCount
        ])
        this.ctx.body = {
            videos,
            videosCount
        }
    }
    /**
     * 获取用户关注的视频列表
     */
    async getUserFeedVideos() {
        // 拿到数据模型
        const { Video, Subscription } = this.app.model
        // 拿到路由参数(分页信息)
        let { pageNum = 1, pageSize = 10 } = this.ctx.query
        // 路径参数
        const userId = this.ctx.user._id
        pageNum = Number.parseInt(pageNum)
        pageSize = Number.parseInt(pageSize)
        // 找到当前用户关注的频道列表
        const channels = await Subscription.find({ user: userId }).populate('channel')
        // 获取该用户发布的视频列表
        const getVideos = Video
            .find({
                // 查询多条 
                user: { $in: channels.map(item => item.channel._id) }
            })
            .populate('user')
            .sort({
                // 排序规则: 根据createAt倒序
                createAt: -1
            })
            .skip((pageNum - 1) * pageSize) // 分页偏移量 offset
            .limit(pageSize) // 分页查询数
        // 获取该用户的总视频数量
        const getVideosCount = Video.countDocuments({
            user: { $in: channels.map(item => item.channel._id) }
        })
        // 让两个任务并行执行(因为有先后关系)
        const [videos, videosCount] = await Promise.all([
            getVideos,
            getVideosCount
        ])
        this.ctx.body = {
            videos,
            videosCount
        }
    }
    /**
     * 修改视频
     */
    async updateVideo() {
        // 得到请求体
        const { body } = this.ctx.request
        // 得到数据模型
        const { Video } = this.app.model
        // 得到路由参数
        const { videoId } = this.ctx.params
        // 得到当前登录用户的id
        const userId = this.ctx.user._id
        // 校验
        this.ctx.validate({
            title: { type: 'string', required: false },
            description: { type: 'string', required: false },
            vodVideoId: { type: 'string', required: false },
            cover: { type: 'string', required: false },
        }, body)
        // 查询要修改的数据
        const video = await Video.findById(videoId)
        // 如果没有该数据
        if (!video) {
            this.ctx.throw(404, 'Video not found')
        }
        // 视频作者必须是当前登录的用户
        if (!video.user.equals(userId)) {
            this.ctx.throw(403, '没有权限')
        }
        // 拼接两个对象
        Object.assign(video, this.ctx.helper._
            .pick(body, ['title', 'description', 'vodVideoId', 'cover']))
        // 把修改保存到数据库
        await video.save()
        // 返回响应
        this.ctx.body = {
            video
        }
    }
    /**
     * 删除视频
     */
    async deleteVideo() {
        // 得到数据模型
        const { Video } = this.app.model
        // 得到路由参数
        const { videoId } = this.ctx.params
        // 查询需要删除的数据
        const video = await Video.findById(videoId)
        // 如果没有该数据
        if (!video) {
            this.ctx.throw(404, 'Video not found')
        }
        // 视频作者必须是当前用户才能删除
        if (!video.user.equals(this.ctx.user._id)) {
            this.ctx.throw(403, '没有权限')
        }
        // 删除
        await video.remove()
        // 设置状态码
        this.ctx.status = 204
    }
    /**
     * 添加视频评论
     */
    async createComment() {
        // 获取请求体
        const body = this.ctx.request.body
        // 获取数据模型
        const { Video, Comment } = this.app.model
        // 得到路由参数
        const { videoId } = this.ctx.params
        // 校验
        this.ctx.validate({
            content: 'string'
        })
        // 获取评论所属的视频
        const video = await Video.findById(videoId)
        // 如果视频不存在
        if (!video) {
            this.ctx.throw(404, 'Video not found')
        }
        // 创建评论
        const comment = await new Comment({
            content: body.content,
            user: this.ctx.user._id,
            video: videoId
        }).save()
        // 更新视频的评论数量
        video.commentsCount = await Comment.countDocuments({
            video: videoId
        })
        await video.save()
        // 多表查询评论所属用户和视频字段数据
        await comment.populate('user').populate('video').execPopulate()
        // 返回响应
        this.ctx.body = {
            comment
        }
    }
    /**
     * 获取视频评论列表
     */
    async getVideoComments() {
        // 获取路径参数
        const { videoId } = this.ctx.params
        // 获取数据模型
        const { Comment } = this.app.model
        // 获取query参数
        let { pageNum = 1, pageSize = 10 } = this.ctx.query
        // 转为数字
        pageNum = Number(pageNum)
        pageSize = Number(pageSize)
        // 获取评论
        const getComments = Comment
            .find({
                video: videoId
            })
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
            .populate('user')
            .populate('video')
        // 获取总评论数
        const getCommentsCount = Comment.countDocuments({
            video: videoId
        })
        // 并行执行(因为有先后顺序)
        const [comments, commentsCount] = await Promise.all([
            getComments,
            getCommentsCount
        ])
        this.ctx.body = {
            comments,
            commentsCount
        }
    }
    /**
     * 用户删除自己的评论
     */
    async deleteVideoComments() {
        // 获取路由参数
        const { videoId, commentId } = this.ctx.params
        // 获取数据模型
        const { Comment, Video } = this.app.model
        // 校验视频是否存在
        const video = await Video.findById(videoId)
        // 如果视频不存在
        if (!video) {
            this.ctx.throw(404, 'Video not found')
        }
        // 获取评论
        const comment = await Comment.findById(commentId)
        // 校验评论是否存在
        if (!comment) {
            this.ctx.throw(404, 'Comment not found')
        }
        // 校验当前用户是否是评论的作者
        if (!comment.user.equals(this.ctx.user._id)) {
            this.ctx.throw(403, '没有权限')
        }
        // 删除评论
        await comment.remove()
        // 更新视频评论数量
        video.commentsCount = await Comment.countDocuments({
            video: videoId
        })
        await video.save()
        // 设置状态码
        this.ctx.status = 204
    }
    /**
     * 点赞/喜欢视频
     */
    async likeVideo() {
        // 获取数据模型
        const { Video, VideoLike } = this.app.model
        // 获取路径参数
        const { videoId } = this.ctx.params
        // 获取当前登录用户id
        const userId = this.ctx.user._id
        // 获取视频
        const video = await Video.findById(videoId)
        // 校验视频是否存在
        if (!video) {
            this.ctx.throw(404, 'Video not found')
        }
        // 获取like状态
        const doc = await VideoLike.findOne({
            user: userId,
            video: videoId
        })
        let isLiked = true
        // 如果是喜欢的状态
        if (doc && doc.like === 1) {
            await doc.remove() // 取消点赞
            isLiked = false
        } else if (doc && doc.like === -1) {
            // 如果是不喜欢状态,就添加喜欢
            doc.like = 1
            await doc.save()
        } else {
            // 如果没有状态,就添加喜欢
            await new VideoLike({
                user: userId,
                video: videoId,
                like: 1
            }).save()
        }
        // 更新喜欢视频的数量
        video.likesCount = await VideoLike.countDocuments({
            video: videoId,
            like: 1
        })
        // 更新不喜欢视频的数量
        video.dislikesCount = await VideoLike.countDocuments({
            video: videoId,
            like: -1
        })
        // 将修改保存到数据库
        await video.save()
        // 返回响应
        this.ctx.body = {
            video: {
                ...video.toJSON(),
                isLiked
            }
        }
    }
    /**
     * 点踩/不喜欢视频
     */
    async dislikeVideo() {
        // 获取数据模型
        const { Video, VideoLike } = this.app.model
        // 获取路径参数
        const { videoId } = this.ctx.params
        // 获取当前登录用户id
        const userId = this.ctx.user._id
        // 获取视频
        const video = await Video.findById(videoId)
        // 校验视频是否存在
        if (!video) {
            this.ctx.throw(404, 'Video not found')
        }
        // 获取like状态
        const doc = await VideoLike.findOne({
            user: userId,
            video: videoId
        })
        let isDisLiked = true
        // 如果是喜欢的状态
        if (doc && doc.like === -1) {
            await doc.remove() // 取消不喜欢
            isDisLiked = false
        } else if (doc && doc.like === 1) {
            // 如果是喜欢状态,就设置不喜欢
            doc.like = -1
            await doc.save()
        } else {
            // 如果没有状态,就添加不喜欢
            await new VideoLike({
                user: userId,
                video: videoId,
                like: -1
            }).save()
        }
        // 更新喜欢视频的数量
        video.likesCount = await VideoLike.countDocuments({
            video: videoId,
            like: 1
        })
        // 更新不喜欢视频的数量
        video.dislikesCount = await VideoLike.countDocuments({
            video: videoId,
            like: -1
        })
        // 将修改保存到数据库
        await video.save()
        // 返回响应
        this.ctx.body = {
            video: {
                ...video.toJSON(),
                isDisLiked
            }
        }

    }
    /**
     * 获取用户喜欢的视频列表
     */
    async getUserLikedVideos() {
        // 获取数据模型
        const { Video, VideoLike } = this.app.model
        // 获取query参数
        let { pageNum = 1, pageSize = 10 } = this.ctx.query
        // 转为数字
        pageNum = Number(pageNum)
        pageSize = Number(pageSize)
        // 查询条件
        const filterDoc = {
            user: this.ctx.user._id,
            like: 1
        }
        // 获取like列表
        const likes = await VideoLike
            .find(filterDoc)
            .sort({
                // 根据创建时间降序
                createAt: -1
            })
            .skip((pageNum - 1) * pageSize)
            .limit(pageSize)
        // 定义根据like获取视频的方法
        const getVideos = Video.find({
            _id: {
                // 查找id在like.video(是id类型)范围里的视频
                $in: likes.map(like => like.video)
            }
            // 多表联查user
        }).populate('user')
        // 定义获取用户喜欢的视频数量的方法
        const getVideosCount = VideoLike.countDocuments(filterDoc)
        // 异步并行执行
        const [videos, videosCount] = await Promise.all([
            getVideos,
            getVideosCount
        ])
        // 返回响应
        this.ctx.body = {
            videos,
            videosCount
        }
    }
}
module.exports = VideoController