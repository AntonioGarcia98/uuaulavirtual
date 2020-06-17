const {verify, admin, userid, teacher} = require('../middlewares/auth')
const {create, find, ok, errorHandler, notFound} = require('../config/functions')

const Room = require('../models/room')
const { select } = require('underscore')
const { group } = require('console')

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
        // app.get('/rooms/group/:group/user/:user'), (req, res) => find(Room, {$and: [ { group: req.params.group },{$or: [{teachers: {$in : [req.params.user] }}, {students: {$in : [req.params.user] } }] } ]}, req, res),
        app.get('/groups/user/:id', (req, res) => {
            let page = Number(req.query.page || 1)
            let limit = Number(req.query.limit || 5)
            Room.find( {$or: [{teachers: {$in : [req.params.id] }}, {students: {$in : [req.params.id] } }] } )
                .skip((page-1) * limit)
                .limit(limit)
                .distinct('group')
                .exec((err, items) => {
                    if(err) return errorHandler(err, res)
                    if(!items || !items.length) return notFound(res)
                    return ok(items, res)
                })
        }),
        app.get('/rooms/group/:group/user/:user', (req, res) => find(Room, 
            {
                $and: 
                [ 
                    { group: req.params.group },
                    {
                        $or: 
                        [
                            { teachers: {$in: [req.params.user]} }, 
                            { students: {$in: [req.params.user]} }
                        ] 
                    } 
                ]
            }, req, res))
    }
}

module.exports = room