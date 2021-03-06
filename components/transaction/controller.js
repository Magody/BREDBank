const store = require('./store');

function addTransaction(_idMovement, _originAccount, _destinationAccount , _amount, _idProvince) {

    console.log('en add transaction:' +  _idMovement + ' ' + _originAccount + ' ' + _destinationAccount + ' ' +  _amount + ' ' +  _idProvince )

            if(!_idMovement || !_originAccount || !_destinationAccount || !_amount || !_idProvince) {
                console.log('[transaction controller]: No hay el tipo de movimiento, cuenta de origen, cuenta de desitno o la cantidad de la transacción' );
                return Promise.reject("Invalid province");
            }

            let fullTransaction = {
                movement: _idMovement,
                originAccount: _originAccount,
                destinationAccount: _destinationAccount,
                amount: Number(_amount),
                status: 1,
                code: -111111,
                description: 'Acción satisfactoria',
                transTime: new Date(),
                province: _idProvince
            };

            return store.add(fullTransaction);
}

function getTransaction(originAccount){

    if(!originAccount ){
        return Promise.reject("Invalid data ");
    }

    return store.get(originAccount);
}

module.exports = {
    addTransaction,
    getTransaction,
};