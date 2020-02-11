const Model = require('./model');

function get(_province) {

    return new Promise((resolve, reject) => {
        let filter= {
            name: _province 
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