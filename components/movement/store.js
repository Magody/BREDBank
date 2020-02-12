const Model = require('./model');

function get(_movement) {

    return new Promise((resolve, reject) => {
        let filter= {
            movement: _movement 
        };

        Model.findOne(filter)
        .then((movements) =>{
            resolve(movements);

        })
        .catch(e => {
            reject(e);
        })
    })

}


module.exports = {
    get,
}