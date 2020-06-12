const _ = require('underscore')

const errorHandler = (error, res, status = 400) => res.status(status).json({ ok:false, error })
const notFound = (res) => errorHandler({message: 'no encontrado'}, res, 404)
const ok = (item, res) => res.json({ ok:true, item })

const isundefined = (...values) => values.filter( v => v === undefined).length > 0
const create = (model, object) => new model(object)

const populate = (path, model) =>  { return { path, model } }
const populatePost = (s, to, p) => s.post(to, (d, n) => d.populate(p).execPopulate().then(() => n()))
const populatePre = (s, to, p) => s.pre(to, function() { this.populate(p) })

const update = (id, body, model, params, res) => model.findByIdAndUpdate(id,
    _.pick(body, params),
    { new : true, runValidators: true, context: 'query' }, 
    (err, edited) => {
        if(err) return errorHandler(err, res)
        if(!edited) return notFound(res)
        return ok(edited, res)
    })

const find = (req, model, condition, res, limit = 5, page = 1) => model.find(condition)
    .skip((page-1) * limit)
    .limit(limit)
    .exec((err, items) => {
        if(err) return errorHandler(err, res)
        if(!items) return notFound(res)
        return (limit > 1)? ok(items, res) : ok(items[0], res)
    })

module.exports = { 
    errorHandler, 
    ok,
    notFound,
    isundefined,
    create,
    populate,
    populatePost,
    populatePre,
    update,
    find
}