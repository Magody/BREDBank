const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar

const mySchema = new Schema({  //le indica el tipo de información
    user: String,
    password: String,
    email: String,
    region: String
});

const model = mongoose.model('User', mySchema)  //tabla, esquema

module.exports = model



