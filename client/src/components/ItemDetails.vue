<template>
    <section>
        <div class="items-container" v-if="!pageReady">
            <img class="gif-loading" src="../assets/loading2.gif">
        </div>
        <div class="details-container" v-else>
            <div class="top-page">
                <div class="cover">
                    <div class="left-side">
                        <div class="top">
                            <div class="title">
                                <div class="top-detail">
                                    <router-link :to="`/item/${itemId}/edit`" v-if="loggedinUserIsChef">
                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                    </router-link>
                                    <p style="text-transform: capitalize;">{{item.name}}</p>

                                </div>
                            </div>
                            <div class="rank">
                                <div v-for="(start,idx) in rankOfMeal" :key="idx">
                                    <span>★</span>
                                </div>
                            </div>
                            <img class="item" :src="item.imgUrl" />
                            <p style="text-transform: capitalize; margin:18px;font-size:18px;">{{item.desc}}</p>
                        </div>
                        <div class="price" style="background-color:#ffffffa8">
                            <p style="margin-bottom:10px"> Price: {{item.price}}$ </p>
                            <div class="price-btm">

                                <el-input-number v-model="num1" @change="quantityChange({item})" :max="10"></el-input-number>
                                <button class="add-btn" @click="addItem(item)">Add To Cart</button>
                                <!-- <i class="fa fa-plus" @click="addItem(item)" aria-hidden="true"></i> -->
                                <!-- <i class="fa fa-thumbs-o-up" @click="addItem(item)" aria-hidden="true"></i> -->
                                <!-- <select @change="quantityChange({quantity: +$event.target.value, item})" name="quantity" :value="item.quantity">
                                                                    <option>0</option>
                                                                    <option v-for="(n, index) in 10" :key="index">{{n}}</option>

                                                                </select> -->
                            </div>
                        </div>
                    </div>
                    <div class="comments">
                        <div class="comment-top">
                            <h1 style="font-size:30px">Reviews</h1>
                        </div>
                        <ul class="comments-box">

                            <li class="comment" v-for="(comment, idx)  in item.comments" :key="idx">
                                <div class="cmt-div">
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                    <p style="text-transform: capitalize;">{{comment.userName}} ,</p>
                                    <p style="text-transform: capitalize;"> {{comment.comment}}</p>

                                    <div class="rank">
                                        <div v-for="(star ,idx) in comment.rank" :key="idx">
                                            <span>★</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="modal">

                            <form class="form-signin" novalidate @submit.prevent="sendComment(item._id,msg)">
                                <p>Add a comment</p>
                                <input class="msg" v-model="msg" @keydown="checkUser" type="text">
                                <div class="rank-chef">
                                    <p> Rank the meal</p>

                                    <el-input-number v-model="num8" controls-position="right" :min="1" :max="5"></el-input-number>
                                    <!-- <select style="margin-left:5px" @change="rankVal({quantity: +$event.target.value})">
                                                                        <option>0</option>
                                                                        <option v-for="(n, index) in 5" :key="index">{{n}}</option>
                                                                    </select> -->
                                </div>
                                <button class="midal-btn">Send</button>
                            </form>
                        </div>

                    </div>
                </div>
                <div class="middle">
                    <div class="chef-details" style="background-color:#ffffffa8">
                        <p class="cf-name"> Meet {{chef.name}} </p>
                        <div><img class="chef" :src="chef.imgUrl" /></div>

                        <p class="about-chef"> {{chef.about}} </p>
                    </div>
                    <div class="right-side">
                        <h3 style="font-size:20px;">See more of {{chef.name}}'s yummi meals </h3>
                        <ul>
                            <li style="display: flex; justify-content: center;" v-for="(meal, idx)  in meals" :key="idx" @click="showDetails(meal)">
                                <div class="more-item">
                                    <div class="cf-more-ml">{{meal.name}}</div>
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

