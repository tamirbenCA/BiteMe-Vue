<template>
<section>
    <div v-if="!pageReady">
        <img class="gif-loading" src="../assets/loading.gif">
    </div>
    <div v-else>
   <el-table
        :data="sellers"
        :default-sort = "{prop: 'Name', order: 'descending'}"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="id"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Name"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="Address"
            width="180">
        </el-table-column>
        <el-table-column
            prop="email"
            label="Email"
            width="180">
        </el-table-column>
        <el-table-column
            prop="itemsForSale"
            label="# of items for sale"
            sortable
            width="180">
        </el-table-column>
        <el-table-column
            label="Operations">
            <template slot-scope="scope">
                <el-button
                v-if="scope.row.isActive"
                size="mini"
                type="danger"
                @click="disableSeller(scope.row.id)">Disable</el-button>
                <el-button
                v-else
                size="mini"
                type="success"
                @click="disableSeller(scope.row.id)">Enable</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
    </section>
</template>

<script>
import swal from 'sweetalert'
import { LOAD_SELLERS , UPDATE_SELLER } from '../modules/ShopModule.js';
// import { UPDATE_SELLER } from '../modules/UserModule.js';

export default {
    name: 'HeaderBar',
    data() {
        return {
            pageReady: false
        }
    },
    methods: {
        disableSeller(sellerId) {
            console.log(sellerId)
            this.$store.dispatch({ type: UPDATE_SELLER, sellerId })
        }
    },
    created() {
        this.$store.dispatch({ type: LOAD_SELLERS })
            .then((sellers) => {
                console.log('sellers', sellers)
                this.pageReady = true;
            })
    },
    computed: {
        sellers() {
            return (this.$store.getters.items).map(seller => {
                return {
                    id: seller._id,
                    name: seller.name,
                    address: seller.address.city,
                    email: seller.email,
                    itemsForSale: seller.itemsForSale.length,
                    isActive: seller.isActive
                    }
            })
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.cell {
    text-transform: capitalize;
}

</style>
