const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  // 如果修改项目名,这里需要配置
  const defaultConfig = singleSpaDefaults({
    orgName: "<%= team_name %>",
    projectName: "react",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // 排除依赖,从公共库获取
    externals: ["react-router-dom"],
  });
};
