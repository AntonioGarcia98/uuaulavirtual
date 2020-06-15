const mongoose = require('mongoose')
const {populatePost, populatePre, populate} = require('../config/functions')
const User = require('./user')

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

let pre = ['find', 'findOne']
pre.map(path => populatePre(roomSchema, path, populate('teachers', User)))
pre.map(path => populatePre(roomSchema, path, populate('students', User)))

let post = ['save']
post.map(path => populatePost(roomSchema, path, populate('teachers', User)))
post.map(path => populatePost(roomSchema, path, populate('students', User)))

module.exports = mongoose.model('Room', roomSchema)