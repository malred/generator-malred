const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  // 开启运行时编译,才能在代码里创建组件
  runtimeCompiler: true,
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: "system",
    },
  },
  chainWebpack: (config) => {
    if (config.plugins.has("SystemJSPublicPathWebpackPlugin")) {
      config.plugins.delete("SystemJSPublicPathWebpackPlugin");
    }
    // 排除打包vue和vue-router
    config.externals = ['vue', 'vue-router','single-spa']
  },
  filenameHashing: false,
}) 
