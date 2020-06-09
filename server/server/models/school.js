const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Double = require('@mongoosejs/double')
const {verify, noauth, admin} = require('../middlewares/auth')
const {create} = require('../config/functions')

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

const School = mongoose.model('School', schoolSchema)

let school = { 
    name: '/school', 
    model: School,
    create: async body => create(School, {
        name: body.name,
        direction: body.direction,
        location: body.location
    }),
    updateParams:[
        'name',
        'direction',
        'location'
    ],
    crud: true,
    middlewares: {
        post: [ verify, admin ],
        put: [ verify, admin ],
        delete: [ verify, admin ]
    }
}

module.exports = school