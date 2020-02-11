const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../../network/response");
const controllerTransaction = require('../../transaction/controller');
const controllerAccount = require('../../account/controller');
router.get("/", function(request, response){

    response.render('payments.ejs')
})

router.post('/', function(request, response){
    console.log('query desde boton make payment:', request.body);
    if (request.body.movement === '2'){
        controllerAccount.getAccountByNumAccount(request.body.numberAccountT)
        .then((account)=>{
            console.log('account:', account);
            if (Number(request.body.amount) <= balance){
                controllerTransaction.addTransaction(request.body.movement, 
                                                    request.body.numberAccountT, 
                                                    request.body.numberAccountT,
                                                    request.body.amount)
                .then()
                .catch();
            }

        })
        .catch()
    }
});

module.exports = router;