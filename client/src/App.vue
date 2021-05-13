<template>
  <div class="mh-100">
    <Navbar />
    <router-view :key="$route.fullPath" v-slot="{ Component }" class="">
      <transition name="slide-down" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import Navbar from "./components/Navbar";

export default {
  components: { Navbar },
  mounted() {},
};
</script>
