const user = require('./user')
const { create, find } = require('../config/functions')
const Student = require('../models/student')

let student = {
    name: '/student',
    model: Student,
    create: async body => {
        let newst = create(Student, {
            scholarship: body.student.scholarship,
            grade: body.student.grade,
            groups: body.student.groups,
            school: body.student.school,
            carrer: body.student.carrer
        })
        let res = null
        await newst.save().then( async item => { 
            body.student = item._id; 
            let newu = await user.create(body) 
            await newu.save().then(async u => {
                res = u
            }).catch(async err => { await Student.findByIdAndRemove(item._id); throw err})
        }).catch(err => { throw err })
        return res
    },
    updateParams:[
        'scholarship',
        'grade',
        'groups',
        'school',
        'carrer'
    ],
    crud: true,
    extra: app => {
        // app.get('/students/school/:id', (req, res) => find(Student, { school: req.params.id }, res))
    }
}

module.exports = student