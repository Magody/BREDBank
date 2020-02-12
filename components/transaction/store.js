const Model = require('./model');

function add(_transaction){

    return new Promise((resolve, reject) => {

        const transaction = new Model(_transaction);
        transaction.save();
        resolve(transaction);
    })
    .catch(e => {
        reject(e);
    })

}

function get(originAccount) {
    
    return new Promise((resolve, reject) => {
        let filter = {
            originAccount: originAccount
        };

        Model.find(filter)
        .then((fullTransactions) =>{
            resolve(fullTransactions);
        })
    })
    .catch(e => {
        reject(e);
    })
}


module.exports = {
    add,
    get
}