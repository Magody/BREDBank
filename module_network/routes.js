const express = require('express')
const login = require('../components/login/network')
const register = require('../components/register/network')

const routes = function (server) {
    
    server.use("/login", login) 
    server.use("/register", register)
    

}

//cada ves que llame a message va a llamar al componente de message por lo que se puede quitar eso de la primera parte de get y post -> /message qued como /
module.exports = routes