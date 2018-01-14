import UserService from "../services/UserService.js";
import ShopService from "../services/ShopService.js";
import StorageService from "../services/StorageService.js";

export const SIGNUP = 'user/signup';
export const SIGNIN = 'user/signin';
export const SIGNOUT = 'user/signout';
export const SET_USER = 'user/setUser';
export const UPDATE_SELLER_ITEMS = 'user/updateSellerItems';

var STORAGE_KEY = 'loggedinUser';

export default {
    state: {
        // loggedinUser: getUserFromStorage(),
        loggedinUser: StorageService.loadFromStorage(STORAGE_KEY),
        user: null,
    },
    getters: {
        isUser(state) {
            return !!state.loggedinUser
        },
        loggedinUser(state) {
            return state.loggedinUser 
        },
        isAdmin(state) {
            return state.loggedinUser && state.loggedinUser.isAdmin
        },
        userId(state) {
            if (state.loggedinUser) {
                return state.loggedinUser._id
            } else return null;
        },
    },
    mutations: {
        [SET_USER](state, { user }) {
            state.loggedinUser = user;
            StorageService.saveToStorage(STORAGE_KEY, user)
            console.log('state.loggedinUser', state.loggedinUser)
        },
        [SIGNOUT](state) {
            state.loggedinUser = null;
        }
    },
    actions: {
        [SIGNUP]({ commit }, { signupDetails }) {
            return new Promise((resolve, reject) => {
                UserService
                    .signup(signupDetails)
                    .then(res => {
                        commit({ type: SET_USER, user: res.user })
                        // saveToLocalStorage(res.user)
                        // StorageService.saveToStorage(STORAGE_KEY, res.user)
                    })
                    .catch(err => {
                        console.log(err)
                        throw err;
                    });
            })
        },
        [SIGNIN]({ commit }, { signinDetails }) {
            return new Promise((resolve, reject) => {
                UserService
                    .login(signinDetails)
                    .then(res => {
                        commit({ type: SET_USER, user: res.user });
                        // saveToLocalStorage(res.user)
                        // StorageService.saveToStorage(STORAGE_KEY, res.user)
                        resolve();
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err);
                    });
            });
        },
        [SIGNOUT]({ commit }) {
            UserService
                .logout()
                .then(_ => {
                    commit({ type: SIGNOUT })
                    StorageService.clearStorage(STORAGE_KEY)
                    // saveToLocalStorage(null);
                    // localStorage.clear(STORAGE_KEY)
                })
        },
        [UPDATE_SELLER_ITEMS]({ commit }, { itemId }) {
            var sellerToUpdate = this.getters.loggedinUser;
            if (itemId !== undefined) {
                console.log('updating the items in seller')
                sellerToUpdate.itemsForSale.push(itemId)
                return ShopService.updateSellerItems(sellerToUpdate)
                .then(user => {
                    console.log('commiting')
                    commit({type: SET_USER, user })
                })
            }
            // } else return Promise.resolve();
        }
    }
}