<template>
    <div class="manage-orders">
        <h1>Manage Orders</h1>
        <h2>Items sold</h2>
        <el-table
            v-loading="loading2"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            :data="sellersItems"
            :default-sort = "{prop: 'date', order: 'descending'}"
            cell-style="background-color: #75b8ff33"
            row-style="background-color: transparent"
            header-row-style="background-color: transparent"
            header-cell-style="background-color: #75b8ff33"
            border
            style="width: 100%"
            class="manage-orders-table">
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
                    type="success"
                    @click="deliverOrder(scope.row.id)">Mark as Shipped</el-button>
                </template>
            </el-table-column>
        </el-table>

        <h2>Items bought</h2>
        <el-table
        v-loading="loading2"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        border
        :data="buyersItems"
        :default-sort = "{prop: 'date', order: 'descending'}"
        style="width: 100%"
        cell-style="background-color: #75b8ff33"
        row-style="background-color: transparent"
        header-row-style="background-color: transparent"
        header-cell-style="background-color: #75b8ff33"
        class="manage-orders-table">
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
            loading2: true
        }
    },
    created() {
        this.userId = this.$route.params.userid
        var p1 = this.$store.dispatch({type: LOAD_SELLERS_ITEMS, userId: this.userId});
        var p2 = this.$store.dispatch({type: LOAD_BUYERS_ITEMS, userId: this.userId});
        console.log(p1, p2)
        Promise.all([p1, p2]).then(_ => this.loading2 = false);
    },
    computed: { 
        sellersItems () {
            var orders = this.$store.getters.sellersItems;
            var mapOrders = orders.map(order => {
                return {
                    id: order._id,
                    date: new Date(order.deliveryDate).toLocaleString('en-GB'),
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
                    date: new Date(order.deliveryDate).toLocaleString('en-GB'),
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
                if (mapOrder.isDelivered === 'false') {
                    mapOrder.isDelivered = 'Not Yet'
                } else {
                    mapOrder.isDelivered = new Date(+mapOrder.isDelivered).toLocaleString('en-GB')
                }
                console.log('line 142', mapOrder.isDelivered)
            })
            return mapOrders;
        },
    },
    methods: {
        deliverOrder(orderId) {
            this.$store.dispatch({type: MARK_DELIVERED, orderId: orderId})
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manage-orders {
    width: 960px;
    margin: auto;
}

.manage-orders-table {
  text-align: left;
}

.manage-orders-table, td, tr, .cell {
  background-color: transparent !important
}

#app > div > div:nth-child(3) > div.el-table__header-wrapper > table > thead > tr {
    background-color: #75b8ff33;

}
</style>


