const mongoose = require('mongoose')
const Double = require('@mongoosejs/double')

let Schema = mongoose.Schema

let schoolSchema = new Schema({
    name: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    direction: {
        type: String,
        required: [true, 'la direccion es necesario']
    },
    location: {
        latitude: Double,
        longitude: Double
    }
})

module.exports = mongoose.model('School', schoolSchema)