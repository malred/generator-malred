<template>
  <div id="app">
    <div>
      <!-- <Parcel :config="parcelConfig" :mountParcel="mountParcel" /> -->
      <!-- 点击切换路由 -->
      <router-link to="/foo">foo</router-link>
      <router-link to="/bar">bar</router-link>
      <button @click="handleClick">调用公共方法</button>
    </div>
    <!-- 显示路由对应的页面内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
// 旧版本
// import Parcel from 'single-spa-vue/dist/esm/parcel'
// 新版本
// import Parcel from "single-spa-vue/parcel";
// import { mount } from "./main";
// import { mountRootParcel } from "single-spa";
export default {
  name: "App",
  // components: { Parcel },
  // 这个是main.js传递过来的
  // props: ["mountParcel"],
  data() {
    return {
      // parcelConfig: window.System.import("@<%= team_name %>/navbar"),
      // mountParcel: mountRootParcel,
    };
  },
  methods: {
    async handleClick() {
      // 导入并使用公共逻辑
      const toolsModule = await window.System.import("@<%= team_name %>/tools");
      toolsModule.sayHello("@<%= team_name %>/vue");
    },
  },
  async mounted() {
    const toolsModule = await window.System.import("@<%= team_name %>/tools");
    // 订阅
    toolsModule.sharedSubject.subscribe(console.log);
  },
};
</script>

<style lang="less">
</style>
