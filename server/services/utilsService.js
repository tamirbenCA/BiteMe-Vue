function getTags() {
	return ['Veagan', 'Veggie', 'Meat', 'Patry', 'Fish', 'Dessert', 'Pasta', 'Appetizers']
}


function sortByRank(items) {
    var maxRank = 5;
    var sellersRanks = [];

    for (var i = 0; i < items.length-1; i++) {
		
        for (var j = 0; j < items[i].itemsForSale.length; j++) {
			
            if ((items[i].itemsForSale[j].rank === maxRank) && (sellersRanks.length < 10)) 
			sellersRanks.push({ sellerId: items[i]._id, item: items[i].itemsForSale[j] })
            else {
                if ((items[i].itemsForSale[j].rank === maxRank - 1) && (sellersRanks.length < 10)) 
				sellersRanks.push({ sellerId: items[i]._id, item: items[i].itemsForSale[j] })
            }

        }
    }

    return sellersRanks
}

exports.default = {
    sortByRank,
    getTags
};

