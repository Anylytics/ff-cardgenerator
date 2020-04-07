<template>
  <div class="animated fadeIn" id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import 'https://unpkg.com/chota@latest';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#app > img {
  height: 25px;
  display: inline;
}
*:focus {
  outline: dashed 1px grey;
}
</style>
