import axios from 'axios'

var URL = 'http://localhost:3003'
if (process.env.NODE_ENV !== 'development') {
    URL = ''
}

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dl58rg6j8/image/upload'
const CLOUDINARY_PRESET = 'rggusa2m'



function signup(userDetails) {
    return axios.post(`${URL}/data/user`, userDetails)
        .then(_ => {
            // console.log('userDetails', userDetails);
            return login(userDetails)
        })
        .catch(err => err)
}

function login(userCreds) {
    return axios.post(`${URL}/login`, userCreds)
        .then(({ data }) => {
            // console.log('user service login', userCreds);
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
    // console.log('inside getitmes')
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


function getSellerById(sellerId) {
    return axios
        .get(`${URL}/data/user/${sellerId}`)
        .then(res => {
            return res.data
        })
}

function getSellers() {
    // console.log('inside getitmes')
    return axios
        .get(`${URL}/data/user/seller`)
        .then(res => {
            // console.log('res58:', res.data)
            return res.data
        }
        )
        .catch(e => {
            console.log('No Items', e);
            throw e;
        });
}


function deleteSeller(sellerId) {
    console.log('70',sellerId)
    return axios
        .delete(`${URL}/data/user/sellerId`)
        .then(res => {
            console.log('res72:', res.data)
            return res.data
        }
        )
        .catch(e => {
            console.log('No Items', e);
            throw e;
        });
}

function deleteItems(mealsForSale) {
    console.log('85',mealsForSale)
    return axios
        .deleteMany(`${URL}/data/item/mealsForSaleIds`)
        .then(res => {
            console.log('res72:', res.data)
            return res.data
        }
        )
        .catch(e => {
            console.log('No Items', e);
            throw e;
        });
}

// function getItemsByTag(tag) {
//     // console.log('tag48',tag);
//     return axios
//         .get(`${URL}/data/items/`+tag)
//         .then(res => {
//             console.log('res:', res.data)
//             return res.data
//         }
//         )
//         .catch(e => {
//             console.log('No Items', e);
//             throw e;
//         });
// }

function getItemsByTag(obj) {
    var tag;
    var keyWord;
    obj.tag ? tag = obj.tag : tag = ''
    obj.keyWord ? keyWord = obj.keyWord : keyWord = ''
    // console.log('in userservice, tag: ' + tag + ' keyword: ' + keyWord)
    return axios.get(`${URL}/data/items`, {
        params: {
            tag: tag,
            term: keyWord
        }
    })
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

function getEmptyUser() {
    return {
        name: '',
        password: '',
        email: '',
        about: '',
        imgUrl: '',
        address: {street: '', city: ''},
        itemsForSale: [],
        isActive: true,
    }
}

function changeUserActivity(seller){
    return axios
    .put(`${URL}/data/user/${seller._id}`, seller)
    .then(res => {
        console.log('resdata:', res.data)
        return res.data
    })
}



function uploadImage(file) {
    var formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_PRESET)

    for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    return axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(res => res.data.url)
        .catch(err => console.log(err))
}

export default {
    signup,
    login,
    logout,
    toggleLike,
    getEmptyUser,
    getItems,
    getItemsByTag,
    uploadImage,
    getSellers,
    deleteSeller,
    changeUserActivity,
    getSellerById
} 