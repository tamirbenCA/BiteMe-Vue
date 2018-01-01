<template>
    <section class="header-bar">
        <div class="header">
            <div class="logo">
                <router-link to="/">
                    <img src="../assets/Byte-Me-Logo.png" />
                </router-link>
            </div>

            <div>
                <input v-model="searchValue" type="text" placeholder="What you want to byte?" @keyup="searchByte" autofocus>
            </div>
            <div class="btns">

                <router-link to="/menu" tag="button" class="header-button">Menu</router-link>
                <router-link to="/aboutus" tag="button" exact class="header-button">How it works</router-link>
                <router-link to="/aboutus#our-mission" tag="button" class="header-button">Our mission</router-link>
                <router-link to="/login" tag="button" class="header-button" v-if="!loggedUser">Log In</router-link>
                <router-link to="/join" tag="button" class="join-button header-button" v-if="!loggedUser">Join</router-link>
                <router-link v-if="loggedUser" :to="`/manageorders/${userId}`" tag="button" class="header-button">Manage Orders</router-link>
                <router-link v-if="loggedUser" :to="`/additem`" tag="button" class="header-button">Add New Item</router-link>
                <button v-if="loggedUser" @click="logOut" class="header-button">Log Out</button>
                <div class="icons">
                    <i class="fa fa-shopping-basket" aria-hidden="true" @click="goToMyCart"></i>
                </div>
                <div class="orders">

                    <div class="dropdown" v-if="isActive">
                        <!-- <i style="color:red" class="fa fa-times" aria-hidden="true" @click="showChosenItems"></i> -->
                        <ul class="dropdown-cart" role="menu">
                            <li v-for="item in cart">
                                <div class="information">
                                    <img :src="item.imgUrl" alt="" style="height: 80px;width: 80px;" />
                                    <div class="item-info">
                                        <p>{{item.name}}</p>
                                        <p>Price:{{item.price}}$</p>
                                    </div>
                                    <p class="item">Quantity: {{item.quantity}}</p>
                                    <i class="fa fa-trash-o" aria-hidden="true" @click.stop="deleteItem(item)"></i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="lgn-user" v-if="loggedinUser && loggedinUser.name !== 'admin' ">
            Hello {{loggedinUser.name}}
        </div>
        <div class="lgn-user" v-else>
            <router-link to="/admin" v-if="adminLogged" class="admin"> Hello Admin</router-link>
        </div>
    </section>
</template>

<script>
import UserService from '../services/UserService.js';
import { SIGNOUT } from '../modules/UserModule.js';
import { LOAD_SEARCHED_ITMES, LOAD_ITEMS_BY_TAG } from '../modules/ShopModule.js';
import { mapGetters } from 'vuex';
import { REMOVE_FROM_CART } from '../modules/CartModule.js';



export default {
    name: 'HeaderBar',
    data() {
        return {
            keyUpInterval: null,
            // isAdmin: false,
            searchValue: '',
            isActive: false
        }
    },
    created() {
        var x = this.$store.getters.loggedinUser;
        console.log('nameOfLoggedInUser', x)
    },
    computed: {
        loggedUser() {
            return this.$store.getters.isUser;
        },
        adminLogged() {
            return this.$store.getters.isAdmin;
        },
        userId() {
            return this.$store.getters.userId
        },
        userName() {
            return this.$store.getters.loggedinUser.name
        },
        cart() {
            return this.$store.getters.cart;
        },
        cartLength() {
            return this.$store.getters.cartLength;
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
    },
    methods: {
        goToMyCart() {
            this.$router.push('/myCart/');
        },
        deleteItem(item) {
            // console.log(itemId)
            this.$store.commit({ type: REMOVE_FROM_CART, item })
        },
        showChosenItems() {
            console.log(this.cart)
            console.log(this.cartLength)
            // if (!this.cartLength) this.isActive = true;
            this.isActive = !this.isActive;
        },
        logOut() {
            this.$store.dispatch({ type: SIGNOUT })
        },
        searchByte() {
            clearTimeout(this.keyUpInterval)
            this.keyUpInterval = setTimeout(() => {
                // console.log('searching for a byte', this.searchValue)
                var keyWord = this.searchValue.toLowerCase();
                if (keyWord === '' || keyWord.length < 2) {
                    var tag = this.$store.getters.tag;
                    // console.log('tag in empty search: ', tag)
                    this.$store.dispatch({ type: LOAD_ITEMS_BY_TAG, tag })
                    this.$router.push(`/items/${tag}`)
                    return;
                };
                this.$router.push('/searchedItems/' + keyWord)
                this.$store.dispatch({ type: LOAD_SEARCHED_ITMES, keyWord })
            }, 1000);
        },
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

input{
    margin-left: 40px;
}
.header {
    display: flex;
    flex-direction: row;
    height: 102px;
    align-items: center;
    justify-content: space-between;
    width:1300px;
    margin-left: -200px;
}

.lgn-user {
    text-transform: capitalize;
    width: 100%;
    display: flex;
    margin-left: 60px;
}

.icons {
    display: flex;
    flex-direction: row;
}

h1,
h2 {
    font-weight: normal;
}

.fa-shopping-basket {
    margin-left: 30px;
    margin-right: 10px;
    font-size: 30px;
    cursor: pointer;
}


.log-out {
    width: 250px;
    display: flex;
    flex-direction: row;
}

.log-out-btn {
    width: 200px;
    height: 30px;
}

.map-button {
    width: 100px;
}

.right-side {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 500px;
}

.admin {
    text-decoration: none;
    font-weight: bold;
    padding-left: 5px;
    font-size: 20px;
}

.cart {
    display: flex;
    flex-direction: column;
    margin-top: -30px;
}

.btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* width: 460px; */
}

.three-icons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 460px;
}

a {
    color: #42b983;
}

.header-bar {
    height: 100px;
    display: flex;
    justify-content: center;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    /* height: 211px; */
    margin-top: 20px;
}

input {
    /* padding: 5px; */
    padding: 5px;
    padding-left: 55px;
    max-width: 300px;
    border: 1px solid #f5f5f5;
    font-size: 13px;
    /* color:gray; */
    background-image: url('../assets/search logo.png');
    background-repeat: no-repeat;
    background-position: left center;
    outline: 0;
}

button {
    padding: 5px;
    width: 10vw;
}

.header-button {
    /* width: 100px; */
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
}

.join-button {
    background-color: #00b22d;
    color: white;
}

.fa-shopping-cart {
    color: white;
    font-size: 40px;
}

.router-link-active {
    color: orange
}



.router-link-active {
    color: lightgreen !important;
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
