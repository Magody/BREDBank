const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const controller = require('./controller');

router.post('/', function (req, res) {
    console.log(req.body);

    controller.getTransactionsFromToDate(req.body.APIKey, req.body.fromDate,
        req.body.toDate, req.body.provinces)
        .then((message)=>{
            response.success(req, res, message, 200)            
        })
        .catch(e => {
            response.error(req, res, {status: -1, data:[],  msg: "Error interno"}, 500, e)
        })

    
});


module.exports = router;