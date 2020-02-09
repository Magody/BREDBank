const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller'); 

router.get('/', function (req, res) {
    const filterClientAccessLogIdClient = req.query.idClient || null;
    const filterClientAccessLogConnIp = req.query.connIP || null;
    controller.getClientAccessLog(filterClientAccessLogIdClient, filterClientAccessLogConnIp)
        .then((clientAccessLogList)=> {
            response.success(req, res, clientAccessLogList, 201);
        })
        .catch((e)=> {
            response.error(req, res, 'Unexpected error', 400, e)
        });

 }); 

router.post('/', function (req, res) {
    controller.addClientAccessLog(req.body.idClient, req.body.connIP)
        .then(()=> {
            response.success(req, res, 'Creado correctamente', 201);
        })
        .catch((e)=> {
            response.error(req, res, 'Unexpected error', 400, e)
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