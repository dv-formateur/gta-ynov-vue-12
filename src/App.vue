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
  },
    beforeCreate(){
        if(localStorage.getItem("user")!=null){
            //
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d8d8d8;
  background: #3e454c;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>
