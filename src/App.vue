<template>
  <main>
    <px-header />
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<script>
import PxHeader from "@/components/PxHeader";
export default {
  name: "App",
  components: {
    PxHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  width: 90%;
  margin: 0 auto;
}
</style>
