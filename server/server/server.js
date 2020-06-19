require('./config/config')
require('./config/db')

// requires
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "*")
    next();
});

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// routes
app.use(require('./routes/index'))

// launcher
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto', process.env.PORT)
})