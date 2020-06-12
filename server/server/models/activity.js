const mongoose = require('mongoose')

let Schema = mongoose.Schema

let activitySchema = new Schema({
    title: {
        type: String,
        required: [true, 'el titulo es necesario']
    },
    publish_date: Date,
    limit_date: Date,
    description: String,
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'el creador es necesario']
    },
    assigned_to:  {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, 'la room es necesaria']
    },
    resources: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource',
    }]
})

module.exports = mongoose.model('Activity', activitySchema)