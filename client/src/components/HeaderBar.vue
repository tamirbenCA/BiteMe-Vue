<template>
    <section class="header-bar">
        <div class="top-bar">
            <div class="logo">
                <router-link to="/" @click.native="setTag">
                    <img src="../assets/logo.png" />
                </router-link>
            </div>
            <div>
                <input v-model="searchValue" type="text" placeholder="What you want to byte?" @keyup="searchByte" autofocus>

            </div>
        </div>
        <div class="header">
            <div class="lgn-user" v-if="loggedinUser && loggedinUser.name !== 'admin' ">
                Hello {{loggedinUser.name}}
            </div>
            <div class="lgn-user" v-else>
                <router-link to="/admin" v-if="adminLogged" class="admin"> Hello Admin</router-link>
            </div>
            <div class="btns-right">
                <router-link to="/menu" tag="button" @click.native="setTag" class="header-button">Menu</router-link>
                <router-link to="/aboutus" tag="button" exact class="header-button">How it works</router-link>
                <router-link to="/aboutus#our-mission" tag="button" class="header-button">Our mission</router-link>
                <router-link to="/sellerslist" tag="button" class="header-button">Sellers List</router-link>
                <router-link to="/login" tag="button" class="header-button" v-if="!loggedUser">Log In</router-link>
                <router-link to="/join" tag="button" class="join-button header-button" v-if="!loggedUser">Join</router-link>
                <router-link v-if="loggedUser" :to="`/manageorders/${userId}`" tag="button" class="header-button">Manage Orders</router-link>
                <router-link v-if="loggedUser" :to="`/additem`" tag="button" class="header-button">Add New Item</router-link>
                <button v-if="loggedUser" @click="logOut" class="header-button">Log Out</button>
                <i class="fa fa-shopping-basket" aria-hidden="true" @click="goToMyCart"></i>
            </div>

        </div>

    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import UserService from '../services/UserService.js';
import { SIGNOUT } from '../modules/UserModule.js';
import { LOAD_SEARCHED_ITMES, LOAD_ITEMS_BY_TAG, SET_TAG } from '../modules/ShopModule.js';
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
        // console.log('nameOfLoggedInUser', x)
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
            console.log('LOGIN USER', this.$store.getters.loggedinUser.name)
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
            .then(_ => this.$router.push('/'))
        },
        searchByte() {
            clearTimeout(this.keyUpInterval)
            this.keyUpInterval = setTimeout(() => {
                var keyWord = this.searchValue.toLowerCase();
                this.$router.push({ path: '/items', query: { tag: this.$store.getters.tag, term: keyWord } })
                this.$store.dispatch({ type: LOAD_SEARCHED_ITMES, keyWord })
            }, 1000);
        },
        setTag() {
            this.$store.commit({ type: SET_TAG, tag: null })
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btns-right {
    width: 100%;
    margin-right: 50px;
}

img {
    width: 80%;
    height: 80%;
}

.top-bar {
    /* height: 410px; */
    display: flex;
    flex-direction: row;
    align-items: center;
    /* margin-top: 20px; */
}

input {
    margin-left: 40px;
    border-radius: 5px;
    height: 30px;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 7px 0 7px 0;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    width: 100%;
}

.lgn-user {
    text-transform: capitalize;
    display: flex;
    width: 200px;
    margin-left: 40px;
    font-size: 20px;
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
    /* width:100%; */
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

    padding: 5px;
    height: 150px;
    display: flex;
    flex-direction: column;
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
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 17px;
}

.join-button {
    background-color: lightgreen;
    color: gray;
    border-radius: 5px;
}

.fa-shopping-cart {
    color: white;
    font-size: 40px;
}

.router-link-active {
    color: orange
}



.router-link-active {
    color: gray;
    /* color: lightgreen !important; */
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
