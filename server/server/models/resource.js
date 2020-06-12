const mongoose = require('mongoose')

let Schema = mongoose.Schema

let resourceSchema = new Schema({
    file: {
        type: String,
        required: [true, 'el archivo es necesario']
    },
    description: String,
    uploadedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'el creador es necesario']
    }
})

module.exports = mongoose.model('Resource', resourceSchema)