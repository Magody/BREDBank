const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar


const mySchema = new Schema({ 

    clientIdentificacion: { //la cedula del cliente
        type: String,
        required: true,
    },
    name: { 
        type: String,
        required: true,
    },
    lastname: { 
        type: String,
        required: true,
    },
    birthdate: {
        type: Date, 
        required: true,
    },
    phone: { 
        type: String,
        required: true,  
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
    region: {
        type: Schema.ObjectId,
        ref: 'Region',
    },
    apiKey: {
        type: String,
        required: true,
    }

});


const model = mongoose.model('User', mySchema)  //tabla, esquema

module.exports = model



