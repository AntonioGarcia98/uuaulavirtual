const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {errorHandler, ok} = require('../config/functions')
const user = require('../models/user')
const teacher = require('../models/teacher')
const student = require('../models/student')

const logged = (password, user) => user && password && bcrypt.compareSync( password, user.password )

const badlogin = {error: {message: 'usuario o contrasenia incorrectos'} }

const login = {
    name: '/login',
    extra: app => {
        app.post('/login', (req, res) => {
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

module.exports = login