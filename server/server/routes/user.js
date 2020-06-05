// app
const express = require('express')
const app = express()
// required
const bcrypt = require('bcrypt')
const _ = require('underscore')
// global variables
const vars = require('./var')

// model
const User = require('../models/user')

app.get('/user', (req, res) => {
    // pagination
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 5
    page = (page-1) * limit

    // Query
    User.find({})
        .skip(page)
        .limit(limit)
        .exec((err, users) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    error: err
                })
            }

            return res.json({
                ok: true,
                users
            })
        })
})

app.get('/user/:id', (req, res) => {
    let id = req.params.id
    User.findById(id, (err, user) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        if(!user){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "usuario no encontrado"
                }
            })
        }

        return res.json({
            ok: true,
            user
        })
    })
})

app.post('/user', (req, res) => {
    let body = req.body
    let user = new User({
        user_name: body.user_name,
        password: bcrypt.hashSync( body.password, 10 ),
        name: body.name,
        email: body.email,
        last_name: body.last_name,
        birthdate: body.birthdate,
        contact: body.contact,
        profile: body.profile,
        register_date: new Date()
    })

    user.save((err, newUser)=>{
        if(err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        
        return res.json({
            ok: true,
            user: newUser
        })
    })
})

app.put('/user/:id', (req, res) => {
    let id = req.params.id

    // define arguments that can be updated
    let userParams = [
        'user_name',
        'password',
        'name',
        'last_name',
        'birthdate',
        'last_connection',
        'online',
        'contact',
        'profile'
    ]

    // underscore function to only pick the arguments that can be updated
    let body = _.pick( req.body, userParams )
    // find and update
    User.findByIdAndUpdate( id, body, vars.updateParams ,(err, editedUser) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        
        return res.json({
            ok: true,
            user: editedUser
        })
    })
})

app.delete('/user/:id', (req, res)=>{
    let id = req.params.id

    User.findByIdAndRemove(id, (err, deletedUser) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        if(!deletedUser){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "usuario no encontrado"
                }
            })
        }

        return res.json({
            ok: true,
            user: deletedUser
        })
    })
})
/*
app.delete('/user/:id', (req, res)=>{
    let id = req.params.id

    User.findByIdAndUpdate(id, {state: false}, vars.updateParams,(err, deletedUser) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        if(!deletedUser){
            return res.status(400).json({
                ok: false,
                error: {
                    message: "usuario no encontrado"
                }
            })
        }

        return res.json({
            ok: true,
            user: deletedUser
        })
    })
}) */

module.exports = app