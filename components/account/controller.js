const store = require('./store');

function getAccount (id) {
    return new Promise((resolve, reject) => {
        resolve(store.list(id))
    });
}

function updateAccount(idAccount, balance) {
    return new Promise( async (resolve, reject) => {
        if (!idAccount || !balance) {
            reject('Los datos son incorrectos');
            return false;
        }
        
        const result = await store.updateBalance(idAccount, balance);
        resolve(result);

    });
}


module.exports = {
    getAccount,
};