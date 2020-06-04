require('./config/config')

// requires
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// routes
app.use(require('./routes/user'))

// db
mongoose.connect(
    process.env.db, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true 
    }, 
    (err, res) => {
        if (err) throw err;
        console.log('DB online')
    }
)

// launcher
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT)
})