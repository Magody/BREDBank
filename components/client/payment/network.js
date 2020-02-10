const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../../network/response");
const controllerPayments = require('../payment/controller');
const controllerAccount = require('../../account/controller');


router.get("/", function(request, response){
    response.render('payments.ejs')
})

router.post('/', function(request, response){
    //borrar la base y crearla de nuevo sin movements
    //realizar todas las validaciones
    if (request.body.movementType === '2') {
        controllerAccount.getAccountByNumAccount(request.body.numberAccount)
        .then(()=>{
            controllerAccount.updateAccount(request.body.numberAccount, )
        })
        .catch(()=>{
            
        })

            
    }

    controllerPayments.updatePayments(request.body.numberAccount, request.body.destinationAccount, request.body.amount, request.body.movementType)
        .then((payment)=>{
            
        })
        .catch(e => {
            res.error(request, response, "Error interno", 500, e)
        })
});

module.exports = router;