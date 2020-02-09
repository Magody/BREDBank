const express = require('express');
const router = express.Router();
const response = require('../../network/response');

const controller = require('./controller');

router.get('/', function (req, res) {
    const filterAccount= req.query.id || null;
    controller.getAccount(filterAccount)
        .then((accountList)=> {
            response.success(req, res, accountList, 201);
        })
        .catch((e)=> {
            response.error(req, res, 'Unexpected error', 400, e)
        });
 }); 

router.patch('/:idAccount', function (req, res) {
    
    controller.updateAccount(req.params.id, req.body.balance)
        .then((data)=> {
            response.success(req, res, data, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Error interno', 500, e);
        })
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