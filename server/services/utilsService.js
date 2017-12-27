function getTags() {
    return ['Vegan', 'Veggie', 'Meat', 'Patry', 'Fish', 'Dessert', 'Pasta', 'Appetizers', 'Soup']
}


function sortByRank(items) {
    console.log('itemsitemsitemsitems', items.length)
    var maxRank = 5;
    var sellersRanks = [];

    var sellersRanks = items.filter((item) => {
        return (item.rank === 5 || item.rank === 4|| item.rank === 3) 
    })
    if (sellersRanks.length > 9)   sellersRanks = sellersRanks.slice(0, 9);  
    
    
    console.log(sellersRanks)
    return sellersRanks
}

module.exports = {
    sortByRank,
    getTags
};

// export default {
// 	getTags
// }