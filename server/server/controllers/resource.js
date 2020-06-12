const {verify, admin, userid, teacher} = require('../middlewares/auth')
const {create} = require('../config/functions')

const Resource = require('../models/resource')

let resource = {
    name: '/resource', 
    model: Resource,
    create: async body => {
        let newObj = create(Resource, {
            file: body.file,
            description: body.description,
            user: body.user
        })
        let res = null
        await newObj.save()
            .then( s => { res = s } )
            .catch(err => { throw err })
        return res
    },
    updateParams:[
        'description'
    ],
    crud: true,
    middlewares: {
        post: [ verify ],
        put: [ verify, /* owner */ ],
        delete: [ verify, /* owner */ ]
    }
}

module.exports = resource