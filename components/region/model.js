const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar

const mySchema = new Schema({  //le indica el tipo de información

    region: {
        type: String,
        required: true,
    }

});



const model = mongoose.model('Region', mySchema)  //tabla, esquema

module.exports = model
