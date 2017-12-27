<template>
    <section class="header-bar">

        <div>
            <input type="text" placeholder="What you want to byte?" @keyup="searchByte" autofocus>
            <!-- <button>Show Map</button> -->
            <router-link to="/map" tag="button" class="map-button">Show Map</router-link>
            <router-link to="/admin" v-if="adminLogged" class="admin">
                Admin
            </router-link>
        </div>
        <div class="logo">
            <router-link to="/">
                <img src="../assets/Byte-Me-Logo.png" />
            </router-link>
        </div>
        <div class="btns" v-if="!loggedUser">
            <!-- <div class="cart">
                    <span class="balance"> 0</span>
                    <i class="fa fa-shopping-cart" aria-hidden="true"> </i>
                </div> -->
            <router-link to="/login" tag="button" class="login-button">Log In</router-link>
            <router-link to="/join" tag="button" class="join-button">Join</router-link>
        </div>
        <div v-else>
            <button @click="logOut">Log Out</button>
            <router-link :to="'/manageorders/' + userId" tag="button">Manage Orders</router-link>
        </div>
    </section>
</template>

<script>
import _ from 'lodash'

import UserService from '../services/UserService.js';
import { SIGNOUT } from '../modules/UserModule.js';

export default {
    name: 'HeaderBar',
    data() {
        return {
            userId: this.$store.getters.userId, 
            keyUpInterval: null,
            isAdmin: false,
        }
    },
    computed: {
        loggedUser() {
            return this.$store.getters.isUser;
        },
        adminLogged() {
            return this.$store.getters.loggedinUser;
        },

    },
    methods: {
        logOut() {
            this.$store.dispatch({ type: SIGNOUT })
        },
        searchByte() {
            clearTimeout(this.keyUpInterval)
            this.keyUpInterval = setTimeout(function() {
                console.log('searching for a byte')
            }, 350);

            // _.throttle(() => {
            //     console.log('I get fired every two seconds!')
            // }, 2000)
        }
    },
    //     computed: {

    //     // ...mapGetters([
    //     //   'cartLength',
    //     //   'cart'
    //     // ]),
    //     ...mapGetters(['loggedinUser', 'user']),
    //   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

.map-button{
width:100px;
}

.logo{
    margin-left: -150px;
}

.admin {
    text-decoration: none;
    font-weight: bold;
    padding-left: 5px;
    font-size: 20px;
}

.balance {
    font-size: 25px;
    color: green;
}

.cart {
    display: flex;
    flex-direction: column;
    margin-top: -30px;
}

/* .btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 280px;
} */

a {
    color: #42b983;
}

.header-bar {
    height: 120px;
    display: flex;
    justify-content: center;
    justify-content: space-around;
    align-items: center;
    /* background-color: #4a4848; */
    /* background-color: lightgray; */
    margin-top: none;
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

.join-button {
    background-color: #00b22d;
    color: white;
    width: 100px;
}

.login-button {
    width: 100px;
}

.fa-shopping-cart {
    color: white;
    font-size: 40px;
}
</style>
