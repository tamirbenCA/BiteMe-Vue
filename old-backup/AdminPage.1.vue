<template>
    <table>
        <tr>
            <th>seller name</th>
            <th>seller's address</th>
            <th>seller's # of items</th>
            <!-- <th>seller's # of orders</th> -->
            <th>actions</th>
        </tr>
        <tr class="user" v-for="(seller, idx) in sellers" :key="idx">
            <!-- <td>  -->
                <!-- <img class="image" :src="seller.imgUrl"> -->
                <!-- <span class="details" style="text-transform: capitalize"> {{seller.name}}</span> -->
            <td class="details" style="text-transform: capitalize"> {{seller.name}}</td>
            <td class="details" style="text-transform: capitalize"> {{seller.address.street}}, {{seller.address.city}}</td>
            <td class="details" style="text-transform: capitalize">{{seller.itemsForSale.length}}</td> 
            <td>
                <button v-if="seller.isActive" style="background-color:green" class="dis-btn" @click="disableSeller(seller)">
                    Disable
                </button>
                <button v-else style="background-color:red" class="dis-btn" @click="disableSeller(seller)">
                    Enable
                </button>
            </td>
        </tr>
    </table>
</template>

<script>
import swal from 'sweetalert'
import { LOAD_SELLERS } from '../modules/ShopModule.js';
import { UPDATE_USER } from '../modules/UserModule.js';

export default {
    name: 'HeaderBar',
    data() {
        return {

        }
    },
    methods: {
        disableSeller(seller) {
            console.log(seller)
            if (seller.isActive === true) {
                seller.isActive = false;
            }
            else {

                seller.isActive = true;
            }
            console.log(seller)
            this.$store.commit({ type: UPDATE_USER, seller })
            // this.$store.commit({ type: DELETE_ITEMS, mealsForSale})
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
            return this.$store.getters.items
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .details {
    width: 200px;
    text-align: start;
} */

.dis-btn {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 10px;
    color: white;
}
/* 
.image {
    background-size: cover;
    background-position: center;
    width: 120px;
    height: 90px;
} */

/* .user {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 20px;
} */

/* ul {
    list-style: none;
    margin-top: 50px;
} */

img {
    width: 10%;
    height: 10%;
}

th,
td {
    width: 30%;
    text-transform: capitalize;
    padding: 10px;
}

</style>
