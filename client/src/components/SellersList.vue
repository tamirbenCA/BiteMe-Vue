<template>
    <section class="sellers-container">

        <div>
            <p style="font-size:40px;">OUR SELLERS</p>
            <p style="font-size:20px;">CLICK ON THEM TO SEE WHAT THEY ARE COOKING</p>
        </div>

        <div class="sellers">
            <ul class="sellers">
                <li v-for="(seller, idx) in sellers" :key="idx" @click="sellerPage(seller._id)">
                    <img :src="seller.imgUrl" alt="">
                    <p style="text-transform: capitalize;font-size:20px">{{seller.name}}</p>
                </li>
            </ul>
        </div>
        <!-- <h1>OUR SELLERS</h1>
                    <h4>CLICK ON THEM TO SEE WHAT THEY ARE COOKING</h4>

                    <table class="sellers-list">
                        <tr>
                            <! <th colspan="2">seller name</th> -->
        <!-- <th>seller name</th>
                            <th>seller address</th>
                            <th>available meals</th>
                        </tr> -->
        <!-- <tr v-for="(seller, idx) in sellers" :key="idx" @click="sellerPage(seller._id)" class="tr-seller">
                            <td><img class="seller-img" :src="seller.imgUrl"></td>
                            <td>{{seller.name}}</td>
                            <td>{{seller.address.city}}</td>
                            <td>{{seller.itemsForSale.length}}</td>
                        </tr>
                    </table> -->
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
        margin-top: 50px;

}

h1 {
    margin-bottom: 50px;
}

li {
    cursor: pointer;
    list-style: none;
}

p {
    margin-bottom: 50px;
}

.sellers {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: auto;
    margin-bottom: 50px;
}

.sellers-list {
    /* display: flex; */
    /* flex-direction: column;; */
    /* justify-content: center; */
    /* justify-content: space-around; */
    width: 100%;
}





/* th,
td {
    width: 30%;
    text-transform: capitalize;
} */

img {
    background-size: cover;
    background-position: center;
    width: 180px;
    height: 180px;
}

.seller-img {
    /* background-size: cover; */
    /* background-position: center; */
    width: 50px;
    height: 50px;
}

.tr-seller {
    cursor: pointer;
}

tr {
    display: flex;
    flex-direction: row;
}
</style>
