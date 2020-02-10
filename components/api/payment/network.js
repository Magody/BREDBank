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
            0, movements.transfer, Math.random(), new Date())
            .then((data)=>{

                if(data.fullClient != null){
                    var control = controller.sendMail(dataClient.email, "Verification email", "Your code is: "+dataClient.code)
                    
                    console.log(control)
                    
                    res.send({status: 1, msg: "Mail sent"})
                }else{
                    res.send({status: 0, msg: data.errorCode})
                }

                
            })
            .catch(e => {
                res.send({status: -1, msg: "Error interno"})
            })
    }else{
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