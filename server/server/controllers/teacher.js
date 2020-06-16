const user = require('./user')
const { create } = require('../config/functions')
const Teacher = require('../models/teacher')

const teacher = {
    name: '/teacher', 
    model: Teacher,
    create: async req => {
        let body = req.body
        let newt = create(Teacher, {
            title: body.teacher.title,
            professional_number: body.teacher.professional_number,
            schools: body.teacher.schools,
            role: body.teacher.role
        })
        let res = null
        await newt.save().then( async item => { 
            body.teacher = item._id; 
            let newu = await user.create(req) 
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