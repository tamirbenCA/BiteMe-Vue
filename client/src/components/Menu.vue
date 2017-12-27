<template>
    <section>
        <tags-bar> </tags-bar>

        <!-- <tags-bar/> -->
        <div class="items-container">
            <ul>
                <li v-for="(item, idx) in itemsToDisplay" :key="idx">
                    <div class="item">
                        <div class="img-item" @click="showDetails(item)" v-bind:style="{backgroundImage : 'url(\'' + item.imgUrl + '\')'}">
                            <!-- <img :src="item.item.img" /> -->
                        </div>
                        <div class="item-footer">
                            <div class="left-icon">
                                <h3>
                                    <span class="star">★</span> {{item.rank}}</h3>
                                <h2>{{item.price}}$</h2>

                            </div>
                            <div class="name">
                                <h4>{{item.name}}</h4>
                            </div>
                            <!-- <div class="right-icon">
                                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                            <select>
                                                <option>0</option>
                                                <option v-for="n in 10">{{n}}</option>
                                            </select>
                                        </div> -->
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
// @click="showDetails(item.sellerId,item.item.id)"

import { LOAD_ITEMS } from '../modules/ShopModule.js';
import TagsBar from './TagsBar.vue';

export default {
    name: 'Menu',
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
    components: {
        TagsBar
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

.name {
    width: 200px;
}





/* .front-img {
  width: 1400px;;
} */


/* .msg {
  background-color: lightgray;
  color: #4a4848;
  text-align: left;
  line-height: 50px;
  padding: 10px;
} */


/* .top-page {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 50px;
} */

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
    /* border-radius: 15px; */
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
    /* border-bottom: 1px solid gray; */
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
    width: 320px;
    height: 300px;
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
