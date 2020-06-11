const mongoose = require('mongoose')

let Schema = mongoose.Schema

let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    scholarship: {
        type: String,
        required: [true, 'la escolaridad es necesaria']
    },
    grade: {
        type: String,
        required: [true, 'el grado es necesario']
    },
    rooms: [{ 
        type : Schema.Types.ObjectId, 
        ref: 'Room' 
    }],
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

module.exports = mongoose.model('Group', groupSchema)