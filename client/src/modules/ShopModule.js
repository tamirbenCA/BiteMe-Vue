export const LOAD_TAGS = 'shop/loadTags'
export const LOAD_ITEMS = 'shop/loadItems';
export const LOAD_ITEM = 'shop/loadItem';
import ShopService from '../services/ShopService.js';
import UserService from "../services/UserService.js";

const SET_ITEMS = 'shop/setItems';

const state = {
    items: [],
    currItem: {},
    tags: []
}
const mutations = {
    [LOAD_TAGS](state, payload) {
        // console.log('mutating tags', payload.tags)
        state.tags = payload
    },
    [SET_ITEMS](state, {items}) {
        state.items = items;
        // console.log( state.items)
    },
    [LOAD_ITEM](state, item) {
        console.log('mutation item: ', item)
        state.currItem = item;
    }
}
const getters = {
    tags: state => state.tags,  
    items: state => state.items,
    currItem: state => state.currItem
}

const actions = {
    [LOAD_TAGS]({ commit, payload }) {
        ShopService.loadTags()
            .then(tags => {
                tags = tags.data
                commit({ type: LOAD_TAGS, tags })
            })

    },
    [LOAD_ITEMS]({ commit}) {
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
    [LOAD_ITEM]({commit}, {itemId}){
        // console.log('action: LOAD_ITEM itemId', itemId)
        return ShopService.getItemById(itemId)
            .then(item => {
                commit({type: LOAD_ITEM, item})
            })
    }
}
export default {
    state,
    mutations,
    getters,
    actions
} 