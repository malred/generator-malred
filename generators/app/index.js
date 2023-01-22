const Generator = require('yeoman-generator')
/**
 * 输入项目类型,获取对应模板文件的路径
 * @param {项目类型} type 
 */
function GetTemplatePath(type) {
    let path = []
    switch (type) {
        case 'electron-vue3':
            path = [
                'electron-vue3-vite-base/plop-templates/view.hbs',
                'electron-vue3-vite-base/preload/index.js',
                'electron-vue3-vite-base/public/data.json',
                'electron-vue3-vite-base/public/favicon.ico',
                'electron-vue3-vite-base/public/plop.bat',
                'electron-vue3-vite-base/public/start.bat',
                'electron-vue3-vite-base/src/api/index.js',
                'electron-vue3-vite-base/src/api/noBaseUrl.js',
                'electron-vue3-vite-base/src/api/test.js',
                'electron-vue3-vite-base/src/assets/logo.png',
                'electron-vue3-vite-base/src/moblie/flexible.js',
                'electron-vue3-vite-base/src/router/index.js',
                'electron-vue3-vite-base/src/styles/reset.css',
                'electron-vue3-vite-base/src/utils/request.js',
                'electron-vue3-vite-base/src/views/About/About.vue',
                'electron-vue3-vite-base/src/views/Home.vue',
                'electron-vue3-vite-base/src/views/SearchBar.vue',
                'electron-vue3-vite-base/src/App.vue',
                'electron-vue3-vite-base/src/main.js',
                'electron-vue3-vite-base/.gitignore',
                'electron-vue3-vite-base/1.png',
                'electron-vue3-vite-base/index.html',
                'electron-vue3-vite-base/main.js',
                'electron-vue3-vite-base/mainTray.js',
                'electron-vue3-vite-base/package.json',
                'electron-vue3-vite-base/package-lock.json',
                'electron-vue3-vite-base/plopfile.js',
                'electron-vue3-vite-base/README.md',
                'electron-vue3-vite-base/vite.config.js'
            ]
            break;
        case 'next':
            path = [
                'next/pages/api/hello.js',
                'next/pages/api/user.js',
                'next/pages/post/[id].js',
                'next/pages/test/index.js',
                'next/pages/test/learn.js',
                'next/pages/_app.js',
                'next/pages/_document.js',
                'next/pages/404.jsx',
                'next/pages/index.jsx',
                'next/pages/list.jsx',
                'next/pages/list.module.css',
                'next/plop-templates/page-css.hbs',
                'next/plop-templates/page.hbs',
                'next/public/images/1.jpg',
                'next/public/data.json',
                'next/public/favicon.ico',
                'next/public/next.svg',
                'next/public/plop.bat',
                'next/public/start.bat',
                'next/public/thirteen.svg',
                'next/public/vercel.svg',
                'next/styles/globals.css',
                'next/styles/Home.module.css',
                'next/.gitignore',
                'next/next.config.js',
                'next/package.json',
                'next/package-lock.json',
                'next/plopfile.js',
                'next/README.md'
            ]
            break
        case 'nuxt':
            path = [
                'nuxt/layouts/default.vue',
                'nuxt/pages/user/_id.vue',
                'nuxt/pages/user/index.vue',
                'nuxt/pages/user/one.vue',
                'nuxt/pages/about.vue',
                'nuxt/pages/index.vue',
                'nuxt/pages/user.vue',
                'nuxt/plop-templates/page_father.hbs',
                'nuxt/plop-templates/page_param.hbs',
                'nuxt/plop-templates/page.hbs',
                'nuxt/plugins/element-ui.js',
                'nuxt/static/data.json',
                'nuxt/static/favicon.ico',
                'nuxt/static/plop.bat',
                'nuxt/store/README.md',
                'nuxt/.editorconfig',
                'nuxt/.gitignore',
                'nuxt/app.html',
                'nuxt/jsconfig.json',
                'nuxt/nuxt.config.js',
                'nuxt/package-lock.json',
                'nuxt/package.json',
                'nuxt/plopfile.js',
                'nuxt/README.md',
            ]
            break
        case 'egg-ts':
            path = [
                'eggjs/app/controller/home.js',
                'eggjs/app/controller/user.js',
                'eggjs/app/extend/application.js',
                'eggjs/app/extend/helper.js',
                'eggjs/app/middleware/auth.js',
                'eggjs/app/middleware/error_handler.js',
                'eggjs/app/model/user.js',
                'eggjs/app/public/1.txt',
                'eggjs/app/service/user.js',
                'eggjs/app/router.js',
                'eggjs/config/config.default.js',
                'eggjs/config/config.local.js',
                'eggjs/config/config.prod.js',
                'eggjs/config/plugin.js',
                'eggjs/config/secret.js',
                'eggjs/.eslintignore',
                'eggjs/.eslintrc',
                'eggjs/.gitignore',
                'eggjs/jsconfig.json',
                'eggjs/package-lock.json',
                'eggjs/package.json',
                'eggjs/README.md'
            ]
            break
        case 'single-spa':
            path = [
                'single-spa/container/src/index.ejs',
                'single-spa/container/src/malred-root-config.js',
                'single-spa/container/.eslintrc',
                'single-spa/container/.gitignore',
                'single-spa/container/.prettierignore',
                'single-spa/container/babel.config.json',
                'single-spa/container/package.json',
                'single-spa/container/webpack.config.js',
                'single-spa/navbar/src/malred-navbar.js',
                'single-spa/navbar/src/root.component.js',
                'single-spa/navbar/.eslintrc',
                'single-spa/navbar/.gitignore',
                'single-spa/navbar/.prettierignore',
                'single-spa/navbar/babel.config.json',
                'single-spa/navbar/jest.config.js',
                'single-spa/navbar/package.json',
                'single-spa/navbar/webpack.config.js',
                'single-spa/react-demo/src/About.js',
                'single-spa/react-demo/src/Home.js',
                'single-spa/react-demo/src/malred-react.js',
                'single-spa/react-demo/src/root.component.js',
                'single-spa/react-demo/.eslintrc',
                'single-spa/react-demo/.gitignore',
                'single-spa/react-demo/.prettierignore',
                'single-spa/react-demo/babel.config.json',
                'single-spa/react-demo/jest.config.js',
                'single-spa/react-demo/package.json',
                'single-spa/react-demo/webpack.config.js',
                'single-spa/tools/src/malred-tools.js',
                'single-spa/tools/.eslintrc',
                'single-spa/tools/.gitignore',
                'single-spa/tools/.prettierignore',
                'single-spa/tools/babel.config.json',
                'single-spa/tools/jest.config.js',
                'single-spa/tools/package.json',
                'single-spa/tools/webpack.config.js',
                'single-spa/vue-demo/public/favicon.ico',
                'single-spa/vue-demo/public/index.html',
                'single-spa/vue-demo/src/assets/logo.png',
                'single-spa/vue-demo/src/App.vue',
                'single-spa/vue-demo/src/main.js',
                'single-spa/vue-demo/.browserslistrc',
                'single-spa/vue-demo/.env.standalone',
                'single-spa/vue-demo/.gitignore',
                'single-spa/vue-demo/babel.config.js',
                'single-spa/vue-demo/jsconfig.json',
                'single-spa/vue-demo/package.json',
                'single-spa/vue-demo/README.md',
                'single-spa/vue-demo/vue.config.js',
            ]
            break
        default:
            path = []
            break
    }
    return path
}
module.exports = class extends Generator {
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'projname',
                message: 'your project name',
                default: this.appname
            },
            {
                type: 'input',
                name: 'team_name',
                message: 'your team name',
                default: 'team'
            },
            {
                type: 'input',
                name: 'type',
                message: 'which type of project?(single-spa,electron-vue3,next,nuxt,egg-ts)',
                default: 'none'
            }
        ]).then(answers => {
            this.answers = answers
        })
    }
    writing() {
        // templates下每个文件的相对路径
        let templates = []
        // 判断生成什么类型的项目
        if (this.answers.type === 'none') {
            // 如果输入的项目类型不存在
            console.log('you have not choose a exist type');
            return
        } else if (this.answers.type === 'electron-vue3') {
            templates = GetTemplatePath('electron-vue3')
        } else if (this.answers.type === 'next') {
            templates = GetTemplatePath('next')
        } else if (this.answers.type === 'nuxt') {
            templates = GetTemplatePath('nuxt')
        } else if (this.answers.type === 'single-spa') {
            templates = GetTemplatePath('single-spa')
        } else if (this.answers.type === 'egg-ts') {
            templates = GetTemplatePath('egg-ts')
        }
        // 把每一个文件都通过模板转换到目标路径
        templates.forEach(item => {
            // item字符串按/分割并转数组->数组去掉第一个元素->转字符串,用/拼接每个元素
            let arr = item.split('/')
            arr.splice(0, 1)
            let str = arr.join('/')
            let target = this.answers.projname + '/' + str;
            // 替换掉malred,因为single-spa项目标识一个微应用是用 @组织名称/微应用名称
            if (target.includes('malred')) {
                target = target.replace('malred', this.answers.team_name)
            }
            console.log(target);
            // item -> 每个文件路径
            this.fs.copyTpl(
                // 模板文件路径
                this.templatePath(item),
                // 目标生成目录
                this.destinationPath(target),
                // 数据上下文
                this.answers
            )
        })
    }
}