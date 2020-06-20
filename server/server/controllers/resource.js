const {verify, admin, userid, teacher, owner} = require('../middlewares/auth')
const {create, find, errorHandler, notFound} = require('../config/functions')
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
            file: file.filename,
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
        post: [ verify, /*userid,*/ upload.single('myFile') ],
        put: [ verify, owner ],
        delete: [ verify, owner ]
    },
    extra: app => {
        app.get( "/download/:id", (req, res) => find(Resource, {_id: req.params.id}, req)
            .exec((err, found) => {
                if(err) return errorHandler(err, res)
                if(!found) return notFound(err, res)
                const file = `public/uploads/${found[0].file}`;
                res.download(file)
            }))
    }
}

module.exports = resource