import UserService from "../services/UserService.js";


export const SIGNUP = 'user/signup';
export const SIGNIN = 'user/signin';
export const SET_USER = 'user/setUser';
export const SIGNOUT = 'user/signout';
export const TOGGLE_LIKE = 'user/toggleLike';


var STORAGE_KEY = 'loggedinUser';

export default {
    state: {
        loggedinUser: getUserFromStorage()
    },
    getters: {
        isUser(state) {
            return !!state.loggedinUser
        },
        isAdmin(state) {
            return state.loggedinUser && state.loggedinUser.isAdmin
        },
        userId(state) {
            return state.loggedinUser._id
        }
    },
    mutations: {
        [SET_USER](state, { user }) {
            state.loggedinUser = user;
            console.log('state.loggedinUser', state.loggedinUser)
        },
        [SIGNOUT](state) {
            state.loggedinUser = null;
        },
        [TOGGLE_LIKE](state, { carId }) {
            if (!state.loggedinUser.likedCarIds) {
                Vue.set(state.loggedinUser, 'likedCarIds', []);
            }
            var idxLike = state.loggedinUser.likedCarIds
                .findIndex(likeCarId => likeCarId === carId);
            if (idxLike === -1) {
                state.loggedinUser.likedCarIds.push(carId)
            } else {
                state.loggedinUser.likedCarIds.splice(idxLike, 1)
            }
        }
    },
    actions: {
        [SIGNUP]({ commit }, { signupDetails }) {
            // console.log('Sign Up action', signupDetails)
            return new Promise((resolve, reject) => {
                UserService
                    .signup(signupDetails)
                    .then(res => {
                        commit({ type: SET_USER, user: res.user })
                        saveToLocalStorage(res.user)
                    })
                    .catch(err => {
                        console.log(err)
                        throw err;
                    });
            })
        },
        [SIGNIN]({ commit }, { signinDetails }) {
            return new Promise ((resolve, reject) => {
                UserService
                    .login(signinDetails)
                    .then(res => {
                        commit({ type: SET_USER, user: res.user });
                        saveToLocalStorage(res.user)
                    })
                    .catch(err => {
                        console.log(err)
                        throw err;
                    });
            })
        },
        [SIGNOUT]({ commit }) {
            UserService
                .logout()
                .then(_ => {
                    commit({ type: SIGNOUT })
                    saveToLocalStorage(null);
                })
        },
        [TOGGLE_LIKE]({ commit, state }, { carId }) {
            UserService
                .toggleLike(state.loggedinUser._id, carId)
                .then(_ => {
                    commit({ type: TOGGLE_LIKED_BY_USER, carId })
                    commit({ type: TOGGLE_LIKE, carId })
                    saveToLocalStorage(state.loggedinUser)
                })
        }
    }
}


function getUserFromStorage() {
    var loggedinUser = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    console.log('GETTING FROM STORAGE', loggedinUser);
    return loggedinUser;
}

function saveToLocalStorage(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}
