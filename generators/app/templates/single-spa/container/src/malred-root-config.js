import { registerApplication, start } from "single-spa";
import { constructApplications, constructRoutes } from "single-spa-layout";
// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

// 获取路由配置对象
const routes = constructRoutes(document.querySelector("#single-spa-layout"));
// 获取路由信息数组(传入routes,遍历并执行loadApp) => [{name: "",app: ,activeWhen: []"}]
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
// 遍历路由信息,注册应用
applications.forEach(registerApplication);
start({
  urlRerouteOnly: true,
});
