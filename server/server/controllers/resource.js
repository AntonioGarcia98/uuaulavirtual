const {verify, admin, userid, teacher, owner} = require('../middlewares/auth')
const {create} = require('../config/functions')
const upload = require('../middlewares/storage')

const Resource = require('../models/resource')

let resource = {
    name: '/resource', 
    model: Resource,
    create: async req => {
        const file = req.file
        if (!file) {
            throw {errors: {file: {message: 'archivo no encontrado'} } }
        }
        let body = req.body
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
        post: [ verify, upload.single('myFile') ],
        put: [ verify, owner ],
        delete: [ verify, owner ]
    }
}

module.exports = resource