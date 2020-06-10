const jwt = require('jsonwebtoken')
const {errorHandler, ok} = require('../config/functions') 

const error = {message: 'token no valido'}

const getToken = (req) => req.get('authorization')

const getDecoded = (req) => jwt.decode(getToken(req), {json: true})

let noauth = (req, res, next) => {
    next()
}

let verify = (req, res, next) => {
    let token = getToken(req)
    jwt.verify( token, process.env.JWT_SEED, (err, dec) => {
        if(err) return errorHandler(error, res, 401)
        next()
    })
}

let admin = (req, res, next) => {
    let item = getDecoded(req)
    teacher.model.findOne( {user: item.user._id}, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        if(found.role != 'ADMIN_ROLE') return errorHandler(error, res, 401)
        else next()
    })
}

let personalUser = (req, res, next) => {
    let item = getDecoded(req)
    user.model.findById(item.user._id, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        console.log(found._id === req.params.id)
        if(found._id != req.params.id) return errorHandler({message: "nope"}, res, 401)
        else next()
    })
}


let personalStudent = (req, res, next) => {
    let item = getDecoded(req)
    student.model.findOne({user: item.user._id}, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        console.log(found)
        if(found._id != req.params.id) return errorHandler(error, res, 401)
        else next()
    })
}

let personalTeacher = (req, res, next) => {
    let item = getDecoded(req)
    teacher.model.findOne({user: item.user._id}, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        console.log(found)
        if(found._id != req.params.id) return errorHandler(error, res, 401)
        else next()
    })
}

module.exports = { verify, noauth, admin, personalUser, personalStudent, personalTeacher }

const teacher = require('../models/teacher')
const student = require('../models/student')
const user = require('../models/user')