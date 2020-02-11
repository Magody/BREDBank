const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../../network/response");
const controllerTransaction = require('../../transaction/controller');
const controllerProvince= require('../../province/controller');
const controllerMovement = require('../../movement/controller');
const controllerAccount = require('../../account/controller');
router.get("/", function(request, response){

    response.render('payments.ejs')
})

router.post('/', function(request, response){
    console.log('query desde boton make payment:', request.body);
    if (request.body.movement === 'Withdrawal'){
        controllerAccount.getAccountByNumAccount(request.body.numberAccountT)
        .then((account)=>{
            console.log('account:', account);
            if (Number(request.body.amount) <= account.balance){
                console.log('correcto amoun');
                controllerMovement.getMovement(request.body.movement)
                .then((movement)=> {
                    console.log('movement:' , movement);
                    controllerProvince.getProvince(request.body.province)
                    .then((province)=>{
                        console.log('province:' , province);
                        controllerTransaction.addTransaction(movement._id, 
                            request.body.numberAccountT, 
                            request.body.numberAccountT,
                            request.body.amount,
                            province._id
                            )
                            .then()
                            .catch();
                    })
                    .catch(()=>{

                    })


                })
                .catch((e)=>{
                    res.error(request, response, "Error interno movement", 500, e)
                })    


            }

        })
        .catch((e)=>{
            res.error(request, response, "Error interno account", 500, e)
        })
    }
});

module.exports = router;