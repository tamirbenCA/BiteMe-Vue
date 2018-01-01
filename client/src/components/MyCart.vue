<template>
    <section>

        <div v-if="cartTotal === 0">
            <p class="title" >No Items To Show</p>
        </div>

        <ul class="dropdown" role="menu" v-else>
            <button @click.stop="backToMenu">Continue shopping</button>
            <li v-for="item in cart">
                {{item.name}}
                <div class="information">
                    <img :src="item.imgUrl" alt="" style="height: 80px;width: 80px;" />
                    <div class="item-info">

                        <p>Price:{{item.price}}$</p>
                    </div>
                    <i class="fa fa-trash-o" aria-hidden="true" @click.stop="deleteItem(item)"></i>
                </div>
                <select @change="quantityChange({quantity: +$event.target.value, item})" name="quantity" :value="item.quantity">
                    <option value=""></option>
                    <option v-for="n in 10">{{n}}</option>
                </select>
            </li>
            <p>Cart Total:{{cartTotal}}</p>
            <button @click="checkout">Checkout</button>
        </ul>

    </section>
</template>

<script>
import UserService from '../services/UserService.js';
import { SIGNOUT } from '../modules/UserModule.js';
import { LOAD_SEARCHED_ITMES, LOAD_ITEMS_BY_TAG } from '../modules/ShopModule.js';
import { mapGetters } from 'vuex';
import { REMOVE_FROM_CART } from '../modules/CartModule.js';
import { UPDATE_CART } from '../modules/CartModule.js';
import checkout from '../modules/CartModule.js';





export default {
    name: 'myCart',
    data() {
        return {
            user: null,
            total: 0,
            items: []
        }
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
        checkout() {
            var loggedinUser = JSON.parse(localStorage.getItem('loggedinUser'));
            if (!loggedinUser) {
                this.$router.push('/login');
            }
            this.user = loggedinUser.name;
            this.$store.dispatch({ type: 'checkout', data: { user: loggedinUser, cartTotal: this.cartTotal, cart: this.cart } });
        },

        backToMenu() {
            this.$router.push('/menu');
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

.title{
    font-size:20px;
    margin: 50px;
}
.orders {
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    margin-right: 100px;
    height: 100px;
}

ul {
    display: flex;
    flex-direction: column;
    list-style: none;
}

li {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.dropdown {
    display: flex;
    flex-direction: column;
    z-index: 10000;
    background-color: lightgray;
    width: 100%;
    width: 500px;
    margin-right: 500px;
}

.information {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-items: center;
}
</style>
