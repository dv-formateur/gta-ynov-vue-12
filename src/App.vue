<template>
  <div id="app">
    <navbar-component></navbar-component>
    <router-view></router-view>
  </div>
</template>

<script>

import NavbarComponent from "./components/NavbarComponent";
export default {
  name: 'app',
  components: {
      NavbarComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
