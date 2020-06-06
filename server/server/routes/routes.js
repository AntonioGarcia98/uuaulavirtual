const user = require('./user')
const school = require('./school')
const teacher = require('./teacher')
const student = require('./student')
const login = require('./login')

const routes = [
    school,
    user,
    teacher,
    student,
    login
]

module.exports = routes