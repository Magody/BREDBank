const mongoose = require('mongoose')
const Schema = mongoose.Schema; //una de las clases que más se van a utilizar

const mySchema = new Schema({ 

    movement: {
        type: Schema.ObjectId,
        ref: 'Movement',
    },
    originAccount: {
        type: Schema.ObjectId,
        ref: 'Account',
    },
    destinationAccount: {
        type: Schema.ObjectId,
        ref: 'Account',
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
    descripion: {
        type: String,
        required: true,
    },
    transTime: {  // hora de la transacción
        type: Date,
        required: true,
    },

});

const model = mongoose.model('Transaction', mySchema)  //tabla, esquema

module.exports = model

