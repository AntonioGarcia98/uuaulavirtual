const jwt = require('jsonwebtoken')
const {errorHandler, ok, match, find} = require('../config/functions') 

const error = {message: 'acceso denegado'}

const getToken = (req) => req.get('authorization')
const getDecoded = (req) => jwt.decode(getToken(req), {json: true})
const db = require('../models/db')


const noauth = (req, res, next) => {
    next()
}

const denied = (req, res, next) => {
    return errorHandler(error, res, 401)
}

const verify = (req, res, next) => {
    let token = getToken(req)
    jwt.verify( token, process.env.JWT_SEED, (err, dec) => {
        if(err) return errorHandler(error, res, 401)
        next()
    })
}

const admin = (req, res, next) => {
    let item = getDecoded(req)
    db.User.findById( item.user._id, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        if(found.teacher.role != 'ADMIN_ROLE') return errorHandler(error, res, 401)
        else next()
    })
}

const teacher = (req, res, next) => {
    let item = getDecoded(req)
    db.User.findById( item.user._id, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        if(!found.teacher) return errorHandler(error, res, 401)
        else next()
    })
}

const property = (model, idDoc, idUser, res, next) => {
    model.findOne({ $and: [{_id: idDoc},{user: idUser}] }, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        if(found) next()
    })
}

const owner = (req, res, next) => {
    let item = getDecoded(req)
    let id = req.params.id
    match(req.route.path)
        .on(x => x.includes('delivery'), () => property(db.Delivery, id, item.user._id, res, next))
        .on(x => x.includes('resource'), () => property(db.Resource, id, item.user, res, next))
        .otherwise(x => errorHandler({message: 'error al encontrar ruta'}, res, 400))
}

const userid = (req, res, next) => {
    let id = req.body.user
    let item = getDecoded(req)
    if(id == item.user._id) next()
    else return errorHandler(error, res, 401)
}

const personalUser = (req, res, next) => {
    let item = getDecoded(req)
    db.User.findById(item.user._id, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        console.log(found._id === req.params.id)
        if(found._id != req.params.id) return errorHandler({message: "nope"}, res, 401)
        else next()
    })
}


const personalStudent = (req, res, next) => {
    let item = getDecoded(req)
    db.Student.findOne({user: item.user._id}, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        console.log(found)
        if(found._id != req.params.id) return errorHandler(error, res, 401)
        else next()
    })
}

const personalTeacher = (req, res, next) => {
    let item = getDecoded(req)
    db.Teacher.findOne({user: item.user._id}, (err, found) => {
        if(err) return errorHandler(err, res, 500)
        if(!found) return errorHandler(error, res, 401)
        console.log(found)
        if(found._id != req.params.id) return errorHandler(error, res, 401)
        else next()
    })
}

module.exports = { userid, verify, noauth, admin, personalUser, personalStudent, personalTeacher, teacher, owner, denied}