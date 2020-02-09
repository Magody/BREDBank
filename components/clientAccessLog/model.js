const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar

const mySchema = new Schema({  //le indica el tipo de información

    client: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    connIP: { // IP de la cual se hizo una conexión
        type: String,
        required: true,
    },
    connTime: { //hora de la conexión
        type: Date,
        required: true,
    }
});

const model = mongoose.model('ClientAccessLog', mySchema)  //tabla, esquema

module.exports = model

