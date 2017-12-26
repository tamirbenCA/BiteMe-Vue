function getTags() {
	return ['Vegan', 'Veggie', 'Meat', 'Patry', 'Fish', 'Dessert', 'Pasta', 'Appetizers','Soup']
}


function sortByRank(items) {
    console.log('itemsitemsitemsitems',items.length)
    var maxRank = 5;
    var sellersRanks = [];

    for (var i = 0; i < items.length; i++) {
        for (var j = 0; !items[i].isAdmin && j < items[i].itemsForSale.length ; j++) {
            if ((items[i].itemsForSale[j].rank === maxRank) && (sellersRanks.length < 10)) 
			sellersRanks.push({ sellerId: items[i]._id, item: items[i].itemsForSale[j] })
            else {
                if ((items[i].itemsForSale[j].rank === maxRank - 1) && (sellersRanks.length < 10)) 
				sellersRanks.push({ sellerId: items[i]._id, item: items[i].itemsForSale[j] })
            }

        }
    }
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