const user = require('../controllers/user')
const school = require('../controllers/school')
const teacher = require('../controllers/teacher')
const student = require('../controllers/student')
const group = require('../controllers/group')
const room = require('../controllers/room')
const activity = require('../controllers/activity')
const resource = require('../controllers/resource')
const delivery = require('../controllers/delivery')
const login = require('./login')

const routes = [
    school,
    user,
    teacher,
    student,
    login,
    group,
    room,
    activity,
    resource,
    delivery
]

module.exports = routes