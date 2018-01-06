<template>
    <section>
        <tags-bar> </tags-bar>
        <div class="items-container" v-if="!pageReady">
            <img class="gif-loading" src="../assets/loading2.gif">
        </div>
        <div class="items-container" v-else>
            <ul>
                <li v-for="(item, idx) in itemsToDisplay" :key="idx">
                    <!-- {{item}} -->
                    <div class="item">
                        <div class="img-item" @click="showDetails(item)" v-bind:style="{backgroundImage : 'url(\'' + item.imgUrl + '\')'}">
                        </div>
                        <div class="item-footer">
                            <div class="chef-details">
                                <img class="chef" :src="seller[idx].imgUrl" />
                                <p style=" text-transform: capitalize;margin-left:5px;">{{seller[idx].name}}</p>
                            </div>
                            <div class="name">
                                <p>{{item.name}}</p>
                            </div>
                            <div class="rnk-and-prc">
                                <div class="rank">
                                    <div v-for="(star,idx) in item.rank" :key="idx">
                                        <span class="star">★</span>
                                    </div>
                                </div>

                                <p class="price">{{item.price}}$</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import { LOAD_ITEMS_BY_TAG } from '../modules/ShopModule';
import TagsBar from './TagsBar.vue';
import { LOAD_SELLERS_BY_IDS } from '../modules/ShopModule.js';

export default {

    data() {
        return {
            items: [],
            chefsIds: [],
            pageReady: false
        }
    },
    watch: {
        '$route.params.tag'() {
            var tag = this.$route.params.tag;
            tag = tag.toLowerCase();
            this.$store.dispatch({ type: LOAD_ITEMS_BY_TAG, tag: tag })
                .then((items) => {
                    items.forEach((item) =>
                        this.chefsIds.push(item.seller.sellerId))
                    //   console.log(' this.chefsIds', this.chefsIds)
                    this.$store.dispatch({ type: LOAD_SELLERS_BY_IDS, ids: this.chefsIds })
                        .then((items) => {
                            //   console.log(items)
                        })
                })
                .catch(err => { console.log('err', err) })
        }
    },
    watch: {
        '$route.params.tag'() {
            this.pageReady = false;
            var tag = this.$route.params.tag;
            tag = tag.toLowerCase();
            this.$store.dispatch({ type: LOAD_ITEMS_BY_TAG, tag: tag })
                .then((items) => {
                    items.forEach((item) =>
                        this.chefsIds.push(item.seller.sellerId))
                    //   console.log(' this.chefsIds', this.chefsIds)
                    this.$store.dispatch({ type: LOAD_SELLERS_BY_IDS, ids: this.chefsIds })
                        .then((items) => {
                            //   console.log(items)
                            this.pageReady = true;

                        })
                })
                .catch(err => { console.log('err', err) })
        }
    },
    created() {
        var tag = this.$route.params.tag;
        tag = tag.toLowerCase();
        this.$store.dispatch({ type: LOAD_ITEMS_BY_TAG, tag: tag })
            .then((items) => {
                items.forEach((item) =>
                    this.chefsIds.push(item.seller.sellerId))
                // console.log(' this.chefsIds', this.chefsIds)
                this.$store.dispatch({ type: LOAD_SELLERS_BY_IDS, ids: this.chefsIds })
                    .then((items) => {
                        // console.log(items)
                        this.pageReady = true;
                    })
            }).catch(err => { console.log('err', err) })
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
        }
    },
    components: {
        TagsBar
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rnk-and-prc {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.rank {
    display: flex;
    flex-direction: row;
    color: gold;
}

h1,
h2 {
    font-weight: normal;
}

.gif-loading {
    width: 200px;
    height: 200px;
    /* margin-bottom: 50px; */
}

.chef-details {
    display: flex;
    flex-direction: row;
        width: 20%;

    justify-content: space-between;
    margin-bottom: 5px;
    margin-top: 5px;
}

.name {
    text-transform: capitalize;
    font-size: 15px;
}

.chef {
    width: 24px;
    height: 24px;
    border-radius: 50px;
}


.fa-shopping-cart {
    font-size: 30px;
    color: darkcyan;
}

.items-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

p {
    margin: 0;
}

ul {
    margin: auto;
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.item {
    cursor: pointer;
    height: 280px;
    width: 320px;
    /* box-shadow: 1px 2px 6px 0px black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.item-footer {
   height: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
     padding-left: 15px;
    padding-right: 15px;
    justify-content: center;
    justify-content: space-around;
    background-color: white;
    box-sizing: border-box;
    padding-bottom: 5px;
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
    color: gold;
}

select {
    height: 30px;
}

@media screen and (max-width: 480px) {
    .items-container {
        width: 78%;
    }
}
</style>
