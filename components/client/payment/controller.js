const store = require('../../transaction/store');

function getPayments(originAccount){

    return store.get(originAccount);
}

function updatePayments(idAccount, balance) {
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
    getPayments,
    updatePayments
};