const user = require('./user')
const { create } = require('../config/functions')
const Teacher = require('../models/teacher')

const teacher = {
    name: '/teacher', 
    model: Teacher,
    create: async body => {
        let newt = create(Teacher, {
            title: body.title,
            professional_number: body.professional_number,
            schools: body.schools,
            role: body.role
        })
        let res = null
        await newt.save().then( async item => { 
            body.user.teacher = item._id; 
            let newu = await user.create(body.user) 
            await newu.save().then(u => {
                res = u
            }).catch(async err => { await Teacher.findByIdAndRemove(item._id); throw err})
        }).catch(err => { throw err })
        return res
    },
    updateParams:[
        'title',
        'professional_number',
        'schools'
    ],
    crud: true
}

module.exports = teacher