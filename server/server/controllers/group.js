const {verify, admin} = require('../middlewares/auth')
const {create} = require('../config/functions')

const Group = require('../models/group')

let group = { 
    name: '/group', 
    model: Group,
    create: async body => {
        let newObj = create(Group, {
            name: body.name,
            scholarship: body.scholarship,
            grade: body.grade,
            rooms: body.rooms,
            createdBy: body.user._id
        })
        let res = null
        await newObj.save()
            .then( s => { res = s } )
            .catch(err => { throw err })
        return res
    },
    updateParams:[
        'name',
        'scholarship',
        'grade',
        'rooms'
    ],
    crud: true,
    middlewares: {
        post: [ verify, admin ],
        put: [ verify, admin ],
        delete: [ verify, admin ]
    }
}

module.exports = group