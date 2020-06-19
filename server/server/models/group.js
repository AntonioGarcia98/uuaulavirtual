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
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'el creador es necesario']
    },
    school:  {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: [true, 'la escuela es necesaria']
    }
}, { shardKey: { _id: 1 } })

module.exports = mongoose.model('Group', groupSchema)