const express = require('express')
const login = require('../components/login/network')
const register = require('../components/register/network')
const client = require('../components/client/network');
const account = require('../components/account/network');
const transaction = require('../components/transaction/network');
const movement = require('../components/movement/network');
const clientAccessLog = require('../components/clientAccessLog/network');

const routes = function (server) {
    
    server.use("/login", login);
    server.use("/register", register);
    server.use('/client', client );
    server.use('/account', account);
    server.use('/transaction', transaction);
    server.use('/movement', movement);
    server.use('/clientAccessLog', clientAccessLog);

}

//cada ves que llame a message va a llamar al componente de message por lo que se puede quitar eso de la primera parte de get y post -> /message qued como /
module.exports = routes