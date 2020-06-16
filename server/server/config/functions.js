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

const find = (model, condition, req, res, select = '') => {
    let page = Number(req.query.page || 1)
    let limit = Number(req.query.limit || 5)
    model.find(condition)
        .skip((page-1) * limit)
        .limit(limit)
        .select(select)
        .exec((err, items) => {
            if(err) return errorHandler(err, res)
            if(!items || !items.length) return notFound(res)
            return (limit > 1)? ok(items, res) : ok(items[0], res)
        })
}

const matched = x => ({
    on: () => matched(x),
    otherwise: () => x,
})
    
const match = x => ({  
    on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
    otherwise: fn => fn(x),
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
    find,
    match
}