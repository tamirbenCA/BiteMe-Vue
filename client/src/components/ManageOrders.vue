<template>
    <div>
        <h1>Manage Orders</h1>

        <h2>Items you sold</h2>
        <table>
            <tr>
                <th>Item Name</th>
                <th>Actions</th>
            </tr>
            <tr v-for="(order, index) in sellersItems" :key="index">
                <td>{{order.item.itemName}}</td>
                <td>
                    <!-- <button @click="approveOrder(order._id)" :class="order._id" class="button-approve">Approve</button> -->
                    <!-- <button @click="approveOrder(order._id)" :class="order._id" class="button">Approve</button> -->
                    <!-- <button @click="declineOrder(order._id)">Decline</button> -->
                    <button @click="declineOrder(order)">Details</button>
                    <button @click="deliverOrder(order)" :id="order._id" v-if="!!!order.isDelivered">Delivered</button>
                </td>
            </tr>
        </table>

        <h2>Items you bought</h2>
        <table>
            <tr>
                <th>Item Name</th>
                <th>Delivered</th>
            </tr>
            <tr v-for="(item, index) in buyersItems" :key="index">
                <td>{{item.item.itemName}}</td>
                <!-- <td>Processing: {{!!item.isProcessing}} -->
                    <!-- <span style="marginLeft: 50px">Delivered: {{!!item.isDelivered}}</span> -->
                <!-- </td> -->
                <td>{{!!item.isDelivered}}</td>
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
        // approveOrder(itemId) {
            // console.log('item approved in METHODS _id: ', itemId);
            // console.log(document.querySelector(`.button-approve`))
            // console.log(document.querySelector('.' + itemId))
            // console.log(document.getElementsByClassName(itemId))
            // var elButton = document.getElementsByClassName(itemId)
            // elButton.setAttribute('disabled')
            // document.querySelector().disabled = true;
        // },
        declineOrder(item) {
            console.log('item declined in METHODS _id: ', itemId);
        },
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


