<template>
  <div id="app">
    <header-bar/>
     <!-- <div class="top-page">
      <img class="front-img" src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_1000/v1514370410/freshly_press_release_photo3_99980_yvwi41.jpg" />
      <div class="msg">
        <h1>CHEF-COOKED</h1>
        <h1>HEALTHY MEALS</h1>
        <h1>DELIVERED TO YOU</h1>
      </div>
    </div> -->
    <router-view/>
    <footer><i class="fa fa-hand-peace-o" aria-hidden="true"></i> May&Ben&Mosh</footer>
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
