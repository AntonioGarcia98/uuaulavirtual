const mongoose = require('mongoose')
const Double = require('@mongoosejs/double')

let Schema = mongoose.Schema

const obj = {
    title : {
        type: String,
        required: [true, 'el titulo es necesario']
    },
    message: String,
    activity: { 
        type: Schema.Types.ObjectId, 
        ref: 'Activity'
    },
    user:  {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'el usuario es necesario']
    },
    resources: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource',
    }],
    comments: String,
    delivery_date: Date,
    score: Double
}

let deliverySchema = process.env.BERIS ? new Schema(obj, { shardKey: { _id: 1 } }) : new Schema(obj)


module.exports = mongoose.model('Delivery', deliverySchema)