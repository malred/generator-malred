<template>
  <div>
    <!-- 底部导航 -->
    <div class="bottom-nav">
<!--      <span>1</span>-->
<!--      <span>1</span>-->
<!--      <span>1</span>-->
    </div>
    <!--  页面出口,类似子路由  -->
    <nuxt/>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault'
}
</script>

<style scoped>
.bottom-nav {
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background: lightskyblue; 
}
</style>
