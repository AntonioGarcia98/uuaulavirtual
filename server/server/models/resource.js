const mongoose = require('mongoose')

let Schema = mongoose.Schema

let obj = {
    file: {
        type: String,
        required: [true, 'el archivo es necesario']
    },
    description: String,
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'el creador es necesario']
    }
}

let resourceSchema = process.env.BERIS ? new Schema(obj, { shardKey: { _id: 1 } }) : new Schema(obj)

module.exports = mongoose.model('Resource', resourceSchema)