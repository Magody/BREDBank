const store = require('./store')


const stringToSha256 = require("../../module_cryptography/sha").stringToSha256

function addUser(user, password, email, region){

    if(!user || !password || !region || !email){
        //si no necesitamos la promesa completa
        return Promise.reject("Invalid user, password or region");
    }

    const fullUser = {
        user: user,
        password: stringToSha256(password), 
        email: email,
        region: region

    }
    return store.add(fullUser)
}

module.exports = {
    addUser
}