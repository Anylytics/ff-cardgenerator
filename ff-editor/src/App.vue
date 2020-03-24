<template>
  <div id="app">
    <img src="../../assets/logo.svg" />
    <h3><b>Feature Factory</b> Editor</h3>
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
  margin: 10px;
}
#app > img {
  height: 25px;
  display: inline;
}
#app h3 {
  display: inline;
  font-size: 25px;
  vertical-align: center;
}
*:focus {
  outline: dashed 1px grey;
}
</style>
