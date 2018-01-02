import ShopService from '../services/ShopService';

// export const ADD_TO_CART = 'cart/ADD_TO_CART';
export const UPDATE_CART = '/UPDATE_CART';
export const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
export const CHECKOUT = 'cart/CHECKOUT';
export const CHECKOUT_SUCCESS = 'cart/CHECKOUT_SUCCESS';
export const CHECKOUT_ERROR = 'cart/CHECKOUT_ERROR';



const state = {
    items: [],
    loading: false,
    error: null
}

const mutations = {
    [UPDATE_CART](state, { item, quantity }) {
        // console.log(item, quantity)
        item.quantity = quantity;
        if (state.items.length === 0 && quantity > 0) {
            state.items.push(item);
            return
        }
        else var itemIdx = state.items.findIndex(meal => meal._id === item._id);
        if (itemIdx !== -1 && quantity > 0) {
            state.items.splice(itemIdx, 1)
            state.items.push(item)
            // console.log(itemIdx)
            // state.items[itemIdx].quantity = quantity;
            // console.log(state.items)

            // state.items = state.items.map(item => item)
        }

        if (itemIdx === -1 && quantity > 0) {
            state.items.push(item);
        } else if (quantity === 0) state.items.splice(itemIdx, 1);
        // console.log(state.items)
    },
    [REMOVE_FROM_CART](state, { item }) {
        // console.log(item)
        var itemIdx = state.items.findIndex(meal => meal._id === item._id);
        state.items.splice(itemIdx, 1);
        // console.log(state.items)
    },
    // [CHECKOUT](state) {
    //     state.loading = true;
    // },
    [CHECKOUT_SUCCESS](state) {
        state.items = [];
        state.loading = false;
    },
    [CHECKOUT_ERROR](state, error) {
        state.error = error;
        state.loading = false;
    },
}

const actions = {
    // checkout({ commit }, { data }) {
    [CHECKOUT]({ commit }, { data }) {
        var sellers = data.cart.map((item) => {
            return item.seller
        })

        var items = data.cart.map((item) => {
            return { itemId: item._id, itemName: item.name, seller: item.seller }
        })
        console.log('sellerssellerssellers', data)
        var order = {
            buyer: {
                buyerId: data.user._id,
                buyerName: data.user.name
            },
            isDelivered: false,
            items: items,
            totalSum: data.cartTotal,
            sellers: sellers
        }
        // console.log('order', data)
        // commit(CHECKOUT);
        ShopService.addOrder(order)
            .then(_ => {
                //   if (data.user.balance > data.cartTotal) {
                //     var newBalance = data.user.balance - data.cartTotal;
                commit(CHECKOUT_SUCCESS);
                //   } else if (data.user.balance < data.cartTotal) {
                //     var cartDifference = data.cartTotal - data.user.balance
                //     commit(CHECKOUT_SUCCESS);
                //     swal({
                //       title: "Busted!!!!",
                //       icon : "error",
                //       text : "You spent all your balance, please pay extra $" + cartDifference,
                //     });
                //   }
                //   commit({type: 'updateUserBalance' , cartTotalToUpdate: data.cartTotal })
            }).catch(err => {
                commit(CHECKOUT_ERROR, err)
            });
    },
};

const getters = {
    cartItems: function cartItems(state) {
        // console.log(state.items)
        return state.items
    },
    //   checkoutPending: state => state.loading,
    //   error          : state => state.error,
    cart: function cart(state, getters) {
        // console.log('getters.cartItemsgetters.cartItems', getters.cartItems)
        var x = getters.cartItems.filter(i => i.quantity);
        // console.log('getters.cart', x)
        return x
    },
    cartTotal: function cartTotal(state, getters) {
        var x = getters.cart.reduce((acc, item) => {
            return acc + (parseInt(item.quantity) * item.price);
        }, 0);
        // console.log('getters.cartTotal', x)
        return x
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}