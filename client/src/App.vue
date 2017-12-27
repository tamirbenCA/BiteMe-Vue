<template>
  <div id="app">
    <header-bar/>
    <tags-bar/>
    <router-view/>
    <footer><i class="fa fa-hand-peace-o" aria-hidden="true"></i> may&Ben&Mosh</footer>
  </div>
</template>

<script>
import HeaderBar from './components/HeaderBar.vue';
import TagsBar from './components/TagsBar.vue';


export default {
  name: 'app',
  components: {
    HeaderBar,
    TagsBar
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
  /* margin-top: 60px; */
}

footer {
  border-top: 1px solid black;
  font-weight: bold;
}
</style>
