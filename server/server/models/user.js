const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let userSchema = new Schema({
    user_name: {
        type: String,
        required: [true, 'nombre de usuario es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'contrasenia es necesaria']
    },
    name: {
        type: String,
        required: [true, 'nombre es necesario']
    },
    last_name: {
        type: String,
        required: [true, 'un apellido es necesario']
    },
    birthdate: {
        type: Date,
        required: [true, 'fecha de nacimiento es necesaria']
    },
    register_date: Date,
    last_connection: Date,
    online: Boolean,
    contact: {
        email: {
            type: String,
            required: [true, 'correo es necesario'],
            unique: true
        },
        phone: {
            type: String,
            unique: true,
            required: false
        }
    },
    profile: {
        photo: String,
        description: String,
        public: {
            type: Boolean,
            default: false
        }
    }
})

userSchema.methods.toJSON = function() {
    let userObject = this.toObject()
    delete userObject.password
    return userObject
}

userSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'})


module.exports = mongoose.model('User', userSchema)