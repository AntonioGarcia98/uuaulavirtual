const user = require('../models/user')
const school = require('../models/school')
const teacher = require('../models/teacher')
const student = require('../models/student')
const login = require('./login')

const routes = [
    school,
    user,
    teacher,
    student,
    login
]

module.exports = routes