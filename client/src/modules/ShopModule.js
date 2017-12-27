export const LOAD_TAGS = 'shop/loadTags';
export const LOAD_ITEMS = 'shop/loadItems';
export const LOAD_ITEMS_BY_TAG = 'shop/loadItemsByTag';
export const LOAD_ITEM = 'shop/loadItem';

export const LOAD_SELLERS_ITEMS = 'shop/toApproveItems';
export const LOAD_BUYERS_ITEMS = 'shop/orderStatusItems';

export const APPROVE_ITEM = 'shop/approveItem'

import ShopService from '../services/ShopService.js';
import UserService from "../services/UserService.js";

const SET_ITEMS = 'shop/setItems';

const state = {
    items: [],
    tags: [],
    currentItem: null,
    tag: null,
    currItem: {},
    tags: [],
    sellersItems: null,
    buyersItems: null,
}
const mutations = {
    [LOAD_TAGS](state, payload) {
        // console.log('mutating tags', payload.tags)
        state.tags = payload
    },
    [SET_ITEMS](state, { items }) {
        state.items = items;
        // console.log( state.items)
    },
    [LOAD_ITEM](state, item) {
        // console.log('mutation item: ', item)
        state.currItem = item;
    },
    [LOAD_SELLERS_ITEMS](state, {items}) {
        // console.log('seller items in mutataion: ', items)
        state.sellersItems = items
    },
    [LOAD_BUYERS_ITEMS](state, {items}) {
        // console.log('buyer items in mutataion: ', items)
        state.buyersItems = items
    }
}
const getters = {
    tags: state => state.tags,
    items: state => state.items,
    currItem: state => state.currItem,
    sellersItems: state => state.sellersItems,
    buyersItems: state => state.buyersItems,
}

const actions = {
    [LOAD_TAGS]({ commit, payload }) {
        ShopService.loadTags()
            .then(tags => {
                tags = tags.data
                commit({ type: LOAD_TAGS, tags })
            })

    },
    [LOAD_ITEMS]({ commit }) {
        return UserService.getItems()
            .then(items => {
                // console.log(items)
                commit({ type: SET_ITEMS, items })


            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_ITEMS_BY_TAG]({ commit }, { tag }) {
        console.log('54', tag)
        return UserService.getItemsByTag(tag)
            .then(items => {
                // console.log(items)
                commit({ type: SET_ITEMS, items })
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_ITEM]({ commit }, { itemId }) {
        console.log('action: LOAD_ITEM itemId', itemId)
        return ShopService.getItemById(itemId)
            .then(item => {
                commit({ type: LOAD_ITEM, item })
            })
    },
    [LOAD_SELLERS_ITEMS] ({commit}) {
        console.log('loading to approve items in ACTIONS')
        return ShopService.loadSellersItems().then(items => {
            // console.log('items: ', items)
            commit({type: LOAD_SELLERS_ITEMS, items})
        })
    },
    [LOAD_BUYERS_ITEMS] ({commit}) {
        console.log('loading order status items in ACTIONS')
        return ShopService.loadBuyersItems().then(items => {
            commit({type: LOAD_BUYERS_ITEMS, items})
        })        
    }
}
export default {
    state,
    mutations,
    getters,
    actions
} 