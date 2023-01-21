<template>
  <div>
    <h1>about page</h1>
    <!--  a 链接,刷新页面,走服务端渲染  -->
    <h2>a链接</h2>
    <a href="/">首页</a>
    <!--  router-link 导航链接组件  -->
    <h2>router-link</h2>
    <router-link to="/">首页</router-link>
    <!--  编程式导航  -->
    <button @click="onClick">首页</button>
  </div>
</template>

<script>
export default {
  name: "about",
  methods: {
    onClick() {
      console.log('hello')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
