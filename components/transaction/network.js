const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller'); 

router.get('/', function (req, res) {
    const filterTransaction = req.query.originAccount || null;
    controller.getAccount(filterTransaction)
        .then((transactionList)=> {
            response.success(req, res, transactionList, 201);
        })
        .catch((e)=> {
            response.error(req, res, 'Unexpected error', 400, e)
        });
 }); 

router.post('/', function (req, res) {
    controller.addTransaction(req.body.idMovement, req.body.originAccount, req.body.destinationAccount ,req.body.amount)
        .then(()=> {
            response.success(req, res, 'Creado correctamente', 201);
        })
        .catch((e)=> {
            response.error(req, res, 'Información inválida', 400, 'Error en el cliente')
        });
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