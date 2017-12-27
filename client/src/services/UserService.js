import axios from 'axios'

const URL = 'http://localhost:3003'

function signup(userDetails) {
    return axios.post(`${URL}/data/user`, userDetails)
        .then(_ => {
            console.log('userDetails', userDetails);
            return login(userDetails)
        })
        .catch(err => err)
}

function login(userCreds) {
    return axios.post(`${URL}/login`, userCreds)
        .then(({ data }) => {
            console.log('user service login', userCreds);
            return data
        })
}

function logout() {
    return axios.get(`${URL}/logout`)
}

function toggleLike(userId, carId) {
    return axios.post(`${URL}/data/${userId}/liked/${carId}`)
    // .then(({ data }) => data)
}


function getItems() {
    console.log('inside getitmes')
    return axios
        .get(`${URL}/data/item`)
        .then(res => {
            // console.log('res:', res.data)
            return res.data
        }
        )
        .catch(e => {
            console.log('No Items', e);
            throw e;
        });
}


function getItemsByTag(tag) {
    console.log('tag48',tag);
    return axios
        .get(`${URL}/data/items/`+tag)
        .then(res => {
            console.log('res:', res.data)
            return res.data
        }
        )
        .catch(e => {
            console.log('No Items', e);
            throw e;
        });
}

function getEmptyUser() {
    return {
        name: '',
        password: '',
        email: '',
        about: '',
        imgUrl: '',
        address: '',
        itemsForSale: [],
        commentsOnSellers: [],
        payment: {},
    }
}


export default {
    signup,
    login,
    logout,
    toggleLike,
    getEmptyUser,
    getItems,
    getItemsByTag
} 