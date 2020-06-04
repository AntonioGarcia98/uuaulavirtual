const express = require('express')
const User = require('../models/user')

const app = express()

app.get('/usuarios', (req, res) => {
    let output = [
        {
            nombre: 'Edgar',
            edad: 21
        },
        {
            nombre: 'Eduardo',
            edad: 21
        }
    ];
    res.send(output);
})

app.post('/usuario', (req, res) => {
    let body = req.body
    let user = new User({
        name: body.name,
        email: body.email,
        password: body.password
    })

    user.save((err, newUser)=>{
        if(err) {
            return res.status(400).json({
                ok: false,
                err: err
            })
        }

        return res.json({
            ok: true,
            user: newUser
        })
    })

})

module.exports = app