<template>
  <div>
    <h3>home</h3>
    <button @click="clickHandler">测试api</button> <br />
    <SearchBar />
  </div>
</template>
<script>
import SearchBar from "./SearchBar.vue";
import { NoBaseAPI, HelloAPI } from "../api";
export default {
  components: { SearchBar },
  methods: {
    async clickHandler() {
      try {
        let res = await HelloAPI();
        console.log(res);
        res = await NoBaseAPI({
          name: "zs",
          age: 20,
        });
        console.log(res);
      } catch (e) {}
    },
  },
};
</script>
<style lang="css">
</style>