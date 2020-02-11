const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar
const mongoDBTablesNames = require("../../parametros").mongoDBTablesNames


const mySchema = new Schema({ 

    movement: {
        type: String,
        ref: mongoDBTablesNames.Movement,
    },
    originAccount: {
        type: String,
        ref: mongoDBTablesNames.Account,
    },
    destinationAccount: {
        type: String,
        ref: mongoDBTablesNames.Account,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    code: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    transTime: {  
        type: Date,
        required: true,
    },
    province: {  
        type: String,
        required: mongoDBTablesNames.Province,
    },

});

const model = mongoose.model(mongoDBTablesNames.Transaction , mySchema)  //tabla, esquema

module.exports = model

