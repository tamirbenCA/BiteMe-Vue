<template>
    <div>
        <h1>Manage Orders</h1>

        <h2>Items sold</h2>
        <table>
            <tr>
                <!-- <th>Order Id</th> -->
                <th>Buyer Name</th>
                <th>Item Name</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(order, index) in sellersItems" :key="index">
                <!-- <td>{{order._id}}</td> -->
                <td>{{order.buyer.buyerName}}</td>
                <td>
                    <span v-for="(item, index) in order.items" :key="index">{{item.itemName}}</span>
                </td>
                <td>
                    <button @click="deliverOrder(order)" :id="order._id" v-if="!!!order.isDelivered">Delivered</button>
                </td>
            </tr>
        </table>

        <h2>Items bought</h2>
        <table>
            <tr>
                <!-- <th>Order Id</th> -->
                <th>Seller Name</th>
                <th>Item Name</th>
                <th>Delivered</th>
            </tr>
            <tr v-for="(order, index) in buyersItems" :key="index">
                <!-- <td>{{order._id}}</td> -->
                <td>
                    <span v-for="(seller, index) in order.sellers" :key="index">{{seller.sellerName}}</span>
                </td>
                <td>
                    <span v-for="(item, index) in order.items" :key="index">{{item.itemName}}</span>
                </td>
                <td>{{!!order.isDelivered}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { LOAD_SELLERS_ITEMS , LOAD_BUYERS_ITEMS , MARK_DELIVERED} from '../modules/ShopModule';
// import { LOAD_BUYERS_ITEMS } from '../modules/ShopModule';
// import { APPROVE_ITEM } from '../modules/ShopModule';

export default {
    data() {
        return {
            userId: '',
        }
    },
    // beforeRouteEnter(to, from, next) {
    //     console.log('to', to)
    //     console.log('from', from)
    //     console.log('userId in store:', this.$store.getters.userId)
    //     // if (to.params.userid === this.$store.getters.userId) {
    //         // next()
    //     // } else {
    //         // console.log('in else')
    //         // next(false)
    //         // this.$router.push('/')
    //         // }
    // },
    created() {
        this.userId = this.$route.params.userid
        this.$store.dispatch({type: LOAD_SELLERS_ITEMS, userId: this.userId});
        this.$store.dispatch({type: LOAD_BUYERS_ITEMS, userId: this.userId});       
        // console.log('manage orders user id: ', this.userId)
    },
    computed: { 
        sellersItems () {
            return this.$store.getters.sellersItems
        },
        buyersItems() {
            var buyers = this.$store.getters.buyersItems;
            return buyers;
            // return this.$store.getters.buyersItems
        },
    },
    methods: {
        deliverOrder(item) {
            // console.log('item deliverd in METHODS _id: ', item._id);
            // console.log(document.getElementsByClassName(item._Id))
            // document.getElementById(itemId).disabled = true;
            item.isDelivered = Date.now()
            console.log('item:', item)
            this.$store.dispatch({type: MARK_DELIVERED, order: item})
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    list-style: none;
}

table {
    margin: auto;
    border-spacing: 5px;
    width: 60%;
    text-align: left;
}

td {
    text-align: left;
}

</style>


