// app
const express = require('express')
const app = express()
// required
const _ = require('underscore')
// global variables
const vars = require('./var')

// model
const School = require('../models/school')

app.get('/school', (req, res) => {
    // pagination
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 5
    page = (page-1) * limit

    // Query
    School.find({})
        .skip(page)
        .limit(limit)
        .exec((err, schools) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    error: err
                })
            }

            if(!schools){
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'escuelas no encontradas'
                    }
                })
            }

            return res.json({
                ok: true,
                schools
            })
        })
})

app.get('/school/:id', (req, res) => {
    let id = req.params.id

    School.findById(id, (err, school) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        if(!school){
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'escuela no encontrada'
                }
            })
        }

        return res.json({
            ok: true,
            school
        })
    })
})

app.post('/school', (req, res) => {
    let body = req.body
    let school = new School({
        name: body.name,
        direction: body.direction,
        location: body.location
    })

    school.save((err, newSchool)=>{
        if(err) {
            return res.status(400).json({
                ok: false,
                error: err
            })
        }
        
        return res.json({
            ok: true,
            school: newSchool
        })
    })
})

app.put('/school/:id', (req, res) => {
    let id = req.params.id

    // define arguments that can be updated
    let schoolParams = [
        'name',
        'direction',
        'location'
    ]

    // underscore function to only pick the arguments that can be updated
    let body = _.pick( req.body, schoolParams )
    // find and update
    School.findByIdAndUpdate( id, body, vars.updateParams ,(err, editedSchool) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        if(!editedSchool){
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'escuela no encontrada'
                }
            })
        }
        
        return res.json({
            ok: true,
            school: editedSchool
        })
    })
})

app.delete('/school/:id', (req, res) => {
    let id = req.params.id

    // find and update
    School.findByIdAndRemove( id, (err, deletedSchool) => {
        if(err){
            return res.status(400).json({
                ok: false,
                error: err
            })
        }

        if(!deletedSchool){
            return res.status(404).json({
                ok: false,
                error: {
                    message: 'escuela no encontrada'
                }
            })
        }
        
        return res.json({
            ok: true,
            school: deletedSchool
        })
    })
})

module.exports = app