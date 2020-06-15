const bcrypt = require('bcrypt')
const {create, notFound, ok, find} = require('../config/functions')
const User = require('../models/user')
const db = require('../models/db')
const mongoose = require('mongoose')

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
        app.get('/user/filter/student', (req, res) => find(User, { student:{ $exists: true} }, req, res)),
        app.get('/user/filter/teacher', (req, res) => find(User, { teacher:{ $exists: true} }, req, res)),
        app.get('/students/school/:id', (req, res) => {
            User.find({ student:{ $exists: true} })
                .populate({ path: 'student', match: { school: req.params.id } } )
                .exec((err, items) => {
                    if(err) return errorHandler(err, res)
                    if(!items) return notFound(res)
                    return ok(items.filter(item => item.student), res)
                })
        })
    }
}

module.exports = user