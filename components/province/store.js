const Model = require('./model');

function get(_province) {
    console.log('llego a store get provinces ' + _province)
    return new Promise((resolve, reject) => {
        let filter= {
            _id: _province 
        };

        Model.findOne(filter)
        .then((provinces) =>{
            resolve(provinces);

        })
        .catch(e => {
            reject(e);
        })
    })

}


module.exports = {
    get,
}