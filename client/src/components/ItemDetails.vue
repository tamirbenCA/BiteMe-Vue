<template>
    <section>
        <div class="items-container" v-if="!pageReady">
            <img class="gif-loading" src="../assets/loading.gif">
        </div>
        <div class="details-container" v-else>
            <div class="modal" v-if="isActive === true">
                <i class="fa fa-times-circle" aria-hidden="true" @click="closeModal"></i>
                <form class="form-signin" novalidate @submit.prevent="sendComment(item._id,msg)">
                    <p>Add a comment</p>
                    <input v-model="msg" type="text">
                    <div class="rank-chef">
                        Rank the meal
                        <select style="margin-left:5px" @change="rankVal({quantity: +$event.target.value})">
                            <option>0</option>
                            <option v-for="(n, index) in 5" :key="index">{{n}}</option>
                        </select>
                    </div>
                    <button class="midal-btn">Send</button>
                </form>
            </div>

            <div class="top-page">
                <!-- <div class="left-side" v-if="!isProcessing"> -->
                <div class="cover">
                    <div class="left-side">
                        <div class="top">
                            <p class="title">
                                <router-link :to="`/item/${itemId}/edit`" v-if="loggedinUserIsChef">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </router-link>
                                <p style="text-transform: capitalize; font-size:25px;">{{item.name}}</p>

                            </p>
                            <div class="rank">
                                <div v-for="(start,idx) in rankOfMeal" :key="idx">
                                    <span>★</span>
                                </div>
                            </div>
                            <img class="item" :src="item.imgUrl" />
                            <p style="text-transform: capitalize; margin:10px" >{{item.desc}}</p>
                        </div>
                        <div class="price" style="background-color:#ffffffa8">
                            <p style="margin-bottom:10px"> Price: {{item.price}}$ </p>
                            <div class="price-btm">
                                <select @change="quantityChange({quantity: +$event.target.value, item})" name="quantity" :value="item.quantity">
                                    <option>0</option>
                                    <option v-for="(n, index) in 10" :key="index">{{n}}</option>

                                </select>
                                <!-- <i class="fa fa-thumbs-up" aria-hidden="true" @click="addItem" style="font-size:30px"></i> -->
                            </div>
                        </div>

                    </div>
                    <div class="comments">
                        <div class="comment-top">
                            <h1 style="font-size:30px">Reviews</h1>
                            <i class="fa fa-commenting-o" aria-hidden="true" @click="addComment"></i>
                        </div>
                        <ul class="comments-box">

                            <li class="comment" v-for="(comment, idx)  in item.comments" :key="idx">
                                <div class="cmt-div">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                    <p style="text-transform: capitalize;">{{comment.userName}} :</p>
                                    <p style="text-transform: capitalize;"> {{comment.comment}}</p>
                                   
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
                <div class="middle">
                    <div class="chef-details" style="background-color:#ffffffa8">
                        <!-- <h1 style="color:black"> About chef</h1> -->
                        <p style="font-size:20px; text-transform: capitalize;"> Meet {{chef.name}} </p>
                        <div><img class="chef" :src="chef.imgUrl" /></div>

                        <p class="about-chef"> {{chef.about}} </p>
                    </div>
                    <div class="right-side">
                        <h3 style="font-size:20px;">See more of {{chef.name}}'s yummi meals </h3>
                        <ul>
                            <li style="display: flex; justify-content: center;" v-for="(meal, idx)  in meals" :key="idx" @click="showDetails(meal)">
                                <div class="more-item">
                                    <div style="margin:10px;">{{meal.name}}</div>
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
            rank: 0,
            msg: '',
            pageReady: false,
            itemId: '',
            isActive: false,
            itemsPurch: {},
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
        addItem() {
            swal({
                title: "Item added to cart",
                icon: "success",
            });
        },
        addComment() {

            this.isActive = true;
            console.log(this.isActive)
        },
        sendComment(itemId, comment) {
            if (comment !== '') {
                if (!this.$store.getters.loggedinUser.name) this.$router.push('/login');
                else {
                    this.$store.commit({ type: UPDATE_ITEM, itemId, comment, quantity: this.rank.quantity, userName: this.$store.getters.loggedinUser.name });
                    this.isActive = false;
                }
         

            }

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
            swal({
                title: "Item added to cart",
                icon: "success",
            });
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
        loggedinUserIsChef() {
            if (this.$store.getters.loggedinUser) {
                if (this.chef._id === this.$store.getters.loggedinUser._id) return true;
            } else return false;
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
.cover {
    display: flex;
    flex-direction: column;
}

.cmt-div {
    width: 100%;
    box-shadow: 1px 2px 6px 0px black;
    display: flex;
    padding: 9px;
        align-items: center;

}

.comment-top {
    display: flex;
    align-items: center;
    width: 200px;
    justify-content: space-around;
    margin: auto;
    margin-bottom: 15px;
}

.price-btm {
    display: flex;
    justify-content: space-around;
    width: 100px;
    margin: auto;
}

select {
    border: 1px solid black;
    border-radius: 5px;
}

.rank {
    display: flex;
    flex-direction: row;
    color: gold;
    padding-left: 10px;
    /* width: 100px; */
    margin: none;
}

.fa-pencil {
    cursor: pointer;
    color: black;
}

.fa-commenting-o {
    font-size: 30px;

    cursor: pointer;
}

.modal {
    border: 1px solid lightgray;
    border-radius: 15px;
    background-color: lightgray;
    z-index: 1000;
    display: block;
    width: 300px;
    height: 300px;
    margin: auto;
    box-shadow: 3px 3px 6px 3px black;
}

.midal-btn {
    border-radius: 15px;
    border: none;
    width: 80px;
    height: 50px;
    margin-bottom: 5px;
    background-color: lightgreen;
    font-size: 15px;
    /* margin: auto;
    margin-top: 20px;
    margin-top: none; */
}

.title {
    font-size: 30px;
    font-weight: bold;
}

.middle {
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    justify-content: center;
    align-items: center;
    justify-content: space-around;
}


h2 {
    margin: 0;
}

.comment {
    text-align: left;
    color: black;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 5px;
    background-color: #75f975d6;
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
    width: 50%;
    /* margin: 5px; */
    width: 500px;
    border-radius: 5px;
    margin: inherit;
}

.comments-box {
    padding: 0;
    border-radius: 5px;
}

.top-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    max-width: 1400px;
    margin-bottom: none;
    margin-top: none;
}

.price {
    border: 1px solid lightgray;
    padding-bottom: 40px;
    /* padding-top: 20px; */
    /* width: 80%; */
}

.left-side {
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    padding: 20px;
    /* margin-left: 80px; */
    border-radius: 5px;
    justify-content: space-around;
    height: 650px;
}

.chef-details {
    /* border: 1px solid lightgray; */
    padding-bottom: 40px;
    width: 65%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

li {
    list-style: none;
    display: flex;
}

.star {
    color: gold;
}

.more-item {
    cursor: pointer;
}

.top {
    /* border-bottom: 1px solid lightgray; */
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: initial;
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
    background-size: cover;
    background-position: center;
    width: 60%;
    height: 60%;
}

.item {
    background-size: cover;
    background-position: center;
    width: 400px;
    height: 300px;
    margin-top: 50px;
}

.meal {
    background-size: cover;
    background-position: center;
    max-width: 20vw;
    max-height: 20vw;
    /* width: 220px;
    height: 200px; */
}

.right-side {
    color: black;
    width: 40%;
    display: flex;
    flex-direction: column;

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
    border: 1px solid black;
}

.details-container::after {
    background-color: white;
    /* background: url("../img/background.jpg"); */
    /* background-repeat: no-repeat; */
    /* content: ""; */
    opacity: 0.5;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: -1;
}

.details-container {
    padding-top: 60px;
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    /* background-color: white; */
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    border: 1px solid lightgray;
    border-radius: 5px;
    box-shadow: 2px 3px 8px 0px black;
    margin-bottom: 20px;
}


.checkout-btn {
    background-color: green;
    border: none;
    height: 40px;
}

form {
    display: flex;
    flex-direction: column;
    height: 250px;
    justify-content: space-around;
    justify-content: space-around;
    align-items: center;
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
    padding: 5px;
    border-radius: 5px;
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


