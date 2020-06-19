const mongoose = require('mongoose')
const Double = require('@mongoosejs/double')

let Schema = mongoose.Schema

let obj = {
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
}

let schoolSchema = process.env.BERIS ? new Schema(obj, { shardKey: { _id: 1 } }) : new Schema(obj)


module.exports = mongoose.model('School', schoolSchema)