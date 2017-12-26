<template>
  <div class="items-container">
    <ul>
      <li v-for="(item, idx) in itemsToDisplay" :key="idx">
<<<<<<< HEAD
        <div class="item" >
          <div class="img-item"   v-bind:style="{backgroundImage : 'url(\'' + item.img + '\')'}" >
            <!-- <img :src="item.item.img" /> -->
          </div>
          <div class="item-footer">
            <div class="left-icon">
              <h3>
                <span class="star">★</span> {{item.rank}}</h3>
              <h2>{{item.price}}$</h2>
            </div>
            <div class="right-icon">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            </div>
          </div>
        </div>
=======
        <router-link :to="'/itemdetails/' + item.item.id">
          <div>
            <img :src="item.item.img" />
            <h2>{{item.item.price}}$</h2>
            <h3>
              <span class="star">★</span> {{item.item.rank}}</h3>
            <h2>{{item}}</h2>
>>>>>>> bab9f1e912e44f0893e98755053a21f8b7dffea5

          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// @click="showDetails(item.sellerId,item.item.id)"

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
        console.log('items:', x[0].img)
      })
      .catch(err => { console.log('err', err) })
  },
    methods: {
        // showDetails(sellerId,itemId) {
        //   this.$router.push(sellerId+'/'+itemId);
        //   //  console.log(sellerId)
        // }
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

.fa-shopping-cart {
  font-size: 30px;
  color: darkcyan;
}

.items-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

.item {
  cursor: pointer;
  height: 350px;
  width: 320px;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    margin-top:10px;
   margin-bottom:10px;
}

.item-footer {
  width: 290px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
}

.left-icon {
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}


.img-item {
  background-size: cover;
  background-position: center;
  width: 280px;
  height: 200px;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

h3 {
  color: gold;
}
</style>
