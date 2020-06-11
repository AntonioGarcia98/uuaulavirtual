const {verify, admin, userid, teacher} = require('../middlewares/auth')
const {create} = require('../config/functions')

const Room = require('../models/room')

let room = { 
    name: '/room', 
    model: Room,
    create: async body => {
        let newObj = create(Room, {
            name: body.name,
            group: body.group,
            students: body.students,
            teachers: body.teachers
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
        'teachers'
    ],
    crud: true,
    middlewares: {
        post: [ verify, admin, userid],
        put: [ verify, teacher ],
        delete: [ verify, admin ]
    }
}

module.exports = room