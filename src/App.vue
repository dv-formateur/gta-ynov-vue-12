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
  color: #d8d8d8;
  background: #3e454c;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.uk-h1, .uk-h2, .uk-h3, .uk-h4, .uk-h5, .uk-h6, h1, h2, h3, h4, h5, h6{
  color: #d8d8d8;
}
.uk-modal-header,
.uk-modal-dialog,
.uk-modal-footer{
  background: #3e454c;
}
.uk-modal label{
  color: #d8d8d8;
}
</style>
