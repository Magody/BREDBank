const store = require('./store')

function getMovement(movement){

    if(!movement){
        return Promise.reject("Invalid movement");
    }

    return store.get(movement);
}


module.exports = {
    getMovement
}