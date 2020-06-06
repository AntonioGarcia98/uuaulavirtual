const express = require('express')
const app = express()
const _ = require('underscore')
const routes = require('./routes')

const update = { new : true, runValidators: true, context: 'query' }

function errorHandler(err, res, status = 400){
    return res.status(status).json({
        ok: false,
        error: err
    })
}

function notFound(res) {
    return errorHandler({error: {message: 'no encontrado'}}, res, 404)
}

function ok(item, res){
    return res.json({
        ok: true,
        item
    })
}

routes.forEach((route) => {
    if(route.generateCrud){
        app.get(route.name, (req, res) => {
            let p = Number(req.query.page) || 1
            let l = Number(req.query.limit) || 5
            p = (p-1) * l
            route.model.find({})
                .skip(p)
                .limit(l)
                .exec((err, items) => {
                    if(err) return errorHandler(err, res)
                    if(!items) return notFound(res)
                    return ok(items, res)
                })
        })
    
        app.get(route.name+'/:id', (req, res) => {
            let id = req.params.id
            route.model.findById(id, (err, item) => {
                if(err) return errorHandler(err, res)
                if(!item) return notFound(res)
                return ok(item, res)
            })
        })
    
        app.post(route.name, (req, res) => {
            route.create(req.body).then((item) => {
                item.save((err, newItem)=>{
                    if(err) return errorHandler(err, res)
                    return ok(newItem, res)
                })
            }).catch(e => {
                return errorHandler(e, res)
            })
            
        })
    
        app.put(route.name+'/:id', (req, res) => {
            let id = req.params.id
            let body = _.pick( req.body, route.updateParams )
            route.model.findByIdAndUpdate( id, body, update ,(err, edited) => {
                if(err) return errorHandler(err, res)
                if(!edited) return notFound(res) 
                return ok(edited, res)
            })
        })
    
        app.delete(route.name+'/:id', (req, res) => {
            let id = req.params.id
            route.model.findByIdAndRemove( id, (err, deleted) => {
                if(err) return errorHandler(err, res)
                if(!deleted) return notFound(res)
                return ok(deleted, res)
            })
        })
    }
    if(route.extra){
        route.extra(app, ok, errorHandler, notFound)
    }
})

module.exports = app