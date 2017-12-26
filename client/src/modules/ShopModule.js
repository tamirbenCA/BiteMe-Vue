export const LOAD_TAGS = 'shop/loadTags'
export const LOAD_ITEMS = 'shop/loadItems';
export const LOAD_ITEMS_BY_TAG = 'shop/loadItemsByTag';
import ShopService from '../services/ShopService.js';
import UserService from "../services/UserService.js";

const SET_ITEMS = 'shop/setItems';

const state = {
    items: [],
    tags: [],
    currentItem:null,
    tag:null
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
    
}
const getters = {
    tags: state => state.tags,  
    items: state => state.items
}

const actions = {
    [LOAD_TAGS]({ commit, payload }) {
        ShopService.loadTags()
            .then(tags => {
                tags = tags.data
                commit({ type: LOAD_TAGS, tags })
            })

    },
    [LOAD_ITEMS]({commit}) {
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
    [LOAD_ITEMS_BY_TAG]({commit},{tag}) {
        console.log('54',tag)
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
}
export default {
    state,
    mutations,
    getters,
    actions
} 