const mongoose = require('mongoose')

let Schema = mongoose.Schema

let studentSchema = new Schema({
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
})

module.exports = mongoose.model('Student', studentSchema)
