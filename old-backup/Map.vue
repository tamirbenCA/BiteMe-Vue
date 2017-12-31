<template>
  <div class="map-container">
    <p id="locationError"></p>
        <main id="map" style="width:100%;height:350px;"></main>
  </div>
</template>


<script>
import MapService from '../services/MapService.js';

export default { 
  name: "Map",
  data() {
    return {};
  },
  created() {
      MapService.getPosition()
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
