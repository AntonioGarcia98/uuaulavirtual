const {verify, admin} = require('../middlewares/auth')
const {create} = require('../config/functions')

const School = require('../models/school')

let school = { 
    name: '/school', 
    model: School,
    create: async body => {
        let newsch = create(School, {
            name: body.name,
            direction: body.direction,
            location: body.location
        })
        let res = null
        await newsch.save()
            .then( s => { res = s } )
            .catch(err => { throw err })
        
        return res
    },
    updateParams:[
        'name',
        'direction',
        'location'
    ],
    crud: true,
    middlewares: {
        post: [ verify, admin ],
        put: [ verify, admin ],
        delete: [ verify, admin ]
    }
}

module.exports = school