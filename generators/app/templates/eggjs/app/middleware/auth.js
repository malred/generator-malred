/**
 * 权限相关中间件
 * @param {传递的参数} options 
 * @returns 
 */
module.exports = (options = { required: true }) => {
    return async (ctx, next) => {
        // 1,获取请求体中的token数据
        // 后端接收数据会转成小写,所有这里不是Authorization
        let token = ctx.headers['authorization']
        // 格式: Bearer空格token数据
        token = token
            ? token.split('Bearer ')[1]
            : null
        // 如果有token才获取当前登录用户的信息
        if (token) {
            try {
                // jwt的验证如果失败会抛出一个错误 
                const data = ctx.service.user.verifyToken(token)
                // 3,token有效,根据userId获取用户数据
                //   并挂载到ctx对象中给后续中间件操作 
                ctx.user = await ctx.model.User.findById(data.userId)
            } catch (e) {
                ctx.throw(401)
            }
        } else if (options.required) {
            // 如果是token必须的(required为true)
            // 且没有传递token,就报错
            ctx.throw(401)
        }
        // 4,next执行后续中间件
        await next()
    }
}