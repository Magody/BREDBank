const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./controller');

const movements = require("../../../parametros").movements

router.post('/', function (req, res) {
    console.log(req.body);


    if(req.body.operationId == 0){
        controller.generateTransaction(req.body.clientSource, req.body.password,
            req.body.clientDest, req.body.amount, req.body.description,
            0, movements.transfer, parseInt(Math.random() * 999999), new Date())
            .then((data)=>{

                
                if(data.fullClient != null){
                    controller.sendMail(data.fullClient.email, "Verification email", "Your code is: "+data.code, data.fullClient.transactionId)
                        .then((message)=>{
                            res.send(message)
                        })
                        .catch(e=>{
                            res.send({status: -2, msg: "Cant sent email"})
                        })
                        
                        res.send({status: 1, msg: data.fullClient.transactionId})
                }else{
                    res.send({status: 0, msg: data.code})
                }

                
            })
            .catch(e => {
                console.log(e)
                res.send({status: -1, msg: "Internal error"})
            })
    }else if(req.body.operationId == 1){
        controller.verifyAndRealicePayment(req.body.transactionId, req.body.code, new Date())
            .then((message)=>{
                res.send(message)
            })
            .catch(e=>{
                
                res.send({status: -1, msg: "Internal error"})
            })


    } 
    else{
        res.send({status: -1, msg: "Invalid operation"})
    }

    
});

// router.put('/', function (req, res) {
//     console.log(req.query);
//     if (req.query.error === "ok") {
//         response.error(req, res, 'Error', 401, 'Simulacion de un error');
//     } else {
//         response.success(req, res, 'Put correcto', 201);
//     }
    
// });

// router.delete('/', function (req, res) {
//     console.log(req.query);
//     if (req.query.error === "ok") {
//         response.error(req, res, 'Error', 401, 'Simulacion de un error');
//     } else {
//         response.success(req, res, 'Delete correcto', 201);
//     }
    
// });

module.exports = router;