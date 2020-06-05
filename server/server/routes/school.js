const School = require('../models/school')

const school = { 
    name: '/school', 
    model: School, 
    create: async function(body){
        return new this.model({
            name: body.name,
            direction: body.direction,
            location: body.location
        })
    },
    updateParams:[
        'name',
        'direction',
        'location'
    ]
}

module.exports = school