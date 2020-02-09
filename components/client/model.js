const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar

const mongoDBTablesNames = require("../../parametros").mongoDBTablesNames

const mySchema = new Schema({ 

    clientIdentificacion: { //la cedula del cliente
        type: String,
        required: false,
    },
    name: { 
        type: String,
        required: false,
    },
    lastname: { 
        type: String,
        required: false,
    },
    birthdate: {
        type: Date, 
        required: false,
    },
    phone: { 
        type: String,
        required: false,  
    },
    email: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    province: {
        type: Schema.ObjectId,
        ref: mongoDBTablesNames.Province,
    },
    apiKey: {
        type: String,
        required: false,
    }

});


const model = mongoose.model(mongoDBTablesNames.Client, mySchema)  //tabla, esquema

module.exports = model



