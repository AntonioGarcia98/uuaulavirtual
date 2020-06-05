const bcrypt = require('bcrypt')
const User = require('../models/user')

const user = {
    name: '/user',
    model: User,
    create: async function(body){
        return new this.model({
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
    },
    updateParams: [
        'user_name',
        'name',
        'last_name',
        'birthdate',
        'last_connection',
        'online',
        'contact',
        'profile'
    ],
    generateCrud: true
}

module.exports = user