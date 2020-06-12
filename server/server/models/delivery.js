const mongoose = require('mongoose')
const Double = require('@mongoosejs/double')

let Schema = mongoose.Schema

let deliverySchema = new Schema({
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
})

module.exports = mongoose.model('Delivery', deliverySchema)