import axios from 'axios'

const URL = 'http://127.0.0.1:3003'

function loadTags() {
    return axios.get(`${URL}/data/tags`)
}

function getItemById(itemId) {
    // console.log('itemId', itemId)
    return axios
        .get(`${URL}/data/item/${itemId}`)
        .then(res => {
            // console.log('resdata:', res.data)
            return res.data
        })
}



function getItemsByIds(itemsIds) {
    // console.log(itemsIds)
    var items = itemsIds.map((itemId) => {
        return getItemById(itemId)
            .then((res) => {
                // console.log(res)
                return res
            })
    })
    return Promise.all(items)
}



function getChefById(itemId) {
    // console.log('itemId', itemId)
    return axios
        .get(`${URL}/data/user/${itemId}`)
        .then(res => {
            // console.log('resdata:', res.data)
            return res.data
        })
}


function addComment(chefId, comment) {
    console.log(chefId, comment)
    getChefById(chefId).then((item) => {
        console.log(item)
        item.commentsOnSellers.push(comment)
        return axios
        .put(`${URL}/data/user/${chefId}`,item)
        .then(res => {
            console.log('resdata:', res.data)
            return res.data
        })
    })

}



function getChefsByIds(itemsIds) {
    // console.log(itemsIds)
    var items = itemsIds.map((itemId) => {
        return getChefById(itemId)
            .then((res) => {
                // console.log(res)
                return res
            })
    })
    return Promise.all(items)
}


function getChefById(chefId) {
    // console.log('chefId:', chefId)
    return axios
        .get('http://127.0.0.1:3003/data/user/' + chefId)
        .then(res => {
            // console.log('resdata:', res.data)
            return res.data
        })
}

function loadSellersItems(sellerId) {
    // console.log('sellers id in service.loadSellers(): ', sellerId)
    return axios.get(`${URL}/data/user/${sellerId}/orders/asseller`)
    // return new Promise ((resolve, reject) => {
    //     setTimeout(() => resolve([{name:'toApproveItems0',_id: 0},{name: 'toApproveItems1', _id: 1}])) 
    // })
}

function loadBuyersItems(buyerId) {
    // return new Promise((resolve, reject) => {
        // setTimeout(() => resolve([{ name: 'orderStatusItems0', _id: 0 }, { name: 'orderStatusItems1', _id: 1 }]))
    // })
    return axios.get(`${URL}/data/user/${buyerId}/orders/asbuyer`)
}

function markDelivered({order}) {
    console.log('shop service:', order)
    console.log('shop service:', order._id)
    return axios.put(`${URL}/data/order/${order._id}`, order)
}

function emptyItem() {
    return {name: '', desc: '', imgUrl: '', tags: '', price: '', seller: '', rank: ''}
}

export default {
    loadTags,
    getItemById,
    getChefById,
    loadSellersItems,
    loadBuyersItems,
    getItemsByIds,
    getChefById,
    getChefsByIds,
    addComment,
    markDelivered,
    emptyItem
}