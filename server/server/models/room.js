const mongoose = require('mongoose')

let Schema = mongoose.Schema

let roomSchema = new Schema({
    name: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    group: { 
        type: Schema.Types.ObjectId, 
        ref: 'Group',
        required: [true, 'el grupo es necesario']
    },
    students:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    teachers:  [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'el creador es necesario']
    }
})

module.exports = mongoose.model('Room', roomSchema)