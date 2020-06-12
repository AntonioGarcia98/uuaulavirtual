const bcrypt = require('bcrypt')
const {create, notFound, ok, find} = require('../config/functions')
const User = require('../models/user')
const db = require('../models/db')

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
    postUpdate: async (user, body) => {
       await db.Teacher.findByIdAndUpdate(user.teacher, body.teacher)
    },
    updateParams: [
        'user_name',
        'name',
        'last_name',
        'birthdate',
        'last_connection',
        'online',
        'contact',
        'profile'
    ],
    crud: true,
    extra: app => {
        app.get('/user/filter/student', (req, res) => find(req, User, { student:{ $exists: true} }, res)),
        app.get('/user/filter/teacher', (req, res) => find(req, User, { teacher:{ $exists: true} }, res))
    }
}

module.exports = user