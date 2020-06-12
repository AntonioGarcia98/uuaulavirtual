const {verify,owner, admin, userid, teacher} = require('../middlewares/auth')
const {create} = require('../config/functions')

const Delivery = require('../models/delivery')

let delivery = { 
    name: '/delivery', 
    model: Delivery,
    create: async body => {
        let newObj = create(Delivery, {
            title: body.title,
            message: body.message,
            activity: body.activity,
            user: body.user,
            resources: body.resources,
            comments: body.comments,
            delivery_date: body.delivery_date,
            score: body.score
        })
        let res = null
        await newObj.save()
            .then( s => { res = s } )
            .catch(err => { throw err })
        return res
    },
    updateParams:[
        'title',
        'message',
        'resources',
        'comments',
        'delivery_date',
        'score'
    ],
    crud: true,
    middlewares: {
        post: [ verify, userid ],
        put: [ verify, owner ],
        delete: [ verify, owner ]
    }
}

module.exports = delivery