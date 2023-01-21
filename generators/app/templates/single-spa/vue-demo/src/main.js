import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.config.productionTip = false;
// 使用router,否则报错
Vue.use(VueRouter)
// 创建两个组件
const Foo = { template: "<div>Foo</div>" }
const Bar = { template: "<div>Bar</div>" }
// 路由规则
const routes = [
  {
    path: "/foo",
    component: Foo,
  },
  {
    path: "/bar",
    component: Bar,
  }
]
// 创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history',
  // 因为微前端访问是访问/vue/xxx
  base: "/vue"
})
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    // 传递路由对象
    router,
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecycle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa, 
        },
      });
    },
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
