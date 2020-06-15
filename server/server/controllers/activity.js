const {verify, admin, userid, teacher} = require('../middlewares/auth')
const {create, find} = require('../config/functions')

const Activity = require('../models/activity')

let activity = { 
    name: '/activity', 
    model: Activity,
    create: async body => {
        let newObj = create(Activity, {
            title: body.title,
            user: body.user,
            room: body.room,
            publish_date: body.publish_date,
            limit_date: body.limit_date,
            description: body.description,
            resources: body.resources
        })
        let res = null
        await newObj.save()
            .then( s => { res = s } )
            .catch(err => { throw err })
        return res
    },
    updateParams:[
        'title',
        'publish_date',
        'limit_date',
        'description',
        'resources'
    ],
    crud: true,
    middlewares: {
        post: [ verify, admin, userid],
        put: [ verify, teacher ],
        delete: [ verify, admin ]
    },
    extra: app => {
        app.get('/room/:id/activities', (req, res) => find(Activity, { room: req.params.id }, req, res))
    }
}

module.exports = activity