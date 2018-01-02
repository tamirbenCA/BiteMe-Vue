<template>
    <section class="sellers-container">

        <!-- <table class="sellers-list"> -->
        <!-- <tr> -->
        <div>
            <p style="font-size:40px;">OUR SELLERS</p>
            <p style="font-size:20px;">CLICK ON THEM TO SEE WHAT THEY ARE COOKING</p>
        </div>
        <!-- <th>seller name</th> -->
        <!-- <th>seller address</th> -->
        <!-- </tr> -->
        <!-- <div class="sellers"> -->
            <!-- <tr v-for="(seller, idx) in sellers" :key="idx" @click="sellerPage(seller._id)" class="tr-seller"> -->
            <ul class="sellers">
                <li v-for="(seller, idx) in sellers" :key="idx" @click="sellerPage(seller._id)">
                    <img  :src="seller.imgUrl" alt="">
                    <p style="text-transform: capitalize;font-size:20px">{{seller.name}}</p>
                </li>

            </ul>
        <!-- </div> -->

        <!-- <td>{{seller.name}}</td> -->

        <!-- <td>{{seller.address.city}}</td> -->
        <!-- </tr> -->
        <!-- </table> -->
        <!-- <ul> -->
        <!-- <li class="user" v-for="(seller, idx) in sellers" :key="idx"> -->
        <!-- <img class="image" :src="seller.imgUrl"> -->
        <!-- <div class="details" style="text-transform: capitalize"> {{seller.name}} </div> -->
        <!-- <div class="details" style="text-transform: capitalize"> {{seller.address.street}}, {{seller.address.city}}</div> -->
        <!-- <router-link :to="`/items/seller/${seller._id}`" tag="button">View This Seller Items</router-link> -->
        <!-- </li> -->
        <!-- </ul> -->
    </section>
</template>

<script>

import { LOAD_SELLERS } from '../modules/ShopModule.js';

import swal from 'sweetalert'


export default {
    name: 'HeaderBar',
    data() {
        return {

        }
    },
    methods: {
        sellerPage(sellerId) {
            // alert(`click ${sellerId}`)
            this.$router.push(`/items/seller/${sellerId}`)
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_SELLERS })
            .then((items) => {
                console.log('items20', items)
            })
    },
    computed: {
        sellers() {
            return (this.$store.getters.items).filter(seller => seller.isActive)
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sellers-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* margin: 25px 0px; */
}

h1 {
    margin-bottom: 50px;
}

li{
    cursor: pointer;
    list-style: none;
}

p{
    margin-bottom: 50px;
}
.sellers {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
    margin: auto;
    margin-bottom: 50px;
}


/* th,
td {
    width: 30%;
    text-transform: capitalize;
} */

img {
    background-size: cover;
    background-position: center;
    width: 150px;
    height: 180px;
}

.tr-seller {
    cursor: pointer;
    margin-right: 150px;
}

tr {
    display: flex;
    flex-direction: row;
}
</style>
