<template>
    <section>

        <div v-if="cartTotal === 0">
            <p class="title">No Items To Show</p>
        </div>
        <!-- <p>Date: <input type="text" id="datepicker"></p> -->
        <div class="box" v-else>
            <div class="header">
                <!-- <div class="top-header"> -->
                <div class="cnt-shop">
                    <i @click.stop="backToMenu" class="fa fa-hand-o-left" aria-hidden="true"></i>
                    <p style="margin:0">CONTINUE SHOPPING</p>
                </div>
                <div class="cart-header">
                    <div style="font-weight:bold;font-size:20px;width:300px;"> YOUR SHOPPING CART</div>
                    <br>
                    <div> Review of
                        <span style="font-weight:bold">{{cart.length}}</span> items:
                        <span style="font-weight:bold">{{cartTotal}}$</span>
                    </div>
                </div>
            </div>
            <!-- <div class="cart"> -->
            <div class="item-container">
                <div class="item" v-for="(item, idx) in cart" :key="idx">
                    <div class="item-back">
                        <img class="meal" :src="item.imgUrl" alt="">
                        <div class="item-info">
                            <p style="text-transform: uppercase;">{{item.name}}</p>
                            <p style="text-transform: uppercase;">{{item.desc}}</p>
                            <div class="payment">
                                <select @change="quantityChange({quantity: +$event.target.value, item})" name="quantity" :value="item.quantity">
                                    <option value=""></option>
                                    <option v-for="n in 10">{{n}}</option>
                                </select>
                                <span style="margin-top:5px;">X</span>
                                <div style="font-size:25px">{{item.price}}$</div>

                                <i class="fa fa-trash-o" aria-hidden="true" @click.stop="deleteItem(item)"></i>
                            </div>

                        </div>
                        <div class="div"></div>
                    </div>

                </div>
                <div class="btm-cont">
                    <div class="date">
                        <el-date-picker v-model="value2" type="datetime" placeholder="Select date and time" :picker-options="pickerOptions1" requited>
                        </el-date-picker>
                    </div>
                    <button class="ck-out" @click="checkout">Checkout</button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import UserService from '../services/UserService.js';
import { SIGNOUT } from '../modules/UserModule.js';
import { LOAD_SEARCHED_ITMES, LOAD_ITEMS_BY_TAG } from '../modules/ShopModule.js';
import { mapGetters } from 'vuex';
import { REMOVE_FROM_CART, UPDATE_CART, CHECKOUT } from '../modules/CartModule.js';


export default {
    name: 'myCart',
    data() {
        return {
            user: null,
            total: 0,
            items: [],
            isActive: false,

            pickerOptions1: {
                shortcuts: [{
                    text: 'Today',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: 'Yesterday',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: 'A week ago',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            value1: '',
            value2: ''
        };

    },
    created() {
    },
    computed: {
        cart() {
            return this.$store.getters.cart;
        },
        cartTotal() {
            return this.$store.getters.cartTotal;
        },
    },
    methods: {
        runFunc() {
            datepicker();
        },
        checkout() {
            console.log(this.value2)
            var loggedinUser = JSON.parse(localStorage.getItem('loggedinUser'));
            if (!loggedinUser) {
                this.$router.push('/login');
            }
            this.user = loggedinUser.name;
            this.$store.dispatch({ type: CHECKOUT, data: { user: loggedinUser, cartTotal: this.cartTotal, cart: this.cart } });


        },
        showModal() {
            this.isActive = true;
            setTimeout(function() {
                this.isActive = false;
            }, 3000);
        },
        backToMenu() {
            this.$router.push('/meals');
        },
        deleteItem(item) {
            console.log(item)
            this.$store.commit({ type: REMOVE_FROM_CART, item })
        },
        quantityChange({ quantity, item }) {
            console.log('quantityquantity', quantity)
            console.log('itemitem', item)
            this.$store.commit({ type: UPDATE_CART, item, quantity });
        }
    },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btm-cont {
    /* display: flex; */
    flex-direction: column;
}

.fa-hand-o-left {
    cursor: pointer;
}

.date {
    display: flex;
    align-items: left;
    margin-left: 10px;
}

.goodbye-img {
    width: 500px;
    height: 500px;
    border-radius: 250px;
}

.ck-out {
    background-color: lightgreen;
    height: 50px;
    border-radius: 5px;
    width: 150px;
    margin: auto;
    box-shadow: 2px 3px 6px 0px black;
    border: none;
    font-size: 17px;
    cursor: pointer;
    margin-top: 20px;
}

.cnt-shop {
    display: flex;
    justify-content: space-around;
    width: 25%;
    height: 30px;
}

.top-header {
    display: flex;
    /* width: 250px; */
    justify-content: space-around;
    cursor: pointer;
}

.item-info {
    display: flex;
    flex-direction: column;
    margin: auto;
}

.item {
    display: flex;
    flex-direction: row;
    height: 150px;
    /* border: 1px solid black; */
    box-shadow: 2px 3px 6px 2px black;
    margin-bottom: 50px;
    display: block;
}

.box {
    /* border: 1px solid lightgray; */
    /* height: 300px; */
    display: block;
    width: 900px;
    margin: auto;
    margin-bottom: 50px;
    margin-top: 20px;
    height: 100%;
}

.header {
    border: 1px solid #efe9e991;
    height: 130px;
    width: 100%;
    display: flex;

    padding-top: 10px;
    border-radius: 5px 5px 0 0;
    justify-content: space-between;
}

.cart {
    background-color: #efe9e9;
    width: 100%;
    display: flex;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 0 0 5px 5px;

    /* font-weight:bold; */
}

.cart-header {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 30px;
    padding-top: 30px;
    margin-right: 300px;
}

.meal {
    background-size: cover;
    background-position: center;
    width: 200px;
    height: 150px;
}

.item-container {
    /* display: flex; */
    flex-direction: column;
    /* justify-content: space-around; */
}

li {
    /* background-color: white; */
}


.item-back {
    display: flex;
    width: 100%;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    /* margin-left: none; */
}

.div {
    background-color: lightgreen;
    width: 20%;
    height: 150px;
}

select {
    border: 1px solid black;
    border-radius: 5px;
    /* padding-left: 7px;
    padding-right: 5px;
    width: 22px; */
}

select:hover {
    background-color: lightgreen;
}

.payment {
    display: flex;
    justify-content: space-around;
}

.fa-trash-o {
    font-size: 25px;
}

.title {
    height: 50px;

    margin-top: 50px;
    margin-bottom: 50px;
    font-size: 40px;
}
</style>
