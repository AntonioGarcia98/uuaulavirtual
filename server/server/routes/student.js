const User = require('../models/user')
const Student = require('../models/student')

const user = require('./user')

const student = {
    name: '/student', 
    model: Student,
    create: async function(body){
        let u = await user.create(body)
        let p = await u.save()
        try{
            return new this.model({
                user: p._id,
                scholarship: body.scholarship,
                grade: body.grade,
                groups: body.groups,
                school: body.school,
                carrer: body.carrer
            })
        } catch(e){
            User.findByIdAndRemove(p._id)
        }
        
    },
    updateParams:[
        'scholarship',
        'grade',
        'groups',
        'school',
        'carrer'
    ],
    generateCrud: true
}

module.exports = user