<template>
    <div>
        <h1>Manage Orders</h1>
        <h2>Items sold</h2>
        <el-table
        :data="sellersItems"
        :default-sort = "{prop: 'date', order: 'descending'}"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="Order To-Date"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="buyerName"
            label="Buyer Name"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="items"
            label="Items Name"
            width="300">
        </el-table-column>
        <el-table-column
            label="Operations">
            <template slot-scope="scope">
                <el-button
                v-if="!scope.row.isDelivered"
                size="mini"
                @click="deliverOrder(scope.row.id)">Shipped</el-button>
            </template>
        </el-table-column>
    </el-table>

        <h2>Items bought</h2>
        <el-table
        :data="buyersItems"
        :default-sort = "{prop: 'date', order: 'descending'}"
        style="width: 100%">
        <el-table-column
            prop="date"
            label="Order To-Date"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="sellers"
            label="Sellers Name"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="items"
            label="Items Name"
            width="300">
        </el-table-column>
        <el-table-column
            prop="isDelivered"
            label="Shipped"
            width="300">
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
import { LOAD_SELLERS_ITEMS , LOAD_BUYERS_ITEMS , MARK_DELIVERED} from '../modules/ShopModule';

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
            var orders = this.$store.getters.sellersItems;
            var mapOrders = orders.map(order => {
                return {
                    id: order._id,
                    date: order.deliveryDate,
                    buyerName: order.buyer.buyerName,
                    items: order.items,
                    isDelivered: order.isDelivered
                }
            });
            mapOrders.forEach(mapOrder => {
                var items = mapOrder.items
                    .filter(item => this.userId === item.seller.sellerId )
                    .map(item => item.itemName)
                    .toString()
                mapOrder.items = items;
            })
            return mapOrders;
        },
        buyersItems() {
            var orders = this.$store.getters.buyersItems;            
            var mapOrders = orders.map(order => {
                return {
                    id: order._id,
                    date: order.deliveryDate,
                    sellers: order.sellers,
                    items: order.items,
                    isDelivered: order.isDelivered.toString()
                }
            })
            mapOrders.forEach(mapOrder => {
                var items = mapOrder.items
                    .map(item => item.itemName)
                    .toString()
                mapOrder.items = items;
                var sellers = mapOrder.sellers
                    .map(seller => seller.sellerName)
                    .toString()
                mapOrder.sellers = sellers;
                if (mapOrder.isDelivered !== 'false') {
                    mapOrder.isDelivered = Date(+mapOrder.isDelivered)
                }
                mapOrder.isDeliverd = mapOrder.isDelivered.toString()
            })
            return mapOrders;
        },
    },
    methods: {
        deliverOrder(orderId) {
            // console.log('order in delivery:', orderId)
            this.$store.dispatch({type: MARK_DELIVERED, orderId: orderId})
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


