<template>
  <div id="app">
    <header-bar/>
    <tags-bar/>
    <router-view/>
<<<<<<< HEAD
    <footer>
      <i class="fa fa-hand-peace-o" aria-hidden="true"></i> May&Ben&Mosh</footer>
=======
    <footer><i class="fa fa-hand-peace-o" aria-hidden="true"></i> May&Ben&Mosh</footer>
>>>>>>> 6b36372c4d1c77d85f8b56f612ec56fd50eccfd6
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
  text-align: center;
  color: #2c3e50;
}

body {
  font-family: "Lato";
}

footer {
  border-top: 1px solid black;
  font-weight: bold;
}
</style>
