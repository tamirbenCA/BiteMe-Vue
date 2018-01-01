<template>
    <section>
        <div class="items-container" v-if="!pageReady">
            <img class="gif-loading" src="../assets/loading.gif">
        </div>
    <div class="details-container" v-else>
        <div class="modal" v-if="isActive">
            <i class="fa fa-times-circle" aria-hidden="true" @click="closeModal"></i>
            <form class="form-signin" novalidate @submit.prevent="sendComment(item._id,msg)">
                <p>Add a comment</p>
                <input v-model="msg" type="text">
                <div class="rank-chef">
                    <select @change="rankVal({quantity: +$event.target.value})">
                        <option>0</option>
                        <option v-for="(n, index) in 5" :key="index">{{n}}</option>
                    </select>
                </div>
                <button class="midal-btn">Send</button>
            </form>
        </div>

        <div class="top-page">
            <div class="middle">
                <div class="chef-details" style="background-color:white">
                    <h1 style="color:black"> About chef</h1>
                    <p> Meet {{chef.name}} </p>
                    <img class="chef" :src="chef.imgUrl" />
                    <p class="about-chef"> {{chef.about}} </p>
                </div>
                <div class="comments">
                    <h1>Reviews</h1>
                    <i class="fa fa-commenting-o" aria-hidden="true" @click="addComment"></i>
                    <ul class="comments-box">
                        <li class="comment" v-for="(comment, idx)  in item.comments" :key="idx">

                            <div>
                                <i class="fa fa-user" aria-hidden="true"></i>
                                {{comment.comment}}
                                <div class="rank">
                                    <div v-for="(start,idx) in comment.rank" :key="idx">
                                        <span>★</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <div class="left-side" v-if="!isProcessing"> -->
            <div class="left-side">
                <div class="left-side">
                    <div class="top">
                        <p class="title">
                            <router-link :to="`/item/${itemId}/edit`" v-if="chef._id === loggedinUserId">
                                <i class="fa fa-pencil" aria-hidden="true"></i>
                            </router-link>
                            {{item.name}}
                        </p>
                        <div class="rank">
                            <div v-for="(start,idx) in rankOfMeal" :key="idx">
                                <span>★</span>
                            </div>
                        </div>
                        <img class="item" :src="item.imgUrl" />
                        <p>{{item.desc}}</p>
                    </div>
                    <div class="price" style="background-color:white">
                        <p> Price: {{item.price}}$ </p>

                        <select @change="quantityChange({quantity: +$event.target.value, item})" name="quantity" :value="item.quantity">
                            <option>0</option>
                            <option v-for="(n, index) in 10" :key="index">{{n}}</option>
                        </select>
                    </div>
                </div>

                <div class="right-side">
                    <h3>See more of {{chef.name}}'s yummi meals </h3>
                    <ul>
                        <li v-for="(meal, idx)  in meals" :key="idx" @click="showDetails(meal)">
                            <div class="more-item">
                                <div style="margin:10px">{{meal.name}}</div>
                                <div><img class="meal" :src="meal.imgUrl" /></div>
                            </div>

                        </li>
                    </ul>

                </div>
            </div>

        </div>
    </div>
    </section>
</template>

<script>

import { LOAD_ITEM } from '../modules/ShopModule.js';
import { LOAD_SELLER } from '../modules/ShopModule.js';
import { LOAD_ITEMS_BY_IDS } from '../modules/ShopModule.js';
import { UPDATE_CART } from '../modules/CartModule.js';
import { UPDATE_ITEM } from '../modules/ShopModule.js';

import swal from 'sweetalert'

