const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let roles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let obj = {
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
        required: [true, 'el numero profesional es necesario'],
        unique: true
    }, 
    schools : [{ type : Schema.Types.ObjectId, ref: 'School' }],  
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    }
}

let teacherSchema = process.env.BERIS ? new Schema(obj, { shardKey: { _id: 1 } }) : new Schema(obj)


teacherSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'})


module.exports = mongoose.model('Teacher', teacherSchema)
