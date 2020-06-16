const {verify, admin, userid, teacher} = require('../middlewares/auth')
const {create, find} = require('../config/functions')

const Room = require('../models/room')
const { select } = require('underscore')

let room = { 
    name: '/room', 
    model: Room,
    create: async req => {
        let body = req.body
        let newObj = create(Room, {
            name: body.name,
            group: body.group,
            students: body.students,
            teachers: body.teachers,
            user: body.user,
            description: body.description
        })
        let res = null
        await newObj.save()
            .then( s => { res = s } )
            .catch(err => { throw err })
        return res
    },
    updateParams:[
        'name',
        'students',
        'teachers',
        'description'
    ],
    crud: true,
    middlewares: {
        post: [ verify, admin, userid],
        put: [ verify, teacher ],
        delete: [ verify, admin ]
    },
    extra: app => {
        app.get('/rooms/group/:id', (req, res) => find(Room, { group: req.params.id }, req, res)),
        app.get('/groups/user/:id', (req, res) => find(Room, 
            {$or: [
                {teachers: {$in : [req.params.id] }}, 
                {students: {$in : [req.params.id] }}
            ]}, req, res, 
            { "group": 1, "_id": 0, "students": 0, "teachers": 0}))
    }
}

module.exports = room