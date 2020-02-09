const Model = require('../login/model')

function addUser(user){
    const myUser = new Model(user)
    return myUser.save()  //save es una promesa
}
module.exports = {
    add: addUser,
}