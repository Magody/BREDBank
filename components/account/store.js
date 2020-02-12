const Model = require('./model');

function get(clientIdentificacion) {

    
    return new Promise((resolve, reject) => {
        let filter = {
            client: clientIdentificacion,
        };

        Model.findOne(filter)
        .then((fullAccount) =>{
            //console.log('full account:', fullAccount);

            resolve(fullAccount);

        })
    })
    .catch(e => {
        reject(e);
    })
}

function getByNumAccount(originAccount) {

    
    return new Promise((resolve, reject) => {
        let filter = {
            _id: originAccount,
        };

        Model.findOne(filter)
        .then((fullAccount) =>{
            //console.log('full account by num account:', fullAccount);
            resolve(fullAccount);
        })
    })
    .catch(e => {
        reject(e);
    })
}

function updateAccount(id, balance) {
    
    return new Promise((resolve, reject) => {
        let filter = {
            _id: id
        };

        Model.findOne(filter)
        .then((foundAccount) =>{
            foundAccount.balance = balance;
            const newBalance = foundAccount.save();
            resolve(newBalance);
        })
    })
    .catch(e => {
        reject(e);
    })

}

module.exports = {
    get,
    getByNumAccount,
    updateAccount
}