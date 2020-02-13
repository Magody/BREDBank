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

    response.render('payments.ejs');
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

    if (request.body.movement === 'Deposit'){
        controllerAccount.getAccountByNumAccount(request.body.numberAccountT)
        .then((account)=>{
            console.log('account:', account);
            controllerClient.getClient(account.client)
            .then((client)=>{
                console.log('client:', client);
                controllerAccount.updateAccount(account._id, account.balance + Number(request.body.amount))
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
            })
            .catch((e)=> {
                res.error(request, response, "Error interno client", 500, e)
            })

        })
        .catch((e)=>{
            res.error(request, response, "Error interno account", 500, e)
        })
    }

    if (request.body.movement === 'Payment of basic services' ||  request.body.movement === 'Transfer' ){
        controllerAccount.getAccountByNumAccount(request.body.numberAccountT)
        .then((accountOrigin)=>{ //verifico cuenta origen
            console.log('account Origin:', accountOrigin);
            controllerAccount.getAccountByNumAccount(request.body.destinationAccountT)
            .then((accountDestination)=>{//verifico cuenta destino
                console.log('account destination:', accountDestination);
                controllerClient.getClient(accountOrigin.client)
                .then((client)=>{ // consulto el cliente propietario de la cuenta de origen
                    console.log('client:', client);
                    if (Number(request.body.amount) <= accountOrigin.balance){ //verifico que la cantidad a transferir sea menor que el balance en su cuenta
                        console.log('correcto amount');
                        controllerAccount.updateAccount(accountOrigin._id, accountOrigin.balance - Number(request.body.amount))
                        .then((updatedAccountOrigin)=>{//resto de la cuenta de origen
                            console.log('updated account origin:', updatedAccountOrigin);
                            controllerAccount.updateAccount(accountDestination._id, accountDestination.balance + Number(request.body.amount))
                            .then((updatedAccountDestination)=>{
                                console.log('updated account destination', updatedAccountDestination);
                                controllerMovement.getMovement(request.body.movement)
                                .then((movement)=> {
                                    console.log('movement:' , movement);
                                    controllerProvince.getProvince(client.province)
                                    .then((province)=>{
                                        console.log('province:' , province);
                                        controllerTransaction.addTransaction(movement._id, 
                                                                            request.body.numberAccountT, 
                                                                            request.body.destinationAccountT,
                                                                            request.body.amount,
                                                                            province._id)
                                        .then((transaction)=>{
                                            console.log('transaction', transaction);
                                            response.redirect('/client/principal/?numberAccount=' + updatedAccountOrigin._id + 
                                                                                '&clientIdentificacion=' + client.clientIdentificacion + 
                                                                                '&name=' + client.name +
                                                                                '&lastname=' + client.lastname + 
                                                                                '&email=' + client.email + 
                                                                                '&balance=' + updatedAccountOrigin.balance);
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
                                res.error(request, response, "Error interno updated account destination", 500, e)
                            })
                        })
                        .catch((e)=>{
                            res.error(request, response, "Error interno updated account origen", 500, e)
                        })
                    }
                })
                .catch((e)=> {
                    res.error(request, response, "Error interno client", 500, e)
                })
            })
            .catch((e)=>{
                res.error(request, response, "Error interno destination account", 500, e)
            })
        })
        .catch((e)=>{
            res.error(request, response, "Error interno origin account", 500, e)
        })
    }


});

module.exports = router;