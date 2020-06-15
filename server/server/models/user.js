const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const {populatePost, populatePre, populate} = require('../config/functions')
const Teacher  = require('../models/teacher')
const Student = require('../models/student')

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
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
})

userSchema.methods.toJSON = function() {
    let userObject = this.toObject()
    delete userObject.password
    return userObject
}

userSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'})

let pre = ['find', 'findOne']
pre.map(path => populatePre(userSchema, path, populate('teacher', Teacher)))
pre.map(path => populatePre(userSchema, path, populate('student', Student)))

let post = ['save']
post.map(path => populatePost(userSchema, path, populate('teacher', Teacher)))
post.map(path => populatePost(userSchema, path, populate('student', Student)))

module.exports = mongoose.model('User', userSchema)