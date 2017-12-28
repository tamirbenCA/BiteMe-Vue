<template>
    <section class="header-bar">

        <div class="logo">
            <router-link to="/">
                <img src="../assets/Byte-Me-Logo.png" />
            </router-link>
        </div>

        <div>
            <input v-model="searchValue" type="text" placeholder="What you want to byte?" @keyup="searchByte" autofocus>
            <!-- <button>Show Map</button> -->
            <!-- <router-link to="/map" tag="button" class="map-button">Show Map</router-link> -->
            <router-link to="/admin" v-if="adminLogged" class="admin">Admin</router-link>
        </div>
        {{userName}}
        <!-- <div class="btns" v-if="!loggedUser"> -->
        <div class="btns">
            <router-link to="/menu" tag="button" class="header-button">Menu</router-link>
            <router-link to="/aboutus" tag="button" exact class="header-button">How it works</router-link>
            <router-link to="/aboutus#our-mission" tag="button" class="header-button">Our mission</router-link>
            <router-link to="/login" tag="button" class="header-button" v-if="!loggedUser">Log In</router-link>
            <router-link to="/join" tag="button" class="join-button header-button" v-if="!loggedUser">Join</router-link>
            <router-link v-if="loggedUser" :to="`/manageorders/${userId}`" tag="button" class="header-button">Manage Orders</router-link>
            <button v-if="loggedUser" @click="logOut" class="header-button">Log Out</button>
        </div>
    </section>
</template>

<script>
import UserService from '../services/UserService.js';
import { SIGNOUT } from '../modules/UserModule.js';
import { LOAD_SEARCHED_ITMES } from '../modules/ShopModule.js';

export default {
    name: 'HeaderBar',
    data() {
        return {
            keyUpInterval: null,
            // isAdmin: false,
            searchValue: ''
        }
    },
    created() {
    
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
    },
    methods: {
        logOut() {
            this.$store.dispatch({ type: SIGNOUT })
        },
        searchByte() {
            clearTimeout(this.keyUpInterval)
            this.keyUpInterval = setTimeout(() => {
                // console.log('searching for a byte', this.searchValue)
                var keyWord = this.searchValue.toLowerCase();
                if (keyWord === '' || keyWord.length < 2) return;
                this.$router.push('/searchedItems/' + keyWord)
                this.$store.dispatch({type: LOAD_SEARCHED_ITMES, keyWord})
                }, 350);
        },
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    cursor: pointer;
    list-style: none;
    display: flex;
    flex-direction: row;
    width: 245px;
    padding: 0;
    /* display: flex; */
    justify-content: space-around;
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


/* 
.logo {
    margin-left: -80px;
} */

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

.balance {
    font-size: 25px;
    color: green;
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
</style>
