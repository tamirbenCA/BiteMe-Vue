<template>
  <div id="app">

    <header-bar/>
    <router-view/>
    <footer>
      <div class="foot">
        <i class="fa fa-hand-peace-o" aria-hidden="true"></i>May & Ben
        <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
      </div>
    </footer>
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
body {
  color: #322f2f;
}

body::after {
  background: url("./assets/food-pot-kitchen-cooking.jpg");
  background-repeat: no-repeat;
  content: "";
  opacity: 0.6;
  background-size: cover;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
}


.foot {
  margin: 15px;
}

#app {
  text-align: center;
  color: #322f2f;;
  min-height: 100vh;

  overflow: hidden;
}

body {
  font-family: "Lato";
  margin: 0;
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
