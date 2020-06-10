const user = require('./user')
const { create } = require('../config/functions')
const Student = require('../models/student')

let student = {
    name: '/student',
    model: Student,
    create: async body => {
        let newst = create(Student, {
            scholarship: body.scholarship,
            grade: body.grade,
            groups: body.groups,
            school: body.school,
            carrer: body.carrer
        })
        let res = null
        await newst.save().then( async item => { 
            body.user.student = item._id; 
            let newu = await user.create(body.user) 
            await newu.save().then(async u => {
                res = u
                //await Student.findByIdAndUpdate(item._id, {user: u._id}, {new: true})
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
    /*extra: app => {
        app.put('/student/user/:id', (req, res) => {
            let body = req.body
            user.model.findOne( { $or:[ {contact:{email: body.email}}, {user_name:body.user_name} ] }, (err, found) => {
                if(err) return errorHandler(err, res, 500)
                if(!logged(body.password, found)) return errorHandler(badlogin, res)
                token = jwt.sign( {user: found} , process.env.JWT_SEED, {expiresIn: 60 * 60 * 24 * 30})
                return ok({ user: found, token }, res)
            })
        })
    }*/
}

module.exports = student