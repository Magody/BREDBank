const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar


const mongoDBTablesNames = require("../../parametros").mongoDBTablesNames

const mySchema = new Schema({  //le indica el tipo de información

    movement: {
        type: String,
        required: true,
    }
    // tipo de movimiento, puede ser: 
    // Deposito, Retiro, Pagos de Servicios Básicos o Transferencia
    // En caso de Deposito o Retiro serán a la propia cuenta
    // Con esto en la tabla de Transaction la cuenta origen y destino serán las mismas
    // En caso de pagos de Servicios Básicos o Transferencia la cuenta de origen y destino serán diferentes

});



const model = mongoose.model(mongoDBTablesNames.Movement, mySchema)  //tabla, esquema

module.exports = model
