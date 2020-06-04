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
let db = 'mongodb+srv://edwir147:26DjOVjBpD0DDcmn@cluster0-h8wwc.mongodb.net/uaaulavirtual?retryWrites=true&w=majority'
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