// import ShowMeals from './ShowMeals.vue';
export default {

    data() {
        return {
            // mealsIds: [],
            isProcessing: false,
            isActive: false,
            rank: 0,
            msg: '',
            pageReady: false,
            itemId: ''
        }
    },
    watch: {
        '$route.params.itemId'() {
            // this.isProcessing = true;
            // setTimeout(() => {
            // this.mealsIds = [];
            this.itemId = this.$route.params.itemId;
            this.$store.dispatch({ type: LOAD_SELLER, itemId: this.itemId })
            // this.isProcessing = false;
            // }, 500);
        }

    },
    created() {
        // this.mealsIds = [];
        var mealsIds = [];
        this.itemId = this.$route.params.itemId;
        // console.log(itemId)
        this.$store.dispatch({ type: LOAD_SELLER, itemId: this.itemId })
            .then((item) => {
                // console.log('item', item.seller.commentsOnSellers)
                item.seller.itemsForSale.forEach((item) =>
                    // this.mealsIds.push(item))
                    mealsIds.push(item))

                // this.$store.dispatch({ type: LOAD_ITEMS_BY_IDS, ids: this.mealsIds })
                this.$store.dispatch({ type: LOAD_ITEMS_BY_IDS, ids: mealsIds })
                    .then((items) => {
                        // console.log(items)
                        this.pageReady = true;
                    })
            })

    },
    methods: {
        addComment() {
            this.isActive = true;
        },
        sendComment(itemId, comment) {
            // var quantity = this.rank.quantity
            // console.log(itemId, comment, this.rank.quantity)
            this.$store.commit({ type: UPDATE_ITEM, itemId, comment, quantity: this.rank.quantity });
            this.isActive = false;
        },
        rankVal(val) {
            this.rank = val
        },
        closeModal() {
            this.isActive = false;
        },
        showDetails(item) {
            this.$router.push('/itemdetails/' + item._id);
        },
        quantityChange({ quantity, item }) {
            // console.log('imdddddddddddd')
            // console.log('quantityquantity', quantity)
            // console.log('itemitem', item)
            // var currUser = this.user
            this.$store.commit({ type: UPDATE_CART, item, quantity });
        }
    },

    computed: {
        item() {
            return this.$store.getters.currItem
        },
        chef() {
            return this.$store.getters.currSeller
        },
        meals() {
            return this.$store.getters.items
        },
        rankOfMeal() {
            return Math.round(this.$store.getters.currItem.rank)
        },
        loggedinUserId() {
            return this.$store.getters.loggedinUser._id
        }
        // isProcessing(){
        //     // if(this.isProcessing === false)
        //     // return !this.isProcessing
        // }

    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rank {
    display: flex;
    flex-direction: row;
    color: gold;
    width: 100px;
}

.fa-pencil {
    cursor: pointer;
    color: black;
}

.fa-commenting-o {
    font-size: 30px;
    margin-left: -320px;
    cursor: pointer;
}

.modal {
    border: 1px solid lightgray;
    border-radius: 15px;
    background-color: lightgoldenrodyellow;
}

.midal-btn {
    border-radius: 15px;
    border: none;
    width: 50px;
    margin-bottom: 5px;
}

.title {
    font-size: 30px;
    font-weight: bold;
}

.middle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    justify-content: center;
    align-items: center;
}


h2 {
    margin: 0;
}

.comment {
    /* border-bottom: 1px solid lightgray; */
    width: 100%;
    text-align: left;
    border-bottom: 1px solid lightgray;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.about-chef {
    word-wrap: break-word;
}

.fa-user {
    padding-right: 10px;
    font-size: 35px;
    color: lightslategray;
}

.comments {
    padding: 10px;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 5px;
}

.comments-box {
    padding: 0;
}

.top-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    max-width: 1400px;
}

.price {
    border: 1px solid lightgray;
    padding-bottom: 40px;
    padding-top: 40px;
    /* width: 80%; */
}

.left-side {
    display: flex;
    flex-direction: column;
    border: 1px solid lightgray;
    padding: 20px;
    margin-left: 80px;
}

.chef-details {
    /* border: 1px solid lightgray; */
    padding-bottom: 40px;
    width: 50%;
}

li {
    list-style: none;
}

.star {
    color: gold;
}

.more-item {
    cursor: pointer;
}

.top {
    /* border-bottom: 1px solid lightgray; */
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

ul {
    display: flex;
    flex-direction: column;
    width: 100%;
}

img {
    height: 50%;
    width: 80%;
}

.meal {
    height: 30%;
    width: 40%;
}

.chef {
    width: 40%;
    height: 40%;
}

.item {
    background-size: cover;
    background-position: center;
    width: 320px;
    height: 300px;
}

.meal {
    background-size: cover;
    background-position: center;
    max-width: 7vw;
    max-height: 7vw;
    /* width: 220px;
    height: 200px; */
}

.right-side {
    color: black;
    width: 40%;
    display: flex;
    flex-direction: column;
    height: 300px;
    align-items: center;
}



.details {
    background-color: white;
    width: 90%;
    margin: 5px;
    /* border-radius: 10px; */
}

select {
    height: 40px;
}

.details-container {
    padding-top: 60px;
    width: 100%;
    max-width: 1500px;
    display: flex;
    flex-direction: column;
    /* background-color: lightgray; */
    justify-content: center;
    align-items: center;
    justify-content: space-between;
}


.checkout-btn {
    background-color: green;
    border: none;
    height: 40px;
}

form {
    display: flex;
    flex-direction: column;
}

.logo {
    width: 20%;
    height: 20%;
    margin-bottom: 50px;
    margin-left: -500px;
}

.name {
    margin: 0;
}

.title {
    margin: 10px;
    color: black;
}

input {
    margin: 10px;
}

.buttom {
    /* background-color: lightgray; */
    padding: 10px;
    border-radius: 10px;
}

.right-side-title {
    color: black;
    font-size: 30px;
    margin: 0 auto;
}

.gif-loading {
    width: 200px;
    margin-bottom: 50px;
}

</style>


