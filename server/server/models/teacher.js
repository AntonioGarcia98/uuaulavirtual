const mongoose = require('mongoose')

let Schema = mongoose.Schema

let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let teacherSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'el titulo es necesario']
    },
    professional_number : {
        type: String,
        required: [true, 'el numero profesional es necesario']
    }, 
    schools : [{ type : Schema.Types.ObjectId, ref: 'School' }],  
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    }
})

module.exports = mongoose.model('Teacher', teacherSchema)
