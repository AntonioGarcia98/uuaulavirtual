const User = require('../models/user')
const Teacher = require('../models/teacher')

const user = require('./user')

const teacher = {
    name: '/teacher', 
    model: Teacher,
    create: async function(body){
        let u = await user.create(body)
        let p = await u.save()
        try{
            return new this.model({
                user: p._id,
                title: body.title,
                professional_number: body.professional_number,
                schools: body.schools,
                role: body.role
            })
        } catch(e){
            User.findByIdAndRemove(p._id)
        }
        
    },
    updateParams:[
        'title',
        'professional_number',
        'schools'
    ]
}

module.exports = teacher