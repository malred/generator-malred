// 外层函数负责接收参数
module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next();
        } catch (err) {
            // 所有的异常都在app上触发一个error事件,框架会记录一条错误日志
            ctx.app.emit('error', err, ctx);
            const status = err.status || 500
            // 生成环境时500错误的详细内容不返回给客户端,因为可能包含敏感信息
            const error =
                status === 500 && ctx.app.config.env === 'prod'
                    ? 'Internal Server Error'
                    : err.message
            // 从error对象上读取各个属性,设置到响应中
            ctx.body = { error }
            if (status === 422) {
                ctx.body.detail = err.errors
            }
            // 设置响应体状态码
            ctx.status = status
        }
    };
}; 