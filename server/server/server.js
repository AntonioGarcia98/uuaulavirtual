require('./config/config')

//requires
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
//app
const app = express()

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//routes
app.use(require('./routes/user'))

//db
let db = 'mongodb://127.0.0.1:27017/cafe'
mongoose.connect(
    db, 
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

//launcher
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT)
})