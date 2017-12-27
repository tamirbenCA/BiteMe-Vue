<template>
  <section>
    <div class="top-page">
      <img class="front-img" src="http://res.cloudinary.com/dl58rg6j8/image/upload/c_scale,w_1000/v1514370410/freshly_press_release_photo3_99980_yvwi41.jpg" />
      <div class="msg">
        <h1>CHEF-COOKED</h1>
        <h1>HEALTHY MEALS</h1>
        <h1>DELIVERED TO YOU</h1>
      </div>
    </div>

    <div class="items-container">

      <ul>
        <li v-for="(item, idx) in itemsToDisplay" :key="idx">
          <div class="item">
            <div class="img-item" @click="showDetails(item)" v-bind:style="{backgroundImage : 'url(\'' + item.img + '\')'}">
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
                <select>
                  <option>0</option>
                  <option v-for="n in 10">{{n}}</option>
                </select>
              </div>
            </div>
          </div>
          </router-link>
        </li>
      </ul>
    </div>
  </section>
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
        // console.log('items:', x)
      })
      .catch(err => { console.log('err', err) })
  },
  methods: {
    showDetails(item) {
      this.$router.push('/itemdetails/' + item._id);
    }
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


/* .front-img {
  width: 1400px;;
} */

.msg {
  background-color: lightgray;
  color: #4a4848;
  text-align: left;
  line-height: 50px;
  padding: 10px;
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

.right-icon {
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  margin-top: 10px;
  margin-bottom: 10px;
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
  align-items: center;
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

select {
  height: 30px;
}
</style>