export default {
    data() {
        return {
            isProcessing: false,
            rank: 0,
            msg: '',
            pageReady: false,
            itemId: '',
            isActive: false,
            itemsPurch: {},
            num1: 0,
            prod: null,
            num8: 1
        }
    },
    watch: {
        '$route.params.itemId'() {

            this.itemId = this.$route.params.itemId;
            this.$store.dispatch({ type: LOAD_SELLER, itemId: this.itemId })
        }
    },
    created() {
        var mealsIds = [];
        this.itemId = this.$route.params.itemId;
        // console.log( this.itemId)
        this.$store.dispatch({ type: LOAD_SELLER, itemId: this.itemId })
            .then((item) => {
                //  console.log(item)
                item.seller.itemsForSale.forEach((item) =>
                    mealsIds.push(item))
                this.$store.dispatch({ type: LOAD_ITEMS_BY_IDS, ids: mealsIds })
                    .then((items) => {
                        this.pageReady = true;
                    })
            })
    },
    methods: {
        checkUser() {
            if (!this.$store.getters.loggedinUser) {
                swal({
                    title: "You must log in to comment",
                    icon: "warning",
                }).then(_ => this.$router.push('/login'))
            }
        },
        addComment() {
            this.isActive = true;
        },
        sendComment(itemId, comment) {
            console.log(itemId, comment, this.num8)
            if (!this.$store.getters.loggedinUser) this.$router.push('/login');
            else {

                if (comment === '') {
                    swal({
                        title: "Please fill text",
                        icon: "warning",
                    });
                }
                else {
                    this.$store.commit({ type: UPDATE_ITEM, itemId, comment, quantity: this.num8, userName: this.$store.getters.loggedinUser.name });
                    swal({
                        title: "Thank you for reviewing",
                        icon: "success",
                    });
                    this.msg = '';

                }
            }
        },
        showDetails(item) {
            this.$router.push('/itemdetails/' + item._id);
        },
        quantityChange({ item }) {
            console.log(this.num1 + 1, item)
            this.quantity = this.num1 + 1;
        },

        addItem(item) {
            console.log(item)
            this.$store.commit({ type: UPDATE_CART, item, quantity: this.quantity });
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
        // comments() {
        //     return this.$store.getters.comments
        // },
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

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-btn {
    border: none;
    background-color: #b9ababab;
    color: #2f2c2cab;
    margin-left: 10px;
    cursor: pointer;
    height:38px;
    width:100px;
}

.rank-chef {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
}

.top-details-title {
    width: 200px;
    text-transform: capitalize;
    font-size: 25px;
}

.midal-btn {
    cursor: pointer;
}

.fa-thumbs-o-up {
    cursor: pointer;
}

.fa-plus {
    cursor: pointer;
}

.el-input-number .el-input__inner {
    padding: none;
}

.cf-more-ml {
    margin: 10px;
    font-size: 20px;
    text-transform: capitalize;
}

.cf-name {
    font-size: 20px;
    text-transform: capitalize;
}

.top-detail {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}

.el-input__inner {
    width: 104px;
}

.cover {
    display: flex;
    flex-direction: column;
}

.cmt-div {
    width: 100%;
    /* box-shadow: 1px 2px 6px 0px black; */
    display: flex;
    padding: 9px;
    align-items: center;
    height: 41px;
}

.comment-top {
    display: flex;
    align-items: center;
    width: 200px;
    justify-content: space-around;
    margin: auto;
}

.price-btm {
    display: flex;
    justify-content: space-around;
    width: 250px;
    margin: auto;
    align-items: center;
    justify-content: space-between;
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
    margin: none;
}

.fa-pencil {
    cursor: pointer;
    color: #2c3e50;
    margin-right: 7px;
}

.fa-commenting-o {
    font-size: 30px;
    cursor: pointer;
}

.modal {
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: lightgray;
    width: 100%;
    height: 245px;
    margin: auto;
}

.midal-btn {
    border-radius: 15px;
    border: none;
    width: 80px;
    height: 50px;
    margin-bottom: 5px;
    background-color: #99a9bf;
    font-size: 15px;
}

.title {
    font-size: 30px;
    font-weight: bold;
}

.middle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
}

h2 {
    margin: 0;
}

.comment {
    text-align: left;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 5px;
    background-color: #99a9bf;
}

.about-chef {
    word-wrap: break-word;
}

.fa-user {
    padding-right: 10px;
    font-size: 35px;
    color: lightcyan;
}

.comments {
    padding: 10px;
    border-top: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    width: 50%;
    width: 500px;
    /* border-radius: 5px; */
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
}

.left-side {
    display: flex;
    flex-direction: column;
    border-top: 1px solid gray;
    padding: 20px;
    margin-bottom: 31px;
    /* border-radius: 5px; */
    justify-content: space-around;
    height: 650px;
}

.chef-details {
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
    margin-bottom: 35px;
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
    width: 70%;
    height: 70%;
    margin-top: 30px;
}

.meal {
    background-size: cover;
    background-position: center;
    max-width: 20vw;
    max-height: 20vw;
}

.right-side {

    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.details {
    background-color: white;
    width: 90%;
    margin: 5px;
}

select {
    height: 40px;
    border: 1px solid black;
}

.details-container::after {
    background-color: white;
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
    background-color: #c7b9b940;
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    margin: auto;
    border: 1px solid lightgray;
    border-radius: 5px;
    /* box-shadow: 2px 3px 8px 0px black; */
    margin-bottom: 20px;
    margin-top: 50px;
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
}

.msg {
    width: 350px;
    padding: none;
    background-color: #f8f3f3;
    border-radius: 5px;
    height: 18px;
}


.buttom {
    padding: 10px;
    border-radius: 10px;
}

.right-side-title {
    font-size: 30px;
    margin: 0 auto;
}

.gif-loading {
    width: 100px;
    height: 100px;
}

@media screen and (max-width: 480px) {
    .top-page {
        flex-wrap: wrap;
    }

    .middle {
        margin-top: 45px;
    }
    .left-side {
        margin-left: 70px;
        margin-right: 75px;
    }
    .comments {
        width: 76%;
        margin-left: 45px;
    }
    .modal {
        width: 100%;
    }
    .about-chef {
        width: 90%;
    }
    .msg {
        width: 308px;
    }
    .item {
        width: 100%;
        height: 100%;
    }
}
</style>