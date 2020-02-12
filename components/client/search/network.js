const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../../network/response");
const controllerTransaction = require('../../transaction/controller');

router.get("/", function(request, response){

    response.render('search.ejs')
})

router.post('/', function(request, response){
    console.log('search desde boton search principal:' , request.body);
    controllerTransaction.getTransaction(request.body.numberAccountS)
    .then((transactions)=>{
        console.log('transactions:', transactions);
        console.log('transactions[0].movement:', transactions[0].movement);
        response.redirect('/client/search/?transactions=' + transactions[0].movement);
    })
    .catch((e)=>{
        res.error(request, response, "Error interno", 500, e)
    })

});

module.exports = router;