const {verify, admin, userid} = require('../middlewares/auth')
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
            createdBy: body.user,
            school: body.school
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
        'grade'
    ],
    crud: true,
    middlewares: {
        post: [ verify, admin, userid],
        put: [ verify, admin ],
        delete: [ verify, admin ]
    }
}

module.exports = group