const express = require('express');  //librería express
const controller = require('./controller');
const router = express.Router();  //permite separar cabeceras, métodos, por url, etc
const res = require("../../../network/response");
const controllerTransaction = require('../../transaction/controller');
const controllerProvince= require('../../province/controller');
const controllerMovement = require('../../movement/controller');
const controllerAccount = require('../../account/controller');
const controllerClient = require('../controller');

router.get("/", function(request, response){

    response.render('payments.ejs')
})

router.post('/', function(request, response){
    console.log('query desde boton make payment:', request.body);
    if (request.body.movement === 'Withdrawal'){
        controllerAccount.getAccountByNumAccount(request.body.numberAccountT)
        .then((account)=>{
            console.log('account:', account);
            controllerClient.getClient(account.client)
            .then((client)=>{
                console.log('client:', client);
                if (Number(request.body.amount) <= account.balance){
                    console.log('correcto amount');
                    controllerAccount.updateAccount(account._id, account.balance - Number(request.body.amount))
                    .then((updatedAccount)=>{
                        console.log('updated account:', updatedAccount);
                        controllerMovement.getMovement(request.body.movement)
                        .then((movement)=> {
                            console.log('movement:' , movement);
                            controllerProvince.getProvince(client.province)
                            .then((province)=>{
                                console.log('province:' , province);
                                controllerTransaction.addTransaction(movement._id, 
                                                                    request.body.numberAccountT, 
                                                                    request.body.numberAccountT,
                                                                    request.body.amount,
                                                                    province._id)
                                .then((transaction)=>{
                                    console.log('transaction', transaction);
                                    response.redirect('/client/principal/?numberAccount=' + updatedAccount._id + 
                                                                        '&clientIdentificacion=' + client.clientIdentificacion + 
                                                                        '&name=' + client.name +
                                                                        '&lastname=' + client.lastname + 
                                                                        '&email=' + client.email + 
                                                                        '&balance=' + updatedAccount.balance);
                                })
                                .catch((e)=>{
                                    res.error(request, response, "Error interno transaction", 500, e)
                                })
                            })
                            .catch((e)=>{
                                res.error(request, response, "Error interno province", 500, e)
                            })
                        })
                        .catch((e)=>{
                            res.error(request, response, "Error interno movement", 500, e)
                        })    
                    })
                    .catch((e)=>{
                        res.error(request, response, "Error interno updated account", 500, e)
                    })
                }
            })
            .catch((e)=> {
                res.error(request, response, "Error interno client", 500, e)
            })



        })
        .catch((e)=>{
            res.error(request, response, "Error interno account", 500, e)
        })
    }
});

module.exports = router;