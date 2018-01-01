export const LOAD_TAGS = 'shop/loadTags';
export const LOAD_ITEMS = 'shop/loadItems';
export const LOAD_ITEMS_BY_TAG = 'shop/loadItemsByTag';
export const SET_TAG = 'shop/setTag';
export const LOAD_ITEM = 'shop/loadItem';
export const LOAD_SELLER = 'shop/loadSeller';
export const LOAD_SELLERS_ITEMS = 'shop/toApproveItems';
export const LOAD_BUYERS_ITEMS = 'shop/orderStatusItems';
export const LOAD_SEARCHED_ITMES = 'shop/searchedItems';
export const APPROVE_ITEM = 'shop/approveItem'
export const LOAD_ITEMS_BY_IDS = 'shop/loadItemsByIds'
export const LOAD_CHEFS_BY_IDS = 'shop/loadChefsByIds'
export const UPDATE_ITEM = 'shop/updateItem';
export const LOAD_SELLERS = 'shop/loadChefs';
export const DELETE_SELLER = 'shop/deleteSeller';
export const MARK_DELIVERED = 'shop/markDelivered'

import ShopService from '../services/ShopService.js';
import UserService from "../services/UserService.js";

const SET_ITEMS = 'shop/setItems';
const SET_CHEFS = 'shop/setChefs';


const state = {
    items: [],
    chefs: [],
    tags: [],
    currentItem: null,
    tag: null,
    currItem: {},
    tags: [],
    currSeller: null,
    sellersItems: null,
    buyersItems: null,
    searchedItems: null,
}
const mutations = {
    [UPDATE_ITEM](state, payload) {
        console.log(payload.comment)
        console.log(payload.itemId)
        console.log(payload.quantity)
        ShopService.addComment(payload.itemId, payload.comment,payload.quantity)
    },
    [DELETE_SELLER](state, payload) {
        console.log('payload._id44', payload.sellerId)
        UserService.deleteSeller(payload.sellerId)
    },
    // [DELETE_ITEMS](state, payload) {
    //     UserService.deleteItems(payload)
    // },
    [LOAD_TAGS](state, payload) {
        // console.log('mutating tags', payload.tags)
        state.tags = payload
    },
    [SET_ITEMS](state, { items }) {
        state.items = items;
        // console.log( state.items)
    },

    [SET_CHEFS](state, { items }) {
        state.chefs = items;
        // console.log( state.items)
    },
    [LOAD_ITEM](state, payload) {
        state.currItem = payload.item;
        // console.log(state.currItem)        
    },

    [LOAD_SELLER](state, payload) {
        state.currItem = payload.item;
        state.currSeller = payload.seller;
        // console.log('payload41',  state.currItem )
        // console.log('payload41',state.currSeller )
    },
    // [LOAD_ITEM](state, item) {
    //     // console.log('mutation item: ', item)
    //     state.currItem = item;
    // },
    [LOAD_SELLERS_ITEMS](state, { items }) {
        state.sellersItems = items
        // console.log('seller items in mutataion: ', items)
    },
    [LOAD_BUYERS_ITEMS](state, { items }) {
        state.buyersItems = items
        // console.log('buyer items in mutataion: ', items)
    },
    [LOAD_SEARCHED_ITMES](state, { items }) {
        state.searchedItems = items;
    },
    [SET_TAG](state, {tag}) {
        // console.log('tag in MUTATIONS: ', tag)
        state.tag = tag;
    },
    [MARK_DELIVERED](state, {orderId}) {
        var orderIdx = state.sellersItems.findIndex(item => item._id === orderId)
        state.sellersItems[orderIdx].isDelivered = Date.now();
    }
}
const getters = {
    tags: state => state.tags,
    tag: state => state.tag,
    items: state => state.items,
    currItem: state => state.currItem,
    currSeller: state => state.currSeller,
    sellersItems: state => state.sellersItems,
    buyersItems: state => state.buyersItems,
    chefs: state => state.chefs,
    searchedItems: state => state.searchedItems,
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
                return items

            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_SELLERS]({ commit }) {
        return UserService.getSellers()
            .then(items => {
                console.log(items)
                commit({ type: SET_ITEMS, items })
                return items
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },

    [LOAD_ITEMS_BY_IDS]({ commit }, { ids }) {
        // console.log('ids',ids)
        return ShopService.getItemsByIds(ids)
            .then(items => {
                // console.log(items)
                // items.shift();
                commit({ type: SET_ITEMS, items })
                return items
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },

    [LOAD_CHEFS_BY_IDS]({ commit }, { ids }) {
        // console.log('ids',ids)
        return ShopService.getChefsByIds(ids)
            .then(items => {
                // console.log(items)
                // items.shift();
                commit({ type: SET_CHEFS, items })
                return items
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },

    [LOAD_ITEMS_BY_TAG]({ commit }, { tag }) {
        // console.log('54', tag)
        return UserService.getItemsByTag({ tag })
            .then(items => {
                // console.log(items)
                commit({ type: SET_ITEMS, items })
                return items
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_ITEM]({ commit }, { itemId }) {
        // console.log('action: LOAD_ITEM itemId', itemId)
        return ShopService.getItemById(itemId)
            .then(item => {
                commit({ type: LOAD_ITEM, item })
            })

    },

    [LOAD_SELLER]({ commit }, { itemId }) {
        // console.log(itemId)
        return ShopService.getItemById(itemId)
            .then(item => {
                // console.log(item.seller.sellerId)
                return ShopService.getChefById(item.seller.sellerId)
                    .then(seller => {
                        // console.log(seller)
                        commit({ type: LOAD_SELLER, item, seller })
                        return { item: item, seller: seller }
                    })
            })
    },

    [LOAD_SELLERS_ITEMS]({ commit }, { userId }) {
        // console.log('loading to approve items in ACTIONS id:', userId)
        return ShopService.loadSellersItems(userId).then(items => {
            commit({ type: LOAD_SELLERS_ITEMS, items: items.data })
        }).catch(() => {
            // console.error('promise in actions NOT GOOD')
        })
    },

    [LOAD_BUYERS_ITEMS]({ commit }, { userId }) {
        // console.log('loading order status items in ACTIONS')
        return ShopService.loadBuyersItems(userId).then(items => {
            commit({type: LOAD_BUYERS_ITEMS, items: items.data})
        })        
    },
    [LOAD_SEARCHED_ITMES]({ commit }, { keyWord }) {
        // console.log('keyWord in ACTIONS: ', keyWord)
        // var tag = state.tag
        var tag = this.getters.tag
        // console.log('!!!!!!!!!tag in load search!!!!!!!: ', tag)
        return UserService.getItemsByTag({tag, keyWord})
        .then(items => {
            // console.log(items)
            commit({ type: SET_ITEMS, items })
        })
        .catch(err => {
            commit(SET_ITEMS, [])
            throw err;
        })
    },
    [MARK_DELIVERED]({ commit }, {order}) {
        console.log('shop:', order)
        return ShopService.markDelivered({order})
        .then(_ => {
            commit({type: MARK_DELIVERED, order})
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions
} 