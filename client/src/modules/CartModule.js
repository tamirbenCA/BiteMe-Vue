import ShopService from '../services/ShopService';

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
        item.quantity = quantity;
        if (state.items.length === 0 && quantity > 0) {
            state.items.push(item);
            return
        }
        else var itemIdx = state.items.findIndex(meal => meal._id === item._id);
        if (itemIdx !== -1 && quantity > 0) {
            state.items.splice(itemIdx, 1)
            state.items.push(item)
        }

        if (itemIdx === -1 && quantity > 0) {
            state.items.push(item);
        } else if (quantity === 0) state.items.splice(itemIdx, 1);
    },
    [REMOVE_FROM_CART](state, { item }) {
        var itemIdx = state.items.findIndex(meal => meal._id === item._id);
        state.items.splice(itemIdx, 1);
    },
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
    [CHECKOUT]({ commit }, { data }) {
        console.log('cartModule line 50', data)
        var sellers = data.cart.map((item) => {
            return item.seller
        })
        var items = data.cart.map((item) => {
            return { itemId: item._id, itemName: item.name, seller: item.seller, qnty: item.quantity }
        })
        var order = {
            buyer: {
                buyerId: data.user._id,
                buyerName: data.user.name,
                buyerAddress: (data.user.address.street) + ', ' + (data.user.address.city)
            },
            isDelivered: false,
            items: items,
            totalSum: data.cartTotal,
            sellers: sellers,
            deliveryDate:data.deliveryDate
        }
        console.log('line 69:', order)
        ShopService.addOrder(order)
            .then(_ => {
                commit(CHECKOUT_SUCCESS);
            }).catch(err => {
                commit(CHECKOUT_ERROR, err)
            });
    },
};

const getters = {
    // cartItems: function cartItems(state) {
    //     return state.items
    // },
    cart: function cart(state, getters) {
        // var x = getters.cartItems.filter(i => i.quantity);
        var cartItems = state.items.filter(i => i.quantity);
        return cartItems
    },
    cartTotal: function cartTotal(state, getters) {
        var cartTotal = getters.cart.reduce((acc, item) => {
            return acc + (parseInt(item.quantity) * item.price);
        }, 0);
        return cartTotal
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}