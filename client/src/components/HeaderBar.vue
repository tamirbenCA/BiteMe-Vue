<template>
    <section class="header-bar">
        <div class="top-bar">
            <div class="logo">
                <router-link to="/" @click.native="setTag">
                    <img class="lg-img" src="../assets/Byte-Me-Logo.png" />
                </router-link>
            </div>

        </div>
        <!-- <div class="header"> -->
        <div class="btns-right">
            <div class="btns-right-ttl">
                <div class="btns-righ-btm">
                    <input v-model="searchValue" type="text" @keyup="searchByte" autofocus>
                </div>
                <div class="btns-righ-top">
                    <router-link to="/meals" tag="button" @click.native="setTag" class="header-button">Meals</router-link>
                    <router-link to="/aboutus" tag="button" exact class="header-button">How it works</router-link>
                    <router-link to="/aboutus#our-mission" tag="button" class="header-button">Our mission</router-link>
                    <router-link to="/sellerslist" tag="button" class="header-button">Sellers List</router-link>
                    <router-link v-if="loggedUser" :to="`/manageorders/${userId}`" tag="button" class="header-button">Manage Orders</router-link>
                    <router-link v-if="loggedUser" :to="`/additem`" tag="button" class="header-button">Add New Item</router-link>
                </div>

            </div>
        </div>
        <div class="btns-left">
            <div class="btns-left-top">
                <router-link to="/login" tag="button" class="join-button header-button" v-if="!loggedUser">Log In</router-link>
                <button v-if="loggedUser" @click="logOut" class="exit-button header-button">Log Out</button>
                <i class="fa fa-shopping-basket" aria-hidden="true" @click="goToMyCart"></i>
            </div>
            <div class="btns-left-btm">
                <p class="lgn-user" v-if="loggedinUser && loggedinUser.name !== 'admin' " style="color:orange;  ">
                    Hello {{loggedinUser.name}}
                </p>
                <p class="lgn-user" v-else>
                    <router-link to="/admin" v-if="adminLogged" class="admin">
                        <p class="adm-hello">Hello Admin</p>

                    </router-link>
                </p>
            </div>
        </div>

        <!-- </div> -->

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
            }, 400);
        },
        setTag() {
            this.$store.commit({ type: SET_TAG, tag: null })
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adm-hello {
    margin: 0;
    width: 113px;
    margin-left: -15px;
}

.btns-righ-btm {
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-left: 10px;
}

.btns-left-btm {
    width: 150px;
}

.btns-left-top {
    display: flex;
    margin-top: 20px;
}

.btns-left {
    width: 20%;
    display: flex;
    flex-direction: column;
}

.btns-right-ttl {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    margin-top: 10px;
}

.btns-righ-top {
    display: flex;
    margin-left: -50px;
    justify-content: space-between;
    width: 100%;
}

.btns-right {
    width: 60%;
    height: 90%;
    display: flex;
    justify-content: center;
    justify-content: space-around;
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
    width: 20%;
    /* margin-to: 20px; */
}

input {
    /* margin-left: 15px; */
    border-radius: 5px;

    /* height: 20px; */
}



.lgn-user {
    text-transform: capitalize;
    display: flex;
    font-size: 20px;
    text-align: right;
    display: column;
    margin-left: 50px;
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
    color: rgb(111, 133, 154);
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
    color: orange;
    /* font-weight: bold; */
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
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: rgb(38, 49, 60);
    width: 100%;
    max-width: 1650px;
}

input {
    padding: 5px;
    padding-left: 55px;
    border: 1px solid #f5f5f5;
    font-size: 13px;
    background-image: url('../assets/search logo.png');
    background-repeat: no-repeat;
    background-position: left center;
    outline: 0;
    height: 25px;
    /* margin-right: 50px; */
    width: 300px;
    border: 1px solid #f1ece4;
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
    color: #f1ece4;
}

.join-button {
    background: linear-gradient(to right, #597a7f, #5ea3b3);
    border: 1px #3db2c5 solid;
    color: #f1ece4;
    /* border-radius: 5px; */
    height: 44px;
    width: 100px
}

.fa-shopping-cart {
    color: white;
    font-size: 40px;
}

.router-link-active {
    color: orange
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

.lg-img {

    height: 130px;
    width: 150px;
    margin-left: 20px;
}

@media screen and (max-width: 480px) {
    .lg-img {

        height: 90px;
        width: 100px;
        margin-left: 0;
        margin-top: -28px;
    }

    .logo {
        margin-left: 0;
        height: 90px;
        width: 100px;
    }
    .header-button {
        font-size: 12px;
        width: 100px;
        /* text-align: left; */
    }

    .btns-righ-btm {
        margin-left: 15px;
    }

    .btns-left-top {
        width: 366px;
        height: 69px;
        flex-direction: column-reverse;
        margin-top: 0px;
        margin-left: 10px;
    }
    .btns-righ-top {
        width: 160%;
        margin-left: -100px;
    }
    .btns-right-ttl {
        margin-left: 18px;
        margin-top: 30px;
    }
    .join-button {
        height: 35px;
        width: 46px;
    }
    .fa-shopping-basket {
        font-size: 20px;
        height: 28px;
        margin-left: 8px;
        height: 28px;
        width: 30px;
        margin-bottom: 4px;
    }

    .lgn-user {
        font-size: 15px;
        margin-top: -85px;
        margin-left: -3px;
    }
    .btns-left-btm {
        width: 100px;
        height: 50px;
    }

    .exit-button {
        width: 59px;
        margin-left: -7px;
    }

    .adm-hello {
        font-size: 15px;
        margin-left: -45px;
    }
}
</style>
