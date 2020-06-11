const bcrypt = require('bcrypt')
const {create} = require('../config/functions')
const User = require('../models/user')

const user = {
    name: '/user',
    model: User,
    create: async body => create(User, {
        user_name: body.user_name,
        password: (body.password) ? bcrypt.hashSync( body.password, 10 ) : null,
        name: body.name,
        email: body.email,
        last_name: body.last_name,
        birthdate: body.birthdate,
        contact: body.contact,
        profile: body.profile,
        register_date: new Date(),
        teacher: body.teacher,
        student: body.student
    }),
    updateParams: [
        'user_name',
        'name',
        'last_name',
        'birthdate',
        'last_connection',
        'online',
        'contact',
        'profile',
        'teacher',
        'student'
    ],
    crud: true
}

module.exports = user