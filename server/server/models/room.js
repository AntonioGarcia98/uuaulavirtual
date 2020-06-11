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
        ref: 'Student'
    }],
    teachers:  [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
})

module.exports = mongoose.model('Room', roomSchema)