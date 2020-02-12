const express = require('express');
const login = require('../components/client/login/network');
const verification = require('../components/client/verification/network');
const register = require('../components/client/register/network');
const payment = require('../components/client/payment/network');
const client = require('../components/client/network');
const account = require('../components/account/network');
const transaction = require('../components/transaction/network');
const movement = require('../components/movement/network');
const clientAccessLog = require('../components/clientAccessLog/network');
const province = require('../components/province/network');

const apiPayment = require('../components/api/payment/network');
const apiAnalytics = require('../components/api/analytics/network');

const routes = function (server) {
    
    server.use("/client/login", login);
    server.use("/client/register", register);
    server.use("/client/payments", payment);
    server.use("/client/verification", verification);
    server.use('/client', client );
    server.use('/account', account);
    server.use('/transaction', transaction);
    server.use('/movement', movement);
    server.use('/clientAccessLog', clientAccessLog);
    server.use('/province', province);
    server.use('/api/payment', apiPayment);
    server.use('/api/analytics', apiAnalytics);
    

}

//cada ves que llame a message va a llamar al componente de message por lo que se puede quitar eso de la primera parte de get y post -> /message qued como /
module.exports = routes