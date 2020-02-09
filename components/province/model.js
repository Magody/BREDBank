const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar
const mongoDBTablesNames = require("../../parametros").mongoDBTablesNames

const mySchema = new Schema({  //le indica el tipo de información

    name: {
        type: String,
        required: true,
    }

});



const model = mongoose.model(mongoDBTablesNames.Province, mySchema)  //tabla, esquema

module.exports = model
