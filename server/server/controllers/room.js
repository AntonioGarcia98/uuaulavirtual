const {verify, admin, userid, teacher} = require('../middlewares/auth')
const {create, find, defaultRes} = require('../config/functions')
const Room = require('../models/room')

const roomsGroupAndUser = (req) => {
    return {
        $and: [ 
            { group: req.params.group },
            { $or: [
                    { teachers: { $in: [req.params.user] } }, 
                    { students: {$in: [req.params.user]} }
            ]} 
        ]
    }
}

const groupsUser = (req) => {
    return {
        $or: [
            {teachers: {$in: [req.params.id] }}, 
            {students: {$in: [req.params.id] }}
        ] 
    }
}

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
        app.get('/rooms/group/:group/user/:user', (req, res) => find(Room, roomsGroupAndUser(req), req, res)),
        app.get('/groups/user/:id', (req, res) => find(Room, groupsUser(req), req)
            .distinct('group')
            .exec((err, items) => defaultRes(err, items, res)))
    }
}

module.exports = room