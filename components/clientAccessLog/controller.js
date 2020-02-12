const store = require('./store');

function addClientAccessLog(_idClient, _connIP) {
            
    if(!_idClient || !_connIP) {
        console.log('[clientAccessLog controller]: No hay idClient o IP' );
        return Promise.reject("Invalid data");
    }

    let fullClientAccessLog = {
        client: _idClient,
        connIP: _connIP,
        connTime: new Date()
    };

    return store.add(fullClientAccessLog);
}


function getClientAccessLog(idClient, connIP){

    if(!idClient || !connIP  ){
        return Promise.reject("Invalid data ");
    }

    return store.get(idClient, connIP);
}


module.exports = {
    addClientAccessLog,
    getClientAccessLog
};