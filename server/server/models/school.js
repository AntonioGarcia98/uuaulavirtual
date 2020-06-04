const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Double = require('@mongoosejs/double');

let Schema = mongoose.Schema

let schoolSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    direction: {
        type: String,
        required: [true, 'La direccion es necesario'],
        unique: true
    },
    latitude: {
        type: Double
    },
    longitude: {
        type: Double
    }
})

module.exports = mongoose.model('School', schoolSchema)