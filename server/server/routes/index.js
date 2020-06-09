const express = require('express')
const app = express()

const routes = require('./routes')
const { ok, errorHandler, notFound, update } = require('../config/functions')
const { noauth } = require('../middlewares/auth')

routes
    .filter(route => route.crud)
    .map(route => {
        route.middlewares = route.middlewares || { get: noauth, post: noauth, put: noauth, delete: noauth }
        route.middlewares.get = route.middlewares.get ||  noauth 

        app.get(route.name, route.middlewares.get, (req, res) => {
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

        app.get(route.name+'/:id', route.middlewares.get, (req, res) => {
            let id = req.params.id
            route.model.findById(id, (err, item) => {
                if(err) return errorHandler(err, res)
                if(!item) return notFound(res)
                return ok(item, res)
            })
        })

        route.middlewares.post = route.middlewares.post ||  [ noauth ] 
        app.post(route.name, route.middlewares.post, (req, res) => {
            route.create(req.body).then((item) => {
                item.save((err, newItem)=>{
                    if(err) return errorHandler(err, res)
                    return ok(newItem, res)
                })
            }).catch(e => {
                return errorHandler(e, res)
            })
        })

        route.middlewares.put = route.middlewares.put ||  noauth
        app.put(route.name+'/:id', route.middlewares.put, (req, res) => update(req, res, route))

        route.middlewares.delete = route.middlewares.delete ||  noauth
        app.delete(route.name+'/:id', route.middlewares.delete,(req, res) => {
            let id = req.params.id
            route.model.findByIdAndRemove( id, (err, deleted) => {
                if(err) return errorHandler(err, res)
                if(!deleted) return notFound(res)
                return ok(deleted, res)
            })
        })
    })

routes
    .filter(route => route.extra)
    .map(route => route.extra(app))

module.exports = app