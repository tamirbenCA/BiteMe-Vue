<template>
  <div id="app">
      <header-bar/>
      <router-view/>
      <footer>
        <i class="fa fa-hand-peace-o" aria-hidden="true"></i> May & Ben</footer>
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


.top-page {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 50px;
}


.msg {
  background-color: lightgray;
  color: #4a4848;
  text-align: left;
  line-height: 50px;
  padding: 10px;
}

footer {
  border-top: 1px solid black;
  font-weight: bold;
}
</style>
