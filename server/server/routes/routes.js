const user = require('../controllers/user')
const school = require('../controllers/school')
const teacher = require('../controllers/teacher')
const student = require('../controllers/student')
const login = require('./login')

const routes = [
    school,
    user,
    teacher,
    student,
    login
]

module.exports = routes