<template>
  <div>
    <ul>
      <li v-for="item in itemsToDisplay">
        <div>
          <img :src="item.item.img" />

        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import { LOAD_ITEMS } from '../modules/ShopModule.js';

export default {
  name: 'HomePage',
  data() {
    return {
      items: [],
      y: null
    }
  },
  created() {
    this.$store.dispatch({ type: LOAD_ITEMS })
      .then(items => {
        var x = this.$store.getters.items
       
        console.log(x[0].item.price)
      })
      .catch(err => { console.log('err', err) })
  },
  computed: {
    itemsToDisplay() {
      return this.$store.getters.items
    },

  },

}
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
