const _ = require('underscore')
const express = require('express')
const app = express()
const routes = require('./routes')
const { ok, errorHandler, notFound, update, find } = require('../config/functions')
const { noauth } = require('../middlewares/auth')

const initMid = (middlewares) => {
    middlewares = middlewares || { get: noauth, post: noauth, put: noauth, delete: noauth }

    middlewares.get = middlewares.get || noauth
    middlewares.post = middlewares.post || noauth
    middlewares.put = middlewares.put || noauth
    middlewares.delete = middlewares.delete || noauth

    return middlewares
}

routes
    .filter(route => route.crud)
    .map(route => {
        route.middlewares = initMid(route.middlewares)

        app.get(route.name, route.middlewares.get, (req, res) => 
            find(route.model, {}, req, res))

        app.get(route.name+'/:id', route.middlewares.get, (req, res) => {
            req.query.limit = 1
            req.query.page = 1
            return find(route.model, {_id: req.params.id}, req, res)
        })
            
        app.post(route.name, route.middlewares.post, (req, res) => route.create(req)
            .then((newItem) => ok(newItem, res))
            .catch((err) => errorHandler(err, res)))

        app.put(route.name+'/:id', route.middlewares.put, (req, res) => 
            update(req.params.id, req.body, route.model, route.updateParams, res))

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