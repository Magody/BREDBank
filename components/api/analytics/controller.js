
const store = require("./store")
const config = require("../../../config")

function getTransactionsFromToDate(APIKey, fromDate,toDate, provinces){

    return new Promise((resolve, reject) => {
        resolve(store.getTransactionsFromToDate(APIKey, fromDate,toDate, provinces))
    });


}


module.exports = {
    getTransactionsFromToDate
};