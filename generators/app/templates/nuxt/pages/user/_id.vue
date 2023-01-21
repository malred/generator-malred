<template>
  <div>
    <h1>user _id page</h1>
    <!--  拿到路由参数  -->
    <p>{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: "user_id"
}
</script>

<style scoped>

</style>
