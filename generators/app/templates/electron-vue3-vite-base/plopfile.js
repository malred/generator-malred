// Plop 入口文件,需要导出一个函数
// 此函数接收一个plop对象,用于创建生成器任务
module.exports = plop => {
    // 参数1: 生成器名称
    // 参数2: 生成器选项
    plop.setGenerator('generate-views', {
        // 描述
        description: 'create a view',
        // 创建时命令行的对话问题
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'view name',
                // 默认答案
                default: 'MyView'
            }
        ],
        // 完成命令行交互后执行的动作
        actions: [
            {
                type: 'add', // 添加一个全新文件
                // 生成的目标目录
                path: 'src/views/{{name}}/{{name}}.vue', // name是命令行交互得到的数据,
                templateFile: 'plop-templates/view.hbs' // 指定使用的是哪个模板
            }
        ]
    })
}