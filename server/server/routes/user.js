const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const _ = require('underscore')

const app = express()

const updatereq = {new : true, runValidators: true, context: 'query'}

app.get('/user', (req, res) => {
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 5
    page = (page-1) * limit
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
                    message: "Usuario no encontrado"
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
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10 ) 
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
    let body = _.pick( req.body, ['name', 'email'] )

    User.findByIdAndUpdate( id, body, updatereq ,(err, editedUser) => {
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

app.delete('/user/complete/:id', (req, res)=>{
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
                    message: "Usuario no encontrado"
                }
            })
        }

        return res.json({
            ok: true,
            user: deletedUser
        })
    })
})

app.delete('/user/:id', (req, res)=>{
    let id = req.params.id

    User.findByIdAndUpdate(id, {state: false}, updatereq,(err, deletedUser) => {
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
                    message: "Usuario no encontrado"
                }
            })
        }

        return res.json({
            ok: true,
            user: deletedUser
        })
    })
})

module.exports = app