const user = require('./user')
const school = require('./school')
const teacher = require('./teacher')
const student = require('./student')

const routes = [
    school,
    user,
    teacher,
    student
]

module.exports = routes