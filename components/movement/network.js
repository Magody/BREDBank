const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');

router.get('/', function (req, res) {
    controller.getMovements
        .then((clientAccessLogList)=> {
            response.success(req, res, clientAccessLogList, 201);
        })
        .catch((e)=> {
            response.error(req, res, 'Unexpected error', 400, e)
        });
 }); 

// router.post('/', function (req, res) {
//     console.log(req.query);
//     if (req.query.error === "ok") {
//         response.error(req, res, 'Error', 401, 'Simulacion de un error');
//     } else {
//         response.success(req, res, 'Post correcto', 201);
//     }
    
// });

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