function getTags() {
    return ['vegan', 'veggie', 'meat', 'pastry', 'fish', 'pasta' ]
}


function sortByRank(items) {
    // console.log('itemsitemsitemsitems', items.length)
    // var maxRank = 5;
    var itemsRank = [];

    var itemsRank = items.filter((item) => {
        // return (3<= item.rank )
        return (item.rank === 5 || item.rank === 4|| item.rank === 3) 
    })
    if (itemsRank.length > 9)   itemsRank = itemsRank.slice(0, 9);  
    
    
    // console.log(itemsRank)
    return itemsRank
}

module.exports = {
    sortByRank,
    getTags
};