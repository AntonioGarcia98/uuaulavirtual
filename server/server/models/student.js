const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const user = require('./user')
const {isundefined, create, populate, populatePost,populatePre } = require('../config/functions')
const { verify, personalStudent } = require('../middlewares/auth')

let Schema = mongoose.Schema

let studentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    scholarship: {
        type: String,
        required: [true, 'la escolaridad es necesaria']
    }, 
    grade: {
        type: String,
        required: [true, 'el grado es necesario']
    }, 
    groups: [{ type : Schema.Types.ObjectId, ref: 'Group' }],  
    school:  {
        type: Schema.Types.ObjectId,
        ref: 'School'
    }, 
    carrer: String
})

populatePost(studentSchema, 'save', populate('user', user.model))

populatePre(studentSchema, 'find', populate('user', user.model))

const Student = mongoose.model('Student', studentSchema)

let student = {
    name: '/student', 
    model: Student,
    create: async body => {
        let u = await user.create(body.user)

        if(!isundefined(body.scholarship, body.grade)) {
            u = await u.save()
        } 

        return create(Student, {
            user: u._id,
            scholarship: body.scholarship,
            grade: body.grade,
            groups: body.groups,
            school: body.school,
            carrer: body.carrer
        })
        
    },
    updateParams:[
        'scholarship',
        'grade',
        'groups',
        'school',
        'carrer'
    ],
    crud: true,
    middlewares: {
        put: [ verify, personalStudent ],
        delete: [ verify, personalStudent ]
    },
    extra: app => {
        app.put('/student/user/:id', (req, res) => {
            let body = req.body
            user.model.findOne( { $or:[ {contact:{email: body.email}}, {user_name:body.user_name} ] }, (err, found) => {
                if(err) return errorHandler(err, res, 500)
                if(!logged(body.password, found)) return errorHandler(badlogin, res)
                token = jwt.sign( {user: found} , process.env.JWT_SEED, {expiresIn: 60 * 60 * 24 * 30})
                return ok({ user: found, token }, res)
            })
        })
    }
}

module.exports = student