export const LOAD_TAGS = 'shop/loadTags';
export const LOAD_ITEMS = 'shop/loadItems';
export const LOAD_ITEMS_BY_TAG = 'shop/loadItemsByTag';
export const SET_TAG = 'shop/setTag';
export const SAVE_ITEM = 'shop/saveItem';
export const LOAD_ITEM = 'shop/loadItem';
export const LOAD_SELLER = 'shop/loadSeller';
export const LOAD_SELLERS_ITEMS = 'shop/toApproveItems';
export const LOAD_BUYERS_ITEMS = 'shop/orderStatusItems';
export const LOAD_SEARCHED_ITMES = 'shop/searchedItems';
export const APPROVE_ITEM = 'shop/approveItem'
export const LOAD_ITEMS_BY_IDS = 'shop/loadItemsByIds'
export const LOAD_SELLERS_BY_IDS = 'shop/loadChefsByIds'
export const UPDATE_ITEM = 'shop/updateItem';
export const LOAD_SELLERS = 'shop/loadChefs';
// export const DELETE_SELLER = 'shop/deleteSeller';
export const MARK_DELIVERED = 'shop/markDelivered'
export const UPDATE_SELLER = 'shop/updateSeller';
export const LOAD_TOP_MEALS = 'shop/loadTopMeals';
export const DISABLE_ITEM = 'shop/deleteItem';

const SET_ITEMS = 'shop/setItems';

import ShopService from '../services/ShopService';
import UserService from '../services/UserService';

const state = {
    items: [],
    chefs: [],
    currentItem: null,
    tag: null,
    currItem: {},
    tags: [],
    comments: [],
    currSeller: null,
    sellersItems: null,
    buyersItems: null,
    searchedItems: null,
}
const mutations = {
    [UPDATE_ITEM](state, payload) {
        console.log(payload)
        var updatedItem = ShopService.addComment(payload.itemId, payload.comment, payload.quantity, payload.userName)
            .then(updatedItem => {
                state.currItem = updatedItem;
                console.log(updatedItem)
            })
    },
    // [DELETE_SELLER](state, payload) {
    //     console.log('payload._id44', payload.sellerId)
    //     UserService.deleteSeller(payload.sellerId)
    // },
    [LOAD_TAGS](state, payload) {
        state.tags = payload
    },
    [SET_ITEMS](state, { items }) {
        // state.items = items;
        state.items = ShopService.shuffleArr(items)
        // state.items = items;
        // console.log( state.items)
    },
    [LOAD_ITEM](state, payload) {
        state.currItem = payload.item;
    },

    [LOAD_SELLER](state, payload) {
        state.currItem = payload.item;
        state.currSeller = payload.seller;
    },
    [LOAD_SELLERS_ITEMS](state, { items }) {
        state.sellersItems = items
    },
    [LOAD_BUYERS_ITEMS](state, { items }) {
        state.buyersItems = items
    },
    [LOAD_SEARCHED_ITMES](state, { items }) {
        state.searchedItems = items;
    },
    [SET_TAG](state, { tag }) {
        state.tag = tag;
    },
    [MARK_DELIVERED](state, { orderId }) {
        var orderIdx = state.sellersItems.findIndex(item => item._id === orderId)
        state.sellersItems[orderIdx].isDelivered = Date.now();
    },
    [UPDATE_SELLER](state, { sellerId }) {
        var sellerInState = (state.items).find(item => item._id === sellerId)
        sellerInState.isActive = !sellerInState.isActive
    }
}
const getters = {
    tags: state => state.tags,
    tag: state => state.tag,
    items: state => state.items,
    currItem: state => state.currItem,
    comments: state => state.currItem.comments,
    currSeller: state => state.currSeller,
    sellersItems: state => state.sellersItems,
    buyersItems: state => state.buyersItems,
    chefs: state => state.chefs,
    searchedItems: state => state.searchedItems,
}

const actions = {
    [UPDATE_SELLER]({ commit }, { sellerId }) {
        // console.log('inside action', sellerId)
        UserService.getSellerById(sellerId)
            .then(seller => {
                // console.log('seller is:', seller)
                seller.isActive = !seller.isActive
                UserService.changeUserActivity(seller)
                return seller;
            })
            .then(updatedSeller => {
                // console.log('line 71, seller:', updatedSeller)
                // console.log('line 72, sellerId:', updatedSeller._id)
                commit({ type: UPDATE_SELLER, sellerId: updatedSeller._id })
            })
    },
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
                commit({ type: SET_ITEMS, items })
                return items

            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_TOP_MEALS]({ commit }) {
        return ShopService.getTopMeals()
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
                commit({ type: SET_ITEMS, items })
                return items
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_ITEMS_BY_IDS]({ commit }, { ids }) {
        return ShopService.getItemsByIds(ids)
            .then(items => {
                commit({ type: SET_ITEMS, items })
                return items
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_SELLERS_BY_IDS]({ commit }, { ids }) {
        return ShopService.getSellersByIds(ids)
            .then(items => {
                commit({ type: SET_CHEFS, items })
                return items
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_ITEMS_BY_TAG]({ commit }, { tag }) {
        return UserService.getItemsByTag({ tag })
            .then(items => {
                commit({ type: SET_ITEMS, items })
                return items
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [LOAD_ITEM]({ commit }, { itemId }) {
        return ShopService.getItemById(itemId, 'item')
            .then(item => {
                commit({ type: LOAD_ITEM, item })
            })
    },
    [LOAD_SELLER]({ commit }, { itemId }) {
        // console.log(itemId)
        return ShopService.getItemById(itemId, 'item')
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
        return ShopService.loadSellersItems(userId).then(items => {
            commit({ type: LOAD_SELLERS_ITEMS, items: items.data })
        }).catch(() => {
            console.error('promise in actions NOT GOOD')
        })
    },
    [LOAD_BUYERS_ITEMS]({ commit }, { userId }) {
        return ShopService.loadBuyersItems(userId).then(items => {
            commit({ type: LOAD_BUYERS_ITEMS, items: items.data })
        })
    },
    [LOAD_SEARCHED_ITMES]({ commit }, { keyWord }) {
        var tag = this.getters.tag
        return UserService.getItemsByTag({ tag, keyWord })
            .then(items => {
                commit({ type: SET_ITEMS, items })
            })
            .catch(err => {
                commit(SET_ITEMS, [])
                throw err;
            })
    },
    [MARK_DELIVERED]({ commit }, { orderId }) {
        ShopService.getItemById(orderId, 'order')
            .then(order => {
                order.isDelivered = Date.now();
                // console.log('line 269:', order)
                return ShopService.markDelivered(order)
            })
            .then(_ => {
                commit({ type: MARK_DELIVERED, orderId })
            })
    },
    [SAVE_ITEM]({ commit }, { itemToUpdate }) {
        return ShopService.saveItem(itemToUpdate)
    },
    [DISABLE_ITEM]({ commit }, { item }) {
        ShopService.disableItem(item)
    }

}

export default {
    state,
    mutations,
    getters,
    actions
} 