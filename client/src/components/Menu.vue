<template>
    <section>
        <tags-bar> </tags-bar>
        <div class="items-container" v-if="!pageReady">
            <img class="gif-loading" src="../assets/loading.gif">
        </div>
        <div class="items-container" v-else>
            <ul>
                <li class="animated pulse" v-for="(item, idx) in itemsToDisplay" :key="idx">
                    <div class="item">
                        <div class="img-item" @click="showDetails(item)" v-bind:style="{backgroundImage : 'url(\'' + item.imgUrl + '\')'}">
                        </div>
                        <div class="item-footer">
                            <div class="chef-details">
                                <img class="chef" :src="item.seller.sellerImgUrl" />
                                <p style="text-transform: capitalize;padding-left:5px;">{{item.seller.sellerName}}</p>
                            </div>
                            <div class="name">
                                <p>{{item.name}}</p>
                            </div>
                            <div class="rank">
                                    <div v-for="(star,idx) in item.rank" :key="idx">
                                        <span class="star">★</span>
                                    </div>
                                </div>

                            <p class="price">{{item.price}}$</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { LOAD_ITEMS } from '../modules/ShopModule.js';
import TagsBar from './TagsBar.vue';

export default {
    name: 'Menu',
    data() {
        return {
            items: [],
            pageReady: false
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_ITEMS })
            .then((items) => {
                this.pageReady = true;
            })
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
        seller() {
            return this.$store.getters.chefs
        },
        isLoaded() {
            return true
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
.chef-details {
    display: flex;
    flex-direction: row;
    width: 60px;
    justify-content: space-between;
    margin-bottom: 5px;
    margin-top: 5px;
}
.name {
    text-transform: uppercase;
    font-size: 15px;
}
.chef {
    width: 24px;
    height: 24px;
    border-radius: 50px;
}
.gif-loading {
    width: 100px;
    height:100px;
}
.fa-shopping-cart {
    font-size: 30px;
    color: darkcyan;
}
.items-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 100px;
}
p {
    margin: 0;
}
ul {
    list-style-type: none;
    padding: 0;
   
}
.item {
    cursor: pointer;
    height: 280px;
    width: 320px;
    box-shadow: 0.5px 0.5px 2px 0px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}
.item-footer {
    height: 150px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 15px;
    justify-content: center;
    justify-content: space-around;
    background-color: white;
    box-sizing: border-box;
}
.img-item {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 80%;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.rank {
    display: flex;
    flex-direction: row;
    color: gold;
}
.star {
    margin: 0;
}
select {
    height: 30px;
}
</style>