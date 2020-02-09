const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar

const mongoDBTablesNames = require("../../parametros").mongoDBTablesNames
const mySchema = new Schema({ 

    client: {
        type: Schema.ObjectId,
        ref: mongoDBTablesNames.Client,
    },
    openingDate: {
        type: Date,
        required: true,
    },
    finishingDate: {  //este campo debe permitir nulls 
        type: Date,
        required: false,
    },
    activated: { //false - cuenta inactiva, true - cuenta activa
        type: Boolean,
        required: true,
    },
    balance: { //el saldo en la cuenta
        type: Number, 
        required: true,
    },
    accountType: { //0 - cuenta de ahorros, 1 - cuenta corriente
        type: Number,
        required: true,  
    }
});

const model = mongoose.model(mongoDBTablesNames.Account, mySchema)  //tabla, esquema

module.exports = model

