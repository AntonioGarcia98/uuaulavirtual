const user = require('../controllers/user')
const school = require('../controllers/school')
const teacher = require('../controllers/teacher')
const student = require('../controllers/student')
const group = require('../controllers/group')
const login = require('./login')

const routes = [
    school,
    user,
    teacher,
    student,
    login,
    group
]

module.exports = routes