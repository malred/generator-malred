<template>
  <div>
    <h3>about</h3>
    <router-link to="/" v-slot="{ href, navigate, isActive }">
      <li :class="{ active: isActive }">
        <a :href="href" @click="navigate">
          <span>Home</span>
        </a>
      </li>
    </router-link> 
  </div>
</template>
  <script setup>
</script>
  <style lang="css">
</style>