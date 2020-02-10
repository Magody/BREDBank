const Model = require('../../transaction/model');

function get(_originAccount) {

    return new Promise((resolve, reject) => {
        let filter= {
            originAccount: _originAccount 
        };

        Model.find(filter)
        .then((transactions) =>{
            console.log('full payments:', transactions);
            resolve(fullAccount);

        })
        .catch(e => {
            reject(e);
        })
    })

}


module.exports = {
    get,
}