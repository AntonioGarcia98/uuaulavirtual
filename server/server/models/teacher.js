const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const user = require('./user')
const {isundefined, create, populatePost, populatePre, populate} = require('../config/functions')
const {verify, noauth, admin} = require('../middlewares/auth')

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

populatePost(teacherSchema, 'save', populate('user', user.model))
populatePre(teacherSchema, 'find', populate('user', user.model))

const Teacher = mongoose.model('Teacher', teacherSchema)

const teacher = {
    name: '/teacher', 
    model: Teacher,
    create: async body => {
        let u = await user.create(body.user)

        if(!isundefined(body.title, body.professional_number)) {
            u = await u.save()
        } 

        return create(Teacher, {
            user: u._id,
            title: body.title,
            professional_number: body.professional_number,
            schools: body.schools,
            role: body.role
        })
    },
    updateParams:[
        'title',
        'professional_number',
        'schools'
    ],
    crud: true
}

module.exports = teacher