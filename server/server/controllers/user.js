const bcrypt = require('bcrypt')
const {create, notFound, ok, find} = require('../config/functions')
const {denied, verify, owner} = require('../middlewares/auth')
const User = require('../models/user')
const db = require('../models/db')

const user = {
    name: '/user',
    model: User,
    create: async req => {
        let body = req.body
        return create(User, {
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
        })
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
    middlewares: {
        post: [ denied ],
        put: [ verify, owner ],
        delete: [ verify, owner ]
    },
    extra: app => {
        app.get('/user/filter/student', (req, res) => find(User, { student:{ $exists: true} }, req, res)),
        app.get('/user/filter/teacher', (req, res) => find(User, { teacher:{ $exists: true} }, req, res)),
        app.get('/students/school/:id', (req, res) => {
            let page = Number(req.query.page || 1)
            let limit = Number(req.query.limit || 5)
            User.find({ student:{ $exists: true} })
                .skip((page-1) * limit)
                .limit(limit)
                .exec((err, items) => {
                    if(err) return errorHandler(err, res)
                    if(!items) return notFound(res)
                    items = items.filter(item => item.student.school == req.params.id)
                    if(!items.length) return notFound(res)
                    return ok(items, res)
                })
        }),
        app.get('/teachers/school/:id', (req, res) => {
            let page = Number(req.query.page || 1)
            let limit = Number(req.query.limit || 5)
            User.find({ teacher:{ $exists: true} })
                .skip((page-1) * limit)
                .limit(limit)
                .exec((err, items) => {
                    if(err) return errorHandler(err, res)
                    if(!items) return notFound(res)
                    items = items.filter(item => item.teacher.schools.includes(req.params.id) )
                    if(!items.length) return notFound(res)
                    return ok(items, res)
                })
        })
    }
}

module.exports = user