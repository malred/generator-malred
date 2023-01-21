<template>
  <div> 
    <div>App</div>
    <router-view />
  </div>
</template>
<script>
// 要写全后缀
import Home from "./views/Home.vue";
export default {
  components: { Home },
};
</script>
<style lang="css">
</style>