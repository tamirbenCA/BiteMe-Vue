import axios from 'axios'

const URL = 'http://127.0.0.1:3003'

function loadTags() {
    return axios.get(`${URL}/data/tags`)
}

function getItemById(itemId, collection) {
    return axios
        .get(`${URL}/data/${collection}/${itemId}`)
        .then(res => {
            return res.data
        })
}

function getItemsByIds(itemsIds) {
    var items = itemsIds.map((itemId) => {
        return getItemById(itemId, 'item')
            .then((res) => {
                return res
            })
    })
    return Promise.all(items)
}

function getChefById(itemId) {
    return axios
        .get(`${URL}/data/user/${itemId}`)
        .then(res => {
            return res.data
        })
}

function addComment(itemId, comment, rank, userName) {
    console.log(itemId)
    getItemById(itemId, 'item').then((item) => {
        
        item.comments.push({ comment, rank, userName });
        var sum = item.comments.reduce(function (a, b) {
            return a + b.rank;
        }, 0);
        item.rank = Math.round(sum / item.comments.length);
        console.log(item.rank)
        return axios
            .put(`${URL}/data/item/${itemId}`, item)
            .then(res => {
                console.log('resdata:', res.data)
                return res.data
            })
    })
}


function addOrder(order) {
    return axios
        .post(`${URL}/data/order/`,order)
        .then(res => {
            return res.data
        })
}

function getChefsByIds(itemsIds) {
    var items = itemsIds.map((itemId) => {
        return getChefById(itemId)
            .then((res) => {
                return res
            })
    })
    return Promise.all(items)
}

function loadSellersItems(sellerId) {
    return axios.get(`${URL}/data/user/${sellerId}/orders/asseller`)
}

function loadBuyersItems(buyerId) {
    return axios.get(`${URL}/data/user/${buyerId}/orders/asbuyer`)
}

function markDelivered(order) {
    return axios.put(`${URL}/data/order/${order._id}`, order)
}

function emptyItem() {
    return {name: '', desc: '', imgUrl: '', tags: [], price: '', seller: {sellerName: '', sellerId: '', sellerImgUrl: ''}, rank: ''}
}

function saveItem(item) {
    if (item._id) return axios.put(`${URL}/data/item/${item._id}`, item)
    else return axios.post(`${URL}/data/item`, item);
    
}

function getTopMeals(){
 var mealsIds = ["5a4d2fe4734d1d15f675a5a4","5a4d3050734d1d15f675a605","5a4d42c7734d1d15f675b6d5",
 "5a4d42de734d1d15f675b6e4","5a4d42ef734d1d15f675b6e5"]
      return axios
        .get(`${URL}/data/item/topMeals`,{params: {mealsIds}})
        .then(res => {
            return res.data
        })
}


export default {
    loadTags,
    getItemById,
    getChefById,
    loadSellersItems,
    loadBuyersItems,
    getItemsByIds,
    getChefsByIds,
    addComment,
    markDelivered,
    emptyItem,
    addOrder,
    saveItem,
    getTopMeals
}