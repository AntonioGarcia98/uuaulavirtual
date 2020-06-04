const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



let Schema = mongoose.Schema

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasenia es necesaria']
    }
})

userSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'})


module.exports = mongoose.model('User', userSchema)