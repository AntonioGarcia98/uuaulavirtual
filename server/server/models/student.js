const mongoose = require('mongoose')

let Schema = mongoose.Schema

let obj = {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    scholarship: {
        type: String,
        required: [true, 'la escolaridad es necesaria']
    }, 
    grade: {
        type: String,
        required: [true, 'el grado es necesario']
    }, 
    groups: [{ 
        type : Schema.Types.ObjectId, 
        ref: 'Group' 
    }],  
    school:  {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: [true, 'la escuela es necesaria']
    }, 
    carrer: String
}

let studentSchema = process.env.BERIS ? new Schema(obj, { shardKey: { _id: 1 } }) : new Schema(obj)


module.exports = mongoose.model('Student', studentSchema)
