const mongoose = require('mongoose')

let Schema = mongoose.Schema

const obj = {
    title: {
        type: String,
        required: [true, 'el titulo es necesario']
    },
    publish_date: Date,
    limit_date: Date,
    description: String,
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'el creador es necesario']
    },
    room:  {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: [true, 'la room es necesaria']
    },
    resources: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource',
    }]
}

let activitySchema = process.env.BERIS ? new Schema(obj, { shardKey: { _id: 1 } }) : new Schema(obj)

module.exports = mongoose.model('Activity', activitySchema)