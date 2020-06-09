const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')
const {create} = require('../config/functions')

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
            validate: {
                validator: function(v) {
                  return /\d{10}/.test(v);
                },
                message: props => `${props.value} no es un telefono valido`
            },
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

const User = mongoose.model('User', userSchema)

const user = {
    name: '/user',
    model: User,
    create: async body => create(User, {
        user_name: body.user_name,
        password: (body.password) ? bcrypt.hashSync( body.password, 10 ) : null,
        name: body.name,
        email: body.email,
        last_name: body.last_name,
        birthdate: body.birthdate,
        contact: body.contact,
        profile: body.profile,
        register_date: new Date()
    }),
    updateParams: [
        'user_name',
        'name',
        'last_name',
        'birthdate',
        'last_connection',
        'online',
        'contact',
        'profile'
    ],
    crud: true
}

module.exports = user