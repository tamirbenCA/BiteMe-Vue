<template>
    <section>
        <tags-bar> </tags-bar>

        <!-- <tags-bar/> -->
        <div class="items-container">
            <ul>
                <li class="animated pulse" v-for="(item, idx) in itemsToDisplay" :key="idx">
                    <div class="item">
                        <div class="img-item" @click="showDetails(item)" v-bind:style="{backgroundImage : 'url(\'' + item.imgUrl + '\')'}">
                            <!-- <img :src="item.item.img" /> -->
                        </div>
                        <div class="item-footer">
                            <div class="chef-details">
                                <img class="chef" :src="seller[idx].imgUrl" />
                                <p>{{seller[idx].name}}</p>
                            </div>
                            <div class="name">
                                <p>{{item.name}}</p>
                            </div>
                            <p class="rank">{{item.rank}}
                                <span class="star">★</span>
                            </p>
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
import { LOAD_CHEFS_BY_IDS } from '../modules/ShopModule.js';


export default {
    name: 'Menu',
    data() {
        return {
            items: [],
            chefsIds: []
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_ITEMS })
            .then((items) => {
                items.forEach((item) =>
                    this.chefsIds.push(item.seller.sellerId))
                console.log(' this.chefsIds', this.chefsIds)
                this.$store.dispatch({ type: LOAD_CHEFS_BY_IDS, ids: this.chefsIds })
                    .then((items) => {
                        console.log(items)
                    })
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
        }
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


/* width: 25px;
    height: 25px; */

.fa-shopping-cart {
    font-size: 30px;
    color: darkcyan;
}

.items-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    /* padding-bottom: 10px; */
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
    height: 350px;
    width: 250px;
    box-shadow: 1px 2px 6px 0px black;
    /* border: 1px solid black; */
    /* border-radius: 15px; */
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
</style>